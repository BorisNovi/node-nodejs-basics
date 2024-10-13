import * as readline from 'readline';
import { homedir } from 'os';
import { join } from 'path';
import { chdir, cwd } from 'process';
import { existsSync, readdirSync, statSync } from 'fs';

import { changeDirectory, printCurrentDirectory, goUpDirectory, listDirectory } from './directories/index.mjs';

const keysEnum = {
  USERNAME: 'username',
  EXIT: '.exit',
  UP: 'up',
  LS: 'ls',
  CD: 'cd',
};

const readArgs = () => {
  const args = process.argv;
  const pathlessArgs = args.slice(2);
  
  for (let i = 0; i < pathlessArgs.length; i += 1) {
    const arg = pathlessArgs[i].replace('--', '').split('=');
    const key = arg[0];
    const value = arg[1];

    switch (true) {
      case key == keysEnum.USERNAME:
        return { key: keysEnum.USERNAME, value };
      default: 
        console.log('Wrong arg key');
        return null;
    }
  }
  
};

const startFileManager = (username) => {
  console.log(`Welcome to the File Manager, ${username}!`);
  printCurrentDirectory();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '>',
  });

  rl.prompt();

  rl.on('line', (input) => {
    const command = input.trim();
    switch (true) {
      case command === keysEnum.EXIT:
        exitFileManager(username, rl);
        break;

      case command === keysEnum.UP:
        goUpDirectory();
        break;

      case command.startsWith(keysEnum.CD):
        const path = command.split(' ')[1];
        changeDirectory(path);
        break;

      case command === keysEnum.LS:
        listDirectory();
        break;
      
      default: 
        console.log('Invalid input')
    };

    rl.prompt();
  });

  rl.on('SIGINT', () => exitFileManager(username, rl));
};

// const listDirectory = () => {
//   try {
//     const currentPath = cwd();
//     const filesAndFolders = readdirSync(currentPath);

//     const items = filesAndFolders.map((name) => {
//       const fullPath = join(currentPath, name);
//       const isDirectory = statSync(fullPath).isDirectory();
//       return {
//         name: name,
//         type: isDirectory ? 'directory' : 'file',
//       };
//     });

//     items.sort((a, b) => {
//       if (a.type === b.type) {
//         return a.name.localeCompare(b.name);
//       }
//       return a.type === 'directory' ? -1 : 1;
//     });

//     console.table(items);

//   } catch (err) {
//     console.error('Operation failed: Unable to read directory contents');
//   }
// };


const exitFileManager = (username, rl) => {
  rl.on('close', () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
  });

  rl.close();
};

const fileManager = () => {
  const recievedArgs = readArgs();
  const username = recievedArgs?.value || 'Anon';
  chdir(homedir());
  startFileManager(username);
}

fileManager();