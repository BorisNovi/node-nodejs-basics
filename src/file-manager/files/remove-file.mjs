import { promises as fsPromises } from 'fs';
import { join } from 'path';
import { printCurrentDirectory } from '../directories/index.mjs';

export const removeFile = async (filePath = '') => {
  const fullPath = join(process.cwd(), filePath);

  try {
    await fsPromises.rm(fullPath);
    console.log(`File ${filePath} has been deleted.`);
  } catch (err) {
    console.error('Operation failed:', err.message);
  } finally {
    printCurrentDirectory();
  }
};