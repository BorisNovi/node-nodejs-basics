import { rm } from 'node:fs/promises';

const remove = async (path) => {
  try {
    await rm(path);
  }
  catch (error) { 
    throw new Error('FS operation failed');
  }
};

const path = './fresh.txt';

await remove(path);