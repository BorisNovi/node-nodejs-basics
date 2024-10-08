import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

import { Worker } from 'worker_threads';
import { cpus } from 'os';

const performCalculations = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = resolve(__dirname, 'worker.js'); 

  const numCPUs = cpus().length;
  const workers = [];
  const results = [];

  for (let i = 0; i < numCPUs; i++) {
    workers.push(new Promise((resolve) => {
      const worker = new Worker(filePath);  

      worker.postMessage(10 + i);

      worker.on('message', (result) => {
        resolve({ status: 'resolved', data: result });
      });

      worker.on('error', () => {
        resolve({ status: 'error', data: null });
      });

      worker.on('exit', (code) => {
        if (code !== 0) {
          resolve({ status: 'error', data: null });
        }
      });
    }));
  }

  for (const workerPromise of workers) {
    const result = await workerPromise;
    results.push(result);
  }

  console.log(results);
};

await performCalculations();