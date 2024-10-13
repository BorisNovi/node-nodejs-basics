import { join } from 'path';
import { cwd } from 'process';
import { readdirSync, statSync } from 'fs';

export const listDirectory = () => {
  try {
    const currentPath = cwd();
    const filesAndFolders = readdirSync(currentPath);

    const items = filesAndFolders.map((name) => {
      const fullPath = join(currentPath, name);
      const isDirectory = statSync(fullPath).isDirectory();
      return {
        name: name,
        type: isDirectory ? 'directory' : 'file',
      };
    });

    items.sort((a, b) => {
      if (a.type === b.type) {
        return a.name.localeCompare(b.name);
      }
      return a.type === 'directory' ? -1 : 1;
    });

    console.table(items);

  } catch (err) {
    console.error('Operation failed: Unable to read directory contents');
  }
};