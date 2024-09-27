import { rename as r } from 'node:fs/promises';

const rename = async (oldPath, newPath) => {
  try {
    await r(oldPath, newPath);
  } catch {
    throw new Error('FS operation failed');
  }
};

const path = './src/fs/files/wrongFilename.txt';
const newP = './src/fs/files/properFilename.md';

await rename(path, newP);