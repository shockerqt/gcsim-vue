export const generateInputValues = (input: Array<number>, rolls: number): Array<string> => {
  const sets = [new Set(input)];
  let mergedArray = [...input];

  for (let i = 0; i < rolls - 1; i++) {
    const previousSet = sets[i];
    const set = new Set<number>();
    for (const value of input) {
      for (const item of [...previousSet]) {
        set.add(value + item);
      }
    }
    sets.push(set);
    mergedArray = [...mergedArray, ...set];
  }

  return [...new Set(mergedArray.map(value => value.toFixed(1)))];
};

interface Level {
  rollsPath: Array<number>;
  value: number;
}

export const generateInputValues2 = (input: Array<number>, rolls: number): Array<string> => {
  const levels = [input.map(value => ({ rollsPath: [value], value }))];
  const map = new Map<string, number[]>();
  let previousLevel = levels[0];

  for (let i = 0; i < rolls - 1; i++) {
    const level: Array<Level> = [];

    for (const { rollsPath, value } of previousLevel) {
      for (const item of input) {
        level.push({ rollsPath: [...rollsPath, item], value: value + item });
        if (!map.has((value + item).toFixed(1))) {
          map.set((value + item).toFixed(1), [...rollsPath, item]);
        }
      }
    }

    previousLevel = level;
  }

  return map;
};
