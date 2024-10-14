import { createReadStream } from 'fs';
import { createHash } from 'crypto';

export const calcHash = async (sourcePath = '') => {
  const hash = createHash('sha256');
  const readStream = createReadStream(sourcePath);

  readStream.pipe(hash);

  hash.on('finish', () => {
    const calculatedHash = hash.read().toString('hex');
    console.log(calculatedHash);
  });
}
