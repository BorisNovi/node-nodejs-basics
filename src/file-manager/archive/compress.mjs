import { createBrotliCompress } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { stat } from 'fs/promises';

export const compressFile = async (sourcePath = '', destPath = '') => {
  try {
    const fileStats = await stat(sourcePath);
    const totalSize = fileStats.size;
    let processedSize = 0;

    let destinationPath = destPath;
    if (!destPath.endsWith('.br')) {
      destinationPath = `${destPath}.br`;
    }

    const readStream = createReadStream(sourcePath);
    const writeStream = createWriteStream(destinationPath);

    const brotli = createBrotliCompress();

    readStream.on('data', (chunk) => {
      processedSize += chunk.length;
      const progress = ((processedSize / totalSize) * 100).toFixed(2);
      console.log(`Compression progress: ${progress}%`);
    });

    readStream.pipe(brotli).pipe(writeStream);

    writeStream.on('finish', () => {
      console.log(`File successfully compressed to ${destinationPath}`);
    });
  } catch (err) {
    console.error('Operation failed:', err.message);
  }
};
