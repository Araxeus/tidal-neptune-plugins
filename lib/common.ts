import { readdir } from 'node:fs/promises';

export const getPlugins = async () =>
    (await readdir('./plugins', { withFileTypes: true })).flatMap((dirent) =>
        dirent.isDirectory() ? dirent.name : [],
    );
