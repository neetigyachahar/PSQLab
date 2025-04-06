import { openDB } from 'idb';
import { useEffect, useRef, useState } from 'react';

const usePersistentState = <T,>(key: string, initialValue: T) => {
  const PERSISTENT_STATE_DB_NAME = "persistentStateDB"
  const [state, setState] = useState<T>()
  const callbackRef = useRef<any>(null)

  useEffect(() => {
    const initDB = async () => {
      const db = await openDB(PERSISTENT_STATE_DB_NAME, 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains("stateStore")) {
            db.createObjectStore("stateStore")
          }
        },
      })

      const storedValue = await db.get("stateStore", key)
      if (storedValue !== undefined) {
        setState(storedValue as T)
      } else {
        setState(initialValue)
      }
    }

    initDB()
  }, [key])

  useEffect(() => {
    const saveState = async () => {
      const db = await openDB(PERSISTENT_STATE_DB_NAME, 1)
      await db.put("stateStore", state, key)
      if (callbackRef.current) {
        callbackRef.current?.callback()
        callbackRef.current = null
      }
    }

    saveState()
  }, [key, state])

  const setCallback = (callback: any) => {
    callbackRef.current = {
      callback
    }
  }

  return [state, setState, setCallback] as const
}

export default usePersistentState
