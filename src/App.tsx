/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters as AiOutlineLoading3QuartersIcon } from 'react-icons/ai';

import { EditorTheme } from './components/editor/Editor';
import { generateRandomString } from './components/editor/utils';
import Header from './components/Header';
import QueryBlock from './components/QueryBlock';
import RightPane from './components/RightPane';
import Sidebar from './components/Sidebar';
import usePersistentState from './hooks/usePersistentState';
import usePersistentStateDB from './hooks/usePersistentStateDB';
import usePostgresDB from './hooks/usePostgresDB';
import { Block } from './types';

function App() {
  const { loadingData } = usePostgresDB()
  const [activeTheme, setActiveTheme] = useState<EditorTheme | null>(null)
  const { readValue, deleteDatabase, deleteKey, removeUnusedBlocks } =
    usePersistentStateDB()
  const [blockIds, setBlockIds, setCallback] = usePersistentState("blocks", [
    generateRandomString(10),
  ])
  const [blocks, setBlocks] = useState<Block[]>([])
  const [defaultBlocks, setDefaultBlocks] = useState<Block[]>([])

  const loadBlocks = async () => {
    let blocks: Block[] = []
    const blockIds = (await readValue<string[]>("blocks")) ?? []
    for (const id of blockIds) {
      const block = await readValue<Block>(id)
      if (block) blocks = [...blocks, block]
    }
    blocks = blocks.filter(Boolean)
    setBlocks(blocks)
  }

  useEffect(() => {
    setCallback(() => {
      setTimeout(() => {
        loadBlocks()
      }, 3000)
    })
  }, [])

  useEffect(() => {
    if (blockIds != undefined) removeUnusedBlocks(blockIds)
  }, [blockIds])

  const addNewQueryBlock = (block?: Block) => {
    const id = generateRandomString(10)
    if (block) {
      setDefaultBlocks((blocks: Block[]) => [
        ...blocks,
        {
          id,
          name: block.name,
          query: block.query,
        },
      ])
    }

    if (!blockIds) return
    setCallback(() => {
      loadBlocks()
    })
    setBlockIds([...blockIds, id])
  }

  const deleteQueryBlock = (id: string) => {
    if (!blockIds) return
    setCallback(() => {
      loadBlocks()
    })
    setBlockIds(blockIds.filter((blockId) => blockId !== id))
    deleteKey(id)
  }

  const resetPsqlab = async () => {
    try {
      await deleteDatabase()
      window.location.reload()
    } catch (error) {
      console.error(error)
      window.location.reload()
    }
  }

  return (
    <>
      <Header
        activeTheme={activeTheme}
        setActiveTheme={setActiveTheme}
        onClearQueries={resetPsqlab}
      />
      <div className="flex">
        <Sidebar
          onNewQuery={addNewQueryBlock}
          items={(blocks ?? []).map(({ id, name }: Block) => ({
            id,
            name,
          }))}
        />
        <div className="flex-1 w-0">
          {loadingData && (
            <div className="text-black dark:text-white h-screen flex-1 flex items-center justify-center">
              <AiOutlineLoading3QuartersIcon className="animate-spin" />
              <p className="ml-2">Configuring database...</p>
            </div>
          )}
          {!loadingData &&
            (blockIds ?? []).map((id, index: number) => (
              <QueryBlock
                activeTheme={activeTheme}
                key={id}
                id={id}
                initialName={
                  defaultBlocks.find((block: Block) => block.id === id)?.name ??
                  `Query ${index + 1}`
                }
                initialQuery={
                  defaultBlocks.find((block: Block) => block.id === id)
                    ?.query ?? ""
                }
                onDelete={() => deleteQueryBlock(id)}
                onBlocksReload={loadBlocks}
              />
            ))}
        </div>
        <RightPane />
      </div>
    </>
  )
}

export default App
