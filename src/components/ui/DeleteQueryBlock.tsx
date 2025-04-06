import { useState } from 'react';
import { FaCheck as FaCheckIcon } from 'react-icons/fa6';
import { MdClose as MdCloseIcon, MdOutlineDelete as MdOutlineDeleteIcon } from 'react-icons/md';

const DeleteQueryBlock = ({ onDelete }: any) => {
  const [askConfirm, setAskConfirm] = useState(false)
  return (
    <>
      {!askConfirm && (
        <button
          onClick={() => setAskConfirm(true)}
          className="text-gray-600 dark:text-gray-400 mx-1 rounded hover:bg-red-400/10"
        >
          <MdOutlineDeleteIcon size={20} />
        </button>
      )}
      {askConfirm && (
        <>
          <button
            onClick={onDelete}
            className="text-green-600 dark:text-green-400 mx-1 "
          >
            <FaCheckIcon size={14} />
          </button>
          <button
            onClick={() => setAskConfirm(false)}
            className="text-red-600 dark:text-red-400 mx-1"
          >
            <MdCloseIcon />
          </button>
        </>
      )}
    </>
  )
}

export default DeleteQueryBlock
