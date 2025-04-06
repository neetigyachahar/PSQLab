import { FC } from 'react';
import { AiOutlineLoading3Quarters as AiOutlineLoading3QuartersIcon } from 'react-icons/ai';
import { IoPlay as IoPlayIcon } from 'react-icons/io5';

import { cn } from '../../utils/cn';

interface RunQueryButtonProps {
  loading: boolean
  onRun: () => void
}

const RunQueryButton: FC<RunQueryButtonProps> = ({ loading, onRun }) => (
  <button
    onClick={onRun}
    disabled={loading}
    className={cn(
      "flex items-center justify-center px-1 py-0 gap-1 rounded hover:bg-green-900/35",
      loading
        ? "text-gray-600 dark:text-gray-400"
        : "text-green-700 dark:text-green-600"
    )}
  >
    <p>Run{loading && "ning..."}</p>
    {!loading && <IoPlayIcon size={18} />}
    {loading && (
      <AiOutlineLoading3QuartersIcon className="animate-spin" size={16} />
    )}
  </button>
)

export default RunQueryButton
