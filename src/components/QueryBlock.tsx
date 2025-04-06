/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useCallback, useState } from 'react';
import { MdEdit as MdEditIcon } from 'react-icons/md';

import usePersistentState from '../hooks/usePersistentState';
import usePostgresDB from '../hooks/usePostgresDB';
import Editor, { EditorTheme } from './editor/Editor';
import { Response, Results } from './editor/types';
import { runQuery } from './editor/utils';
import Result from './Result';
import CollapseResultsButton from './ui/CollapseResultsButton';
import DeleteQueryBlock from './ui/DeleteQueryBlock';
import RunQueryButton from './ui/RunQueryButton';

interface QueryBlockProps {
  id: string
  initialName: string
  initialQuery: string
  onDelete: () => void
  onBlocksReload: () => void
  activeTheme: EditorTheme | null
}

const QueryBlock: FC<QueryBlockProps> = ({
  id,
  initialName,
  initialQuery,
  onDelete,
  onBlocksReload,
  activeTheme,
}) => {
  const { pg } = usePostgresDB()
  const initBlock = {
    id,
    name: initialName,
    query: initialQuery,
  }
  const [block, setBlock, setCallback] = usePersistentState(id, initBlock)
  const { query, name } = block || {}
  const [runningQuery, setRunningQuery] = useState(false)
  const [result, setResult] = useState<Response | null>(null)
  const [queryError, setQueryError] = useState<string | null>(null)
  const [isExpanded, toggleExpanded] = useState(false)
  const [editedName, editName] = useState<string | null>(null)

  const changeQueryHandler = useCallback((val: string) => {
    setBlock((block) => ({
      ...(block ?? initBlock),
      query: val,
    }))
  }, [])

  const toggleResultHandler = () => toggleExpanded((isExpanded) => !isExpanded)

  const runQueryHandler = async () => {
    if (query === undefined) return
    try {
      setQueryError(null)
      setRunningQuery(true)
      const response = await runQuery(query, pg)
      setResult(response)
      setRunningQuery(false)
      toggleExpanded(true)
    } catch (error) {
      setResult(null)
      setRunningQuery(false)
      setQueryError((error as Error).message)
    }
  }

  const onNameEditHandler = (val?: string) => {
    if (val) return editName(val)

    if (!name) return
    editName(name)
  }

  const saveNameHandler = () => {
    if (!editedName) return
    setCallback(() => {
      onBlocksReload()
    })
    setBlock((block) => ({
      ...(block ?? initBlock),
      name: editedName,
    }))
    editName(null)
  }

  const affectedRows = result?.results?.find(
    (result) => !!result?.affectedRows
  )?.affectedRows

  const hasRows =
    result?.results &&
    result?.results?.some((result) => result?.rows && result?.rows.length != 0)

  const showSuccessMessage =
    result?.results && !hasRows && !queryError && !affectedRows

  const header = (
    <div className="flex items-center p-1 gap-2">
      {!editedName && (
        <h2 className="text-gray-800 dark:text-[#afccb0] text-sm">
          {name ?? "Loading..."}
        </h2>
      )}
      {editedName && (
        <input
          maxLength={100}
          value={editedName}
          onChange={(e) => onNameEditHandler(e.target.value)}
          className="text-gray-800 dark:text-[#afccb0] text-sm bg-transparent border border-gray-600 outline-none"
        />
      )}
      {editedName && (
        <button
          onClick={saveNameHandler}
          className="text-sm text-gray-800 dark:text-white bg-[#d0dbe1] dark:bg-slate-700 px-2 rounded"
        >
          Save
        </button>
      )}
      {!editedName && (
        <button
          className="text-gray-400 dark:text-gray-600"
          onClick={() => onNameEditHandler()}
        >
          <MdEditIcon />
        </button>
      )}
      <div className="flex-1" />
      <RunQueryButton loading={runningQuery} onRun={runQueryHandler} />
      <DeleteQueryBlock onDelete={onDelete} />
    </div>
  )

  const footer = (
    <div className="flex items-center p-0 py-0.5 px-2 bg-white dark:bg-[#0c1117] border-t-[#d0dbe1] dark:border-t-[#333338] border-t-[1px]">
      {hasRows && (
        <CollapseResultsButton
          isExpanded={isExpanded}
          onClick={toggleResultHandler}
        />
      )}
      {queryError && (
        <p className="text-xs text-red-600 first-letter:uppercase">
          {queryError}
        </p>
      )}
      <div className="flex-1" />
      {affectedRows && (
        <p className="px-5 text-xs text-green-600 dark:text-green-400 first-letter:uppercase">
          Affected rows: {affectedRows}
        </p>
      )}
      {showSuccessMessage && (
        <p className="px-5 text-xs text-green-600 dark:text-green-400 first-letter:uppercase">
          Success
        </p>
      )}
      {result?.time && (
        <p className="text-[#758776] text-xs">
          Executed in {result?.time?.toFixed(2)} ms
        </p>
      )}
    </div>
  )

  return (
    <div id={id} className="bg-[#f5f8fa] dark:bg-[#21222c]">
      {header}
      {query != undefined && (
        <Editor
          theme={activeTheme != null ? activeTheme : "auto"}
          loading={runningQuery}
          query={query}
          onQueryChange={changeQueryHandler}
        />
      )}
      {footer}
      <div
        className="flex flex-col gap-3 transition-all"
        style={{ height: isExpanded ? "fit-content" : 0 }}
      >
        {result?.results?.map((result: Results, index: number) => (
          <Result
            theme={activeTheme}
            key={index}
            loading={runningQuery}
            result={result}
          />
        ))}
      </div>
    </div>
  )
}

export default QueryBlock
