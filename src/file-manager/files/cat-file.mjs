import { createReadStream } from 'fs';
import { resolve } from 'path';
import { printCurrentDirectory } from '../directories/index.mjs';

export const catFile = (filePath) => {
  const fullPath = resolve(filePath);

  const stream = createReadStream(fullPath, { encoding: 'utf-8' });

  stream.on('error', (err) => {
    console.error('Operation failed: ', err.message);
  });

  stream.on('data', (chunk) => {
    console.log(chunk);
  });

  stream.on('end', () => {
    console.log('File reading completed.');
    printCurrentDirectory();
  });
};