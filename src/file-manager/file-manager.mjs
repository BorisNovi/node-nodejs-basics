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

const fileManager = () => {
  const recievedArgs = readArgs();
  if (recievedArgs) {
    console.log(`Welcome to the File Manager, ${recievedArgs?.value}!`);
  }

  
}

fileManager();