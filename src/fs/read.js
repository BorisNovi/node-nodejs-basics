import { readFile } from 'node:fs/promises';

const read = async (path) => {
  let fileContent = null;
  
  try {
    fileContent = await readFile(path, { encoding: 'utf8'});
  } catch (error) {
    throw new Error('FS operation failed');
  }

  return fileContent;
};

const path = './src/fs/files/fileToRead.txt';

console.log(await read(path));