import * as readline from 'readline';
import { homedir } from 'os';
import { join } from 'path';
import { chdir, cwd } from 'process';
import { existsSync, readdirSync, statSync } from 'fs';

import { changeDirectory, printCurrentDirectory, goUpDirectory, listDirectory } from './directories/index.mjs';
import { catFile } from './files/cat-file.mjs';

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
    const path = command.split(' ')[1];

    switch (true) {
      case command === keysEnum.EXIT:
        exitFileManager(username, rl);
        break;

      case command === keysEnum.UP:
        goUpDirectory();
        break;

      case command.startsWith(keysEnum.CD):
        changeDirectory(path);
        break;

      case command.startsWith(keysEnum.CAT):
        catFile(path);
      break;

      case command.startsWith(keysEnum.ADD):
        console.log('add');
      break;

      case command.startsWith(keysEnum.RN):
        console.log('rn');
      break;

      case command.startsWith(keysEnum.CP):
        console.log('cp');
      break;

      case command.startsWith(keysEnum.MV):
        console.log('mv');
      break;

      case command.startsWith(keysEnum.RM):
        console.log('rm');
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