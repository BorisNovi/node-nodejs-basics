import { EOL, cpus, homedir, userInfo, arch } from 'os';

const keysEnum = {
  EOL: 'EOL',
  CPUS: 'cpus',
  HOMEDIR: 'homedir',
  USERNAME: 'username',
  ARCHITECTURE: 'architecture',
};

export const osInfo = (arg = '') => {
  const osArg = arg?.replace('--', '')
  switch (true) {
    case osArg === keysEnum.EOL:
      // I escaped the end-of-line characters so you, Student 1, would see them.
      console.log(`Default system End-Of-Line (EOL): "${EOL.replace(/\n/g, '\\n').replace(/\r/g, '\\r')}"`);
      break;

    case osArg === keysEnum.CPUS:
      const cpuInfo = cpus();

      const cpuDetails = cpuInfo.map((cpu) => ({
        Model: cpu.model,
        'Clock Rate (GHz)': (cpu.speed / 1000).toFixed(2)
      }));

      console.log(`Amountof CPUs: ${cpuInfo.length}`);
      console.table(cpuDetails);
      break;

    case osArg === keysEnum.HOMEDIR:
      const homedirInfo = homedir();
      console.log(`System home directory is: ${homedirInfo}`);
      break;

    case osArg === keysEnum.USERNAME:
      const userData = userInfo();
      console.log(`System username is: ${userData.username}`);
      break;

    case osArg === keysEnum.ARCHITECTURE:
      const archInfo = arch();
      console.log(`System architecture is: ${archInfo}`);
      break;
    
    default: 
    console.log('Invalid OS arg')
  }
}
