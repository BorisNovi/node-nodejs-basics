import * as readline from 'readline';
import { homedir } from 'os';
import { chdir } from 'process';

import { changeDirectory, printCurrentDirectory, goUpDirectory, listDirectory } from './directories/index.mjs';
import { catFile, addFile, renameFile, copyFile, removeFile, moveFile } from './files/index.mjs';
import { osInfo } from './os/index.mjs';

const keysEnum = {
  USERNAME: 'username',
  EXIT: '.exit',
  UP: 'up',
  LS: 'ls',
  CD: 'cd',
  CAT: 'cat',
  ADD: 'add',
  RN: 'rn',
  CP: 'cp',
  MV: 'mv', 
  RM: 'rm',
  OS: 'os',
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

  rl.on('line', async (input) => {
    const [command, ...args] = input.trim().split(' ');

    switch (true) {
      case command === keysEnum.EXIT:
        exitFileManager(username, rl);
        break;

      case command === keysEnum.UP:
        goUpDirectory();
        break;

      case command.startsWith(keysEnum.CD):
        changeDirectory(args[0]);
        break;

      case command.startsWith(keysEnum.CAT):
        catFile(args[0]);
        break;

      case command.startsWith(keysEnum.ADD):
        await addFile(args[0]);
        break;

      case command.startsWith(keysEnum.RN):
        await renameFile(args[0], args[1]);
        break;

      case command.startsWith(keysEnum.CP):
        await copyFile(args[0], args[1]);
        break;

      case command.startsWith(keysEnum.MV):
        await moveFile(args[0], args[1]);
        break;

      case command.startsWith(keysEnum.RM):
        await removeFile(args[0]);
        break;

      case command === keysEnum.LS:
        listDirectory();
        break;

      case command.startsWith(keysEnum.OS): 
        osInfo(args[0]);
        break;
      
      default: 
        console.log('Invalid input')
    };

    rl.prompt();
  });

  rl.on('SIGINT', () => exitFileManager(username, rl));
};

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