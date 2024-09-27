import { cp } from 'node:fs/promises';

const copy = async (source, destination) => {
  try {
    await cp(source, destination, { recursive: true, errorOnExist: true, force: false });
  } catch (error) {
    throw new Error('FS operation failed');
  }
};

const path = './src/fs/files';
const dest = './src/fs/files_copy';

await copy(path, dest);
