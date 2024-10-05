import { createReadStream } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const read = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = resolve(__dirname, 'files', 'fileToRead.txt'); 

  console.log(filePath);
  
  const readStream = createReadStream(filePath, { encoding: 'utf8' });

  readStream.pipe(process.stdout);
};

await read();
