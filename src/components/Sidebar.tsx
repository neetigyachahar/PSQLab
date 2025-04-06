import { FC, useState } from "react"
import { IoIosAdd as IoIosAddIcon } from "react-icons/io"
import { MdExpandMore as MdExpandMoreIcon } from "react-icons/md"

import exampleQueries from "../queries/exampleQueries"
import { Block } from "../types"
import { cn } from "../utils/cn"

interface SidebarProps {
  items: Block[]
  onNewQuery: (block?: Block) => void
}

const Sidebar: FC<SidebarProps> = ({ items, onNewQuery }) => {
  const [isDefaultQueryOpen, setDefaultQueryOpen] = useState(false)
  return (
    <div className="text-black dark:text-[#d1d5db] sticky h-screen top-0 bottom-0 w-52 bg-white dark:bg-[#0c1117] border-r border-r-[#d0dbe1] dark:border-r-[#21222c] cm-scroller overflow-auto text-xs font-medium">
      {items?.map(({ id, name }: Block) => (
        <a
          key={id}
          href={`#${id}`}
          className="block break-words w-full border-b-[1px] border-b-[#d0dbe1] dark:border-b-[#21222c] py-3 px-4 text-left hover:bg-[#d0dbe1] dark:hover:bg-[#21222c] leading-tight dark:text-[#d1d5db]"
        >
          {name}
        </a>
      ))}
      <button
        onClick={() => onNewQuery()}
        className="flex items-center w-full border-b-[1px] border-b-[#d0dbe1] dark:border-b-[#21222c] py-2 px-4 text-left hover:bg-[#d0dbe1] dark:hover:bg-[#21222c] dark:text-[#d1d5db]"
      >
        <IoIosAddIcon size={20} className="mr-1" />
        <span className="text-xs">Add query</span>
      </button>
      <button
        onClick={() => setDefaultQueryOpen((isOpen) => !isOpen)}
        className={cn(
          "flex items-center w-full border-b-[1px] border-b-[#d0dbe1] dark:border-b-[#21222c] py-2 px-4 text-left hover:bg-[#d0dbe1] dark:hover:bg-[#21222c]",
          isDefaultQueryOpen
            ? "dark:text-[#d1d5db]"
            : "text-gray-600 dark:text-[#758776]"
        )}
      >
        <MdExpandMoreIcon
          className={cn(
            "h-3 w-3 transition-transform duration-300 transform mr-2",
            isDefaultQueryOpen ? "rotate-180" : ""
          )}
        />
        <span className="text-xs">Sample queries</span>
      </button>
      <div className={cn("overflow-hidden", isDefaultQueryOpen ? "" : "h-0")}>
        {exampleQueries?.map(({ name, query }, index: number) => (
          <button
            key={index}
            onClick={() => {
              onNewQuery({
                name,
                query,
              })
            }}
            className="block break-words w-full border-b-[1px] border-b-[#d0dbe1] dark:border-b-[#21222c] py-3 px-4 text-left hover:bg-[#d0dbe1] dark:hover:bg-[#21222c] text-xs leading-tight dark:text-[#d1d5db]"
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
