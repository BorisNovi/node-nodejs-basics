import * as readline from 'readline';
import { homedir } from 'os';
import { chdir, cwd } from 'process';

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
        console.log('go up');
        break;

      case command === keysEnum.CD:
        console.log('change directory');
        break;

      case command === keysEnum.LS:
        console.log('list');
        break;
      
      default: 
        console.log('Invalid input')
    };

    rl.prompt();
  });

  rl.on('SIGINT', () => exitFileManager(username, rl));
};

const exitFileManager = (username, rl) => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  rl.close();
  rl.on('close', () => {
    process.exit(0);
  });
};

const printCurrentDirectory = () => {
  console.log(`You are currently in ${cwd()}`);
}


const fileManager = () => {
  const recievedArgs = readArgs();
  const username = recievedArgs?.value || 'Anon';
  chdir(homedir());
  startFileManager(username);
}

fileManager();