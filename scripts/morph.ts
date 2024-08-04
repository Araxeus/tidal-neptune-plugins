import { Project } from 'ts-morph';

const project = new Project();
const sourceFile = project.addSourceFileAtPath(
    './node_modules/neptune-types/tidal/index.d.ts',
);

const actionTypes = sourceFile.getInterface('ActionTypes');
checkExists(actionTypes, 'ActionTypes');

const actions = actionTypes
    .getProperties()
    ?.map((a) => a.getName().replace(/"/g, ''));
checkExists(actions, 'Actions');

Bun.write(
    './lib/actions.ts',
    `\
import type { ActionTypes } from "neptune-types/tidal";

const actions: (keyof ActionTypes)[] = ${JSON.stringify(actions, null, 2)};

export default actions;\n
`,
);

function checkExists(prop: unknown, name: string): asserts prop {
    if (!prop) throw new Error(`${name} not found`);
}
