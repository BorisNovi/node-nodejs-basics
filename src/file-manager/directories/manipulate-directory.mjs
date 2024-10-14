import { homedir } from 'os';
import { chdir, cwd } from 'process';
import { existsSync } from 'fs';
import { join } from 'path';

let previousDirectory = cwd();

export const printCurrentDirectory = () => {
  console.log(`You are currently in ${cwd()}`);
}

export const changeDirectory = (path) => {
  if (!path) {
    previousDirectory = cwd();
    chdir(homedir());
    printCurrentDirectory();
    return;
  }

  if (path === '-') {
    const currentPath = cwd();
    chdir(previousDirectory);
    previousDirectory = currentPath;
    printCurrentDirectory();
    return;
  }

  if (existsSync(path)) {
    console.log('exist');
    try {
      previousDirectory = cwd();
      chdir(path);
      printCurrentDirectory();
    } catch (err) {
      console.error('Operation failed');
    }
  } else {
    console.error('Operation failed: path does not exist');
  }
};

export const goUpDirectory = () => {
  const currentPath = cwd();
  const parentPath = join(currentPath, '..');

  if (currentPath !== '/') {
    previousDirectory = currentPath;
    chdir(parentPath);
  }
  printCurrentDirectory();
};