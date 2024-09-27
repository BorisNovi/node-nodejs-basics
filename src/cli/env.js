const parseEnv = () => {
  const entries = Object.entries(process.env)
  .filter(([key]) => key.startsWith('RSS_'))
  .map(([key, value]) => `${key}=${value}`)
  .join('; ');

  console.log(entries);
};

parseEnv();