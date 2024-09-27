import { writeFile } from 'node:fs/promises';

const create = async (path, fileContent) => {
  try {
    await writeFile(path, fileContent, { flag: 'wx'});
  } catch (error) {
    throw new Error('FS operation failed');
  }
};

const path = './src/fs/files/fresh.txt';
const content = 'I\'m fresh and young!';

await create(path, content);