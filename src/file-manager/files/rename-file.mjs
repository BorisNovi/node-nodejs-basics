
import { rename } from 'node:fs/promises';
import { join } from 'path';
import { printCurrentDirectory } from '../directories/index.mjs';

export const renameFile = async (oldPath = '', newFileName = '') => {
  const oldFilePath = join(process.cwd(), oldPath);
  const newFilePath = join(process.cwd(), newFileName);

  try {
    await rename(oldFilePath, newFilePath);
    console.log(`File ${oldPath} has been renamed to ${newFileName}.`);
  } catch (err) {
    console.error('Operation failed:', err.message);
  } finally {
    printCurrentDirectory();
  }
};