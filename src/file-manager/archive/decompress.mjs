import { createBrotliDecompress } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { stat } from 'fs/promises';
import { extname, join } from 'path';

export const decompressFile = async (sourcePath = '', destPath = '') => {
  try {
    const fileStats = await stat(sourcePath);
    const totalSize = fileStats.size;
    let processedSize = 0;

    let destinationPath = destPath;
    if (extname(sourcePath) === '.br') {
      const originalFileName = sourcePath.slice(0, -3);
      destinationPath = destPath || originalFileName;
    } else {
      throw new Error('Source file does not have a .br extension. Unable to decompress.');
    }

    const readStream = createReadStream(sourcePath);
    const writeStream = createWriteStream(destinationPath);

    const brotliDecompress = createBrotliDecompress();

    readStream.on('data', (chunk) => {
      processedSize += chunk.length;
      const progress = ((processedSize / totalSize) * 100).toFixed(2);
      console.log(`Decompression progress: ${progress}%`);
    });

    readStream.pipe(brotliDecompress).pipe(writeStream);

    writeStream.on('finish', () => {
      console.log(`File successfully decompressed to ${destinationPath}`);
    });
  } catch (err) {
    console.error('Operation failed:', err.message);
  }
};
