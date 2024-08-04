import { readdir } from 'node:fs/promises';
import { $ } from 'bun';

const [oldDirs, currentDirs] = await Promise.all([
    $`git ls-tree -d -r $(git rev-parse HEAD~1):plugins`.text().then(
        (text) =>
            new Set(
                text
                    .trim()
                    .split('\n')
                    .map((line) => line.split('\t')[1]),
            ),
    ),
    readdir('./plugins', { withFileTypes: true }).then(
        (files) =>
            new Set(files.flatMap((f) => (f.isDirectory() ? [f.name] : []))),
    ),
]);

const x = [1, 2];
x.filter;

const added = [...currentDirs].some((dir) => !oldDirs.has(dir));
const deleted = [...oldDirs].some((dir) => !currentDirs.has(dir));

console.log(added || deleted ? 'true' : 'false');
