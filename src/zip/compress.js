import { createGzip } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

import { stat } from 'fs/promises';

const compress = async () => {  
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const filePath = resolve(__dirname, 'files', 'fileToCompress.txt');
  const outputPath = resolve(__dirname, 'files', 'archive.gz');

  const readStream = createReadStream(filePath);
  const writeStream = createWriteStream(outputPath);
  const gzip = createGzip();

  // Stats not requred for task, just for fun. Try to compress a big file.
  const fileStats = await stat(filePath);
  const totalSize = fileStats.size;
  let processedSize = 0;

  readStream.on('data', (chunk) => {
    processedSize += chunk.length;
    const progress = ((processedSize / totalSize) * 100).toFixed(2);
    console.log(`Compression progress: ${progress}%`);
  });

  readStream.pipe(gzip).pipe(writeStream);

  writeStream.on('finish', () => {
    console.log('File successfully compredssed.');
  });
};

await compress();
