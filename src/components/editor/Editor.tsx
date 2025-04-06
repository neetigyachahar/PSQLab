import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { PostgreSQL } from '@codemirror/lang-sql';
import { githubDark, githubLight } from '@uiw/codemirror-theme-github';
import CodeMirror, { Extension, ReactCodeMirrorRef } from '@uiw/react-codemirror';

import usePostgresDB from '../../hooks/usePostgresDB';
import { makeSqlExt } from './sqlSupport';
import { getSchema } from './utils';

const defaultLightTheme = githubLight
const defaultDarkTheme = githubDark

export type EditorTheme = "light" | "dark" | "auto"

export interface EditorProps {
  lightTheme?: Extension
  darkTheme?: Extension
  theme: EditorTheme | null
  disableUpdateSchema?: boolean
  query: string
  loading: boolean
  onQueryChange: (val: string) => void
}

const Editor: FC<EditorProps> = ({
  lightTheme = defaultLightTheme,
  darkTheme = defaultDarkTheme,
  theme = "auto",
  query,
  loading,
  onQueryChange,
}) => {
  const { pg } = usePostgresDB()

  const rcm = useRef<ReactCodeMirrorRef | null>(null)
  const [schema, setSchema] = useState<Record<string, string[]>>({})

  const [themeToUse, setThemeToUse] = useState<Extension>(
    theme === "dark" ? darkTheme : lightTheme
  )

  useEffect(() => {
    if (theme === "auto") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"
      setThemeToUse(systemTheme === "dark" ? darkTheme : lightTheme)
      const listener = (e: MediaQueryListEvent) => {
        setThemeToUse(e.matches ? darkTheme : lightTheme)
      }
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", listener)
      return () => {
        window
          .matchMedia("(prefers-color-scheme: dark)")
          .removeEventListener("change", listener)
      }
    } else {
      setThemeToUse(theme === "dark" ? darkTheme : lightTheme)
      return
    }
  }, [theme, lightTheme, darkTheme])

  const extensions = useMemo(
    () => [
      makeSqlExt({
        dialect: PostgreSQL,
        schema: schema,
        tables: [
          {
            label: "d",
            displayLabel: "\\d",
          },
        ],
        defaultSchema: "public",
      }),
    ],
    [schema]
  )

  const onChange = useCallback(
    (val: string) => {
      onQueryChange(val)
    },
    [onQueryChange]
  )

  return (
    <CodeMirror
      ref={rcm}
      width="100%"
      value={query}
      minHeight="100px"
      placeholder={"Write query..."}
      extensions={extensions}
      theme={themeToUse}
      onChange={onChange}
      editable={!loading}
      onCreateEditor={() => {
        getSchema(pg).then(setSchema)
      }}
    />
  )
}

export default Editor
