import { readdir } from 'node:fs/promises';

const list = async (path = '.') => {
  const files = [];

  try {
   const readFiles = await readdir(path);
   files.push(...readFiles);
  } catch (error) {
    throw new Error('FS operation failed');
  }

  return files.length ? files : null;
};

const path = './src/fs/files';

console.log(await list(path));