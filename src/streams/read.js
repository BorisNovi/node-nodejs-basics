import { createReadStream } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const read = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = resolve(__filename, '../files/fileToRead.txt'); 

  console.log(__dirname);  
  const readStream = createReadStream(__dirname, { encoding: 'utf8' });  
  const hexReadStream = createReadStream(__dirname, { encoding: 'ascii' });

  readStream.pipe(process.stdout);  
  hexReadStream.pipe(process.stdout);
};

await read();
