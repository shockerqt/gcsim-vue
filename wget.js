import fs from 'fs';
import path from 'path';
import pkg from 'mkdirp';
import fetch from 'node-fetch';
const { mkdirp } = pkg;

async function downloadFile (url, destination) {
  const destinationDir = path.dirname(destination);

  // Create the destination directory if it doesn't exist
  await mkdirp(destinationDir);

  const response = await fetch(url);
  const fileStream = fs.createWriteStream(destination);

  await new Promise((resolve, reject) => {
    response.body.pipe(fileStream);
    response.body.on('error', (err) => {
      reject(err);
    });
    fileStream.on('finish', function () {
      resolve();
    });
  });
}

// Usage
const fileUrl = 'https://drive.google.com/uc?id=1VSVxOnH7_8ps74TrXFcWBFSjp0ZHmnjO';
const destinationPath = './assets/images/test.png';
downloadFile(fileUrl, destinationPath)
  .then(() => {
    console.log('File downloaded successfully!');
  })
  .catch((error) => {
    console.error('Error downloading file:', error);
  });
