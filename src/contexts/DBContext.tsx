/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from 'react';

import { PGlite } from '@electric-sql/pglite';

const DBContext = createContext<any>({})

const DBProvider = ({ children }: any) => {
  const db = new PGlite()

  return <DBContext.Provider value={{ db }}>{children}</DBContext.Provider>
}

export { DBContext, DBProvider }
