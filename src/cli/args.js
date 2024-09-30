const parseArgs = () => {
  const args = process.argv;
  const pathlessArgs = args.slice(2);

  for (let i = 0; i <= pathlessArgs.length; i += 2) {
      const key = args[i].replace('--', '');
      const value = args[i + 1];
      console.log(`${key} is ${value}`);
    }
};

parseArgs();