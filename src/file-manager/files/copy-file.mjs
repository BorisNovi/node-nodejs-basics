import { join } from 'path';
import { cp } from 'node:fs/promises';
import { printCurrentDirectory } from '../directories/index.mjs';

export const copyFile = async (sourcePath = '', destPath = '') => {
  const sourceFilePath = join(process.cwd(), sourcePath);
  const destFilePath = join(process.cwd(), destPath);

  try {
    await cp(sourceFilePath, destFilePath, { recursive: true, errorOnExist: true, force: false });
    console.log(`File ${sourcePath} has been copied to ${destPath}.`);
  } catch (err) {
    console.error('Operation failed:', err.message);
  } finally {
    printCurrentDirectory();
  }
};
