import { resolve as resolvePath } from 'node:path';
import { getPlugins } from 'lib/common';
import {
    type Node,
    type Document as YamlDoc,
    isNode,
    parseDocument,
} from 'yaml';
const plugins = await getPlugins();

const actionPath = resolvePath(
    import.meta.dir,
    '..',
    '.github',
    'workflows',
    'manual-deploy.yml',
);

const file = await Bun.file(actionPath).text();

const action = parseDocument(file);

const inputs = action.getIn(['on', 'workflow_dispatch', 'inputs']) as YamlDoc<
    Node<{
        [key: string]: {
            type: 'boolean';
            required: false;
        };
    }>
>;
if (isNode(inputs)) {
    for (const plugin of plugins) {
        inputs.set(plugin, { type: 'boolean', default: false });
    }
} else {
    throw new Error('Inputs is not a Node in manual-deploy.yml');
}

await Bun.write(actionPath, action.toString({ lineWidth: 0 }));
