import { rmdir } from 'node:fs/promises';
import Bun from 'bun';
import plugin from './package.json';

const nativeExternals = ['@neptune', '@plugin', 'electron'];

const destination = './release';

await rmdir(destination, { recursive: true });

const res = await Bun.build({
    entrypoints: ['./src/index.ts'],
    outdir: destination,
    target: 'browser',
    minify: true,
    external: nativeExternals,
    //packages: "external",
});

console.log(res);

if (!res.outputs?.length) {
    console.error('Not generating manifest because no outputs were generated');
}

const manifestData = JSON.stringify({
    name: plugin.name,
    description: `${plugin.description} (v${plugin.version})`,
    author: plugin.author,
    version: plugin.version,
    hash: await getMD5Hash(res.outputs[0].path),
});

await Bun.write(`${destination}/manifest.json`, manifestData);

await Bun.write(
    `${destination}/standalone.js`,
    `/* ${manifestData} */\n${await res.outputs[0].text()}`,
);

async function getMD5Hash(filepath: string): Promise<string> {
    const file = Bun.file(filepath);
    const hasher = new Bun.CryptoHasher('md5');
    hasher.update(await file.arrayBuffer());
    return hasher.digest('hex');
}
