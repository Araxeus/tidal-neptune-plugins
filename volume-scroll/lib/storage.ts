import { storage } from '@plugin';

type StorageSettings = Record<string | number | symbol, JSONValue>;
type Storage = StorageSettings & { settings?: never };
export const getStorage = <T extends Storage>(defaultValue: T): T => {
    for (const key of Object.keys(defaultValue)) {
        storage[key] ??= defaultValue[key];
    }
    return <T>storage;
};
export const getSettings = <T extends StorageSettings>(defaultValue: T): T => {
    storage.settings ??= {};
    for (const key of Object.keys(defaultValue)) {
        storage.settings[key] ??= defaultValue[key];
    }
    return <T>storage.settings;
};
