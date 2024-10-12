import * as readline from 'readline';


const keys = {
  USERNAME: 'username',
};

const readArgs = () => {
  const args = process.argv;
  const pathlessArgs = args.slice(2);
  
  for (let i = 0; i < pathlessArgs.length; i += 1) {
    const arg = pathlessArgs[i].replace('--', '').split('=');
    const key = arg[0];
    const value = arg[1];

    switch (true) {
      case key == keys.USERNAME:
        return { key: keys.USERNAME, value };
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
      case command === '.exit':
        exitFileManager(username, rl);
        break;

      case command === 'up':
        console.log('go up');
        break;

      case command === 'cd':
        console.log('change directory');
        break;

      case command === 'ls':
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
  console.log('current direcroyu will be here');
}


const fileManager = () => {
  const recievedArgs = readArgs();
  const username = recievedArgs?.value || 'Anon';

  startFileManager(username);
}

fileManager();