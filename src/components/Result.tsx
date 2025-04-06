import { isBoolean, isNumber, isString } from 'lodash';
import { FC, memo } from 'react';

import { Row } from '@electric-sql/pglite';

import { cn } from '../utils/cn';
import { EditorTheme } from './editor/Editor';
import { ResultField, Results } from './editor/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/Table';

interface ResultProps {
  result: Results
  loading: boolean
  theme: EditorTheme | null
}

const Result: FC<ResultProps> = ({ result, theme }) => {
  const getDataTypeColor = (cell: unknown) => {
    if (cell === null) return theme === "dark" ? "#89929b" : "#c6cdd5"
    if (isNumber(cell)) return "#cb7832"
    if (isString(cell)) return theme === "dark" ? "#c6cdd5" : "#161b22"
    if (isBoolean(cell)) return theme === "dark" ? "#0089db" : "#0089db"
  }

  return (
    !!result?.rows &&
    result?.rows.length != 0 && (
      <Table className="border-b dark:border-none border-t-[#d0dbe1]">
        <TableHeader>
          <TableRow className="border-none bg-[#f5f8fa] dark:bg-[#161b22] px-10">
            {result?.fields?.map((field: ResultField, index: number) => (
              <TableHead
                key={index}
                className="font-semibold text-[#161b22] dark:text-[#c6cdd5] p-1"
              >
                {field.name}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {result?.rows?.map((row: Row, index: number) => (
            <TableRow
              key={index}
              className={cn(
                "border-none !px-10",
                index % 2
                  ? "bg-[#f5f8fa] dark:bg-[#161b22]"
                  : "bg-white dark:bg-[#0d1117]"
              )}
            >
              {Object.values(row).map((cell, index) => {
                const cellData = JSON.parse(JSON.stringify(cell))
                return (
                  <TableCell
                    key={index}
                    className={cn(
                      "border-none p-1 py-2 text-sm"
                      // `text-[${}]`
                    )}
                    style={{ color: getDataTypeColor(cellData) }}
                  >
                    {cellData ?? "null"}
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  )
}

const areEqual = (prevProps: ResultProps, nextProps: ResultProps) =>
  prevProps.loading === nextProps.loading && prevProps.theme === nextProps.theme

export default memo(Result, areEqual)
