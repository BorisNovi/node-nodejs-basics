import { createWriteStream } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const write = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = resolve(__dirname, 'files', 'fileToWrite.txt');

  const writeStream = createWriteStream(filePath, { encoding: 'utf8' });

  console.log('Enter your data (Ctrl+D to save and exit, Ctrl+C to exit):');
  
  process.stdin.pipe(writeStream);

  writeStream.on('finish', () => {
    console.log('Writing was ended.');
  });
};

await write();