const RightPane = () => {
  return (
    <div className="sticky flex flex-col items-center justify-center h-screen top-0 bottom-0 w-56 p-4 bg-white dark:bg-[#21222c] border-l border-l-[#d0dbe1] dark:border-l-[#0c1117] cm-scroller overflow-auto">
      <p className="text-center text-gray-600 dark:text-white">
        Learn about PostgreSQL syntax here.
      </p>
      <a
        className="text-blue-500"
        href="https://www.w3schools.com/postgresql/"
        target="_blank"
        rel="noreferrer noopener"
      >
        Learn more
      </a>
      <p className="text-center text-xs text-gray-600 dark:text-gray-400 mt-5">
        How about adding AI to this project?
        <br />
        Feel free to contribute on the on the{" "}
        <a
          href="https://github.com/neetigyachahar/psqlab"
          target="_blank"
          rel="noreferrer noopener"
          className="text-blue-500"
        >
          GitHub repo
        </a>
        .
      </p>
    </div>
  )
}

export default RightPane
