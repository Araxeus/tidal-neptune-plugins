import { intercept } from '@neptune';
import type { ActionTypes } from 'neptune-types/tidal';
type NeptuneActions = {
    [key: string]: (() => void) | { [key: string]: () => void };
};
const actions = window.neptune.actions as unknown as NeptuneActions;

const camelToUpperSnake = (s: string) =>
    s.replace(/[A-Z]/g, (l) => `_${l}`).toUpperCase();

const getFnNames = (x: NeptuneActions) =>
    Object.keys(x).flatMap((key) =>
        typeof x[key] === 'function'
            ? camelToUpperSnake(key)
            : Object.keys(x[key]).map((k) => `${key}/${camelToUpperSnake(k)}`),
    ) as (keyof ActionTypes)[];

intercept(getFnNames(actions), console.log);
