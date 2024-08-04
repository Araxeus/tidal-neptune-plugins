import { readdir, rmdir } from 'node:fs/promises';
import { join as j, resolve as resolvePath } from 'node:path';

import prettyMs from 'pretty-ms';

import packageJson from '../package.json';

const plugins = (await readdir('./plugins', { withFileTypes: true })).flatMap(
    (dirent) => (dirent.isDirectory() ? dirent.name : []),
);

for (const pluginName of plugins) {
    const timeNow = performance.now();
    const dir = resolvePath(import.meta.dir, '..', 'plugins', pluginName);
    const destFolder = j(dir, 'release');

    await rmdir(destFolder, { recursive: true });

    const res = await Bun.build({
        entrypoints: [j(dir, 'src', 'index.ts')],
        outdir: destFolder,
        target: 'browser',
        minify: true,
        external: ['@neptune', '@plugin', 'electron'],
        //packages: "external",
    });

    if (!res.outputs?.length) {
        console.error(`Error building ${pluginName}`);
        continue;
    }

    const plugin = (await import(j(dir, 'plugin.json'))) as {
        name: string;
        description: string;
        author?: string;
        version: string;
    };

    const manifestData = JSON.stringify({
        name: plugin.name,
        description: `${plugin.description} (v${plugin.version})`,
        author: plugin.author || packageJson.author,
        version: plugin.version,
        hash: await getMD5Hash(res.outputs[0].path),
    });

    await Bun.write(j(destFolder, 'manifest.json'), manifestData);

    await Bun.write(
        j(destFolder, 'standalone.js'),
        `/* ${manifestData} */\n${await res.outputs[0].text()}`,
    );

    console.log(
        `Built plugin ${pluginName} in ${prettyMs(performance.now() - timeNow)}`,
    );
}

async function getMD5Hash(filepath: string): Promise<string> {
    const file = Bun.file(filepath);
    const hasher = new Bun.CryptoHasher('md5');
    hasher.update(await file.arrayBuffer());
    return hasher.digest('hex');
}

interface Globalthis {
    Bun: typeof import('bun');
}
