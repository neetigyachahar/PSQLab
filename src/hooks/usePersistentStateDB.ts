import { deleteDB, openDB } from 'idb';

const usePersistentStateDB = () => {
    const PERSISTENT_STATE_DB_NAME = "persistentStateDB";

    const deleteKey = async (key: string) => {
        const db = await openDB(PERSISTENT_STATE_DB_NAME, 1);
        await db.delete("stateStore", key);
    };

    const deleteDatabase = async () => {
        await deleteDB(PERSISTENT_STATE_DB_NAME);
    };

    const readValue = async <T,>(key: string): Promise<T | undefined> => {
        const db = await openDB(PERSISTENT_STATE_DB_NAME, 1);
        const value = await db.get("stateStore", key);
        return value as T | undefined;
    };

    const removeUnusedBlocks = async (usedKeys: string[]) => {
        const db = await openDB(PERSISTENT_STATE_DB_NAME, 1);
        const keys = await db.getAllKeys('stateStore');
        for (const key of keys) {
            if (key != "blocks" && !usedKeys.includes(key as string)) {
                await db.delete("stateStore", key);
            }
        }
    }

    return { deleteKey, deleteDatabase, readValue, removeUnusedBlocks };
};

export default usePersistentStateDB;
