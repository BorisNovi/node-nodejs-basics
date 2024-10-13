import { writeFile } from 'fs/promises';
import { join } from 'path';
import { printCurrentDirectory } from '../directories/index.mjs';

export const addFile = async (fileName = '') => {
  const filePath = join(process.cwd(), fileName);

  try {
    await writeFile(filePath, '');
    console.log(`File ${fileName} has been created.`);
  } catch (err) {
    console.error('Operation failed:', err.message);
  } finally {
    printCurrentDirectory();
  }
};