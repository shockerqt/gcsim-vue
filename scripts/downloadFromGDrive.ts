import * as fs from 'fs';
const dir = './myFolder';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}
const data = 'Hello, World!';
fs.writeFileSync(`${dir}/myFile.txt`, data);
