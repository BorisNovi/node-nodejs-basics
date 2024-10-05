import { Transform } from 'stream';

const transform = async () => {
  console.log('Ctrl + D to exit.');

  const reverse = new Transform({
    transform(chunk, encoding, callback) {
    
      const reversedString = chunk.toString().split('').reverse().join('');
      callback(null, reversedString);
    }
  });
  
  reverse.on('finish', () => {
    console.log('Transforming was ended.');
  });

  process.stdin.pipe(reverse).pipe(process.stdout);
};

await transform();