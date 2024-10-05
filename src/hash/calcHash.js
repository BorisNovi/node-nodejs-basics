import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const calculateHash = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = resolve(__dirname, 'files', 'fileToCalculateHashFor.txt');

  const hash = createHash('sha256');

  const readStream = createReadStream(filePath);

  readStream.pipe(hash);

  hash.on('finish', () => {
    console.log(hash.read().toString('hex'));
  });
};

await calculateHash();
