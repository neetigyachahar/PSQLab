/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from "react"
import { AiOutlineLoading3Quarters as AiOutlineLoading3QuartersIcon } from "react-icons/ai"

import { EditorTheme } from "./editor/Editor"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/AlertDialog"
import { Button } from "./ui/Button"
import { FaGithub } from "react-icons/fa6"
import { Info } from "lucide-react"
// import ProductHuntLabel from "./ui/ProductHuntLabel"

interface HeaderProps {
  activeTheme: EditorTheme | null
  onClearQueries: () => void
  setActiveTheme: (_: EditorTheme) => void
}

const Header: FC<HeaderProps> = ({
  activeTheme,
  onClearQueries,
  setActiveTheme,
}) => {
  const [isReseting, setResetting] = useState(false)

  const resetHandler = async () => {
    if (isReseting) return
    setResetting(true)
    await onClearQueries()
    setResetting(false)
  }

  const loadThemeHandler = async () => {
    const theme = localStorage.getItem("theme") ?? ("dark" as EditorTheme)
    setActiveTheme(theme as EditorTheme)
    localStorage.setItem("theme", theme)
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
      document.body.style.background = "#0c1117"
    } else {
      document.documentElement.classList.remove("dark")
      document.body.style.background = "#ffffff"
    }
  }

  const toggleThemeHandler = () => {
    const newActiveTheme = activeTheme === "dark" ? "light" : "dark"
    localStorage.setItem("theme", newActiveTheme)
    if (activeTheme === "dark") {
      document.documentElement.classList.remove("dark")
      document.body.style.background = "#ffffff"
    } else {
      document.documentElement.classList.add("dark")
      document.body.style.background = "#0c1117"
    }
    setActiveTheme(newActiveTheme)
  }

  useEffect(() => {
    loadThemeHandler()
  }, [])

  return (
    <header className="h-14 flex text-gray-900 gap-4 font-semibold dark:text-gray-300 text-3xl items-center px-6 border-b-[1px] border-b-[#d0dbe1] dark:border-b-[#21222c] bg-white dark:bg-[#0c1117]">
      <h1>PSQLab</h1>
      <div className="flex-1" />

      <a
        target="_blank"
        href="https://dev.to/neetigyachahar/introducing-psqlab-your-in-browser-postgresql-playground-4anb"
      >
        <Button variant="outline" className="gap-2 border-gray-500">
          <Info className="h-[1.2rem] w-[1.2rem]" />
          Learn more
        </Button>
      </a>
      <a target="_blank" href="https://github.com/neetigyachahar/psqlab">
        <Button variant="outline" className="gap-2 border-gray-500">
          <FaGithub className="h-[1.2rem] w-[1.2rem]" />
          Repo
        </Button>
      </a>

      <label className="inline-flex items-center cursor-pointer mx-4">
        <input
          checked={activeTheme === "dark"}
          onClick={toggleThemeHandler}
          type="checkbox"
          value=""
          className="sr-only peer"
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
      </label>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="bg-red-900/90 dark:bg-red-900/30 text-gray-300">
            {isReseting ? (
              <AiOutlineLoading3QuartersIcon className="animate-spin" />
            ) : (
              "Reset"
            )}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="text-black dark:text-white bg-[#f5f8fa] dark:bg-[#0c1117] border-none">
          <AlertDialogHeader>
            <AlertDialogTitle>Reset PSQLab?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              saved queries.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-[#d0dbe1] dark:bg-[#21222c] outline-none border-none">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={resetHandler}>
              {isReseting ? (
                <AiOutlineLoading3QuartersIcon className="animate-spin" />
              ) : (
                "Continue"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  )
}

export default Header
