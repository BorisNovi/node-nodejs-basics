import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

import { spawn } from 'child_process';

const spawnChildProcess = async (args) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = resolve(__dirname, 'files', 'script.js'); 
  
  const child = spawn('node', [filePath, ...args], {
      stdio: ['pipe', 'pipe', 'inherit'],
    });
  
    process.stdin.pipe(child.stdin);
    child.stdout.pipe(process.stdout);
  
    child.on('exit', (code) => {
      console.log(`Child process exited with code ${code}`);
    });
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['arg1', 'arg2']);
