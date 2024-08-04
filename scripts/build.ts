import { rmdir, readdir } from 'node:fs/promises';
import { resolve as resolvePath, join as j } from 'node:path';
//import Bun from 'bun';

import packageJson from '../package.json';

interface Globalthis {
    Bun: typeof import('bun');
}

import prettyMs from 'pretty-ms';

const nativeExternals = ['@neptune', '@plugin', 'electron'];

const plugins = (await readdir('./plugins', { withFileTypes: true })).flatMap(
    (dirent) => (dirent.isDirectory() ? dirent.name : []),
);

for (const pluginName of plugins) {
    const timeNow = performance.now();
    console.log(`Building ${pluginName}...`);
    const dir = resolvePath(import.meta.dir, '..', 'plugins', pluginName);
    const destFolder = j(dir, 'release');
    await rmdir(destFolder, { recursive: true });
    const res = await Bun.build({
        entrypoints: [j(dir, 'src', 'index.ts')],
        outdir: destFolder,
        target: 'browser',
        minify: true,
        external: nativeExternals,
        //packages: "external",
    });

    console.log(res); // DELETE

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
        `Successfully built ${pluginName} in ${prettyMs(performance.now() - timeNow)}`,
    );
}

async function getMD5Hash(filepath: string): Promise<string> {
    const file = Bun.file(filepath);
    const hasher = new Bun.CryptoHasher('md5');
    hasher.update(await file.arrayBuffer());
    return hasher.digest('hex');
}
