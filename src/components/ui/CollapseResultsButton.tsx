import { FC } from 'react';
import { MdExpandMore as MdExpandMoreIcon } from 'react-icons/md';

import { cn } from '../../utils/cn';

interface CollapseResultsButtonProps {
  isExpanded: boolean
  onClick: () => void
}

const CollapseResultsButton: FC<CollapseResultsButtonProps> = ({
  isExpanded,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="flex px-1 gap-1 rounded text-[#758776] text-xs hover:bg-gray-600/20"
    >
      <MdExpandMoreIcon
        className={cn(
          "h-4 w-4 transition-transform duration-300 transform",
          isExpanded ? "rotate-180" : ""
        )}
      />
      {isExpanded && "Hide"}
      {!isExpanded && "Show"}
    </button>
  )
}

export default CollapseResultsButton
