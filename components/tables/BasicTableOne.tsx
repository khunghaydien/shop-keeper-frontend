import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import TableSkeleton from "./TableSkeleton";

interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
}

interface BasicTableOneProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
}

export default function BasicTableOne<T>({ data, columns, loading = false }: BasicTableOneProps<T>) {
  // Show skeleton when loading
  if (loading) {
    return <TableSkeleton columns={columns} rows={5} />;
  }

  // Show empty state when no data
  if (!data || data.length === 0) {
    return (
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">
              No data available
            </div>
            <div className="text-gray-400 dark:text-gray-500 text-sm">
              There are no items to display at the moment.
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Separate the last column (Action) from other columns
  const actionColumn = columns[columns.length - 1];
  const dataColumns = columns.slice(0, -1);

  return (
    <div className="relative rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="flex">
        {/* Scrollable data columns */}
        <div className="flex-1 overflow-x-auto">
          <Table className="w-full">
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {dataColumns.map((column, index) => (
                  <TableCell
                    key={index}
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
                    style={{ 
                      width: column.width || 'auto'
                    }}
                  >
                    {column.header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {dataColumns.map((column, colIndex) => (
                    <TableCell
                      key={colIndex}
                      className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap"
                      style={{ 
                        width: column.width || 'auto'
                      }}
                    >
                      {column.render
                        ? column.render(row[column.accessor], row)
                        : (row[column.accessor]) as React.ReactNode}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Fixed Action column */}
        <div className="border-l border-gray-100 dark:border-white/[0.05]">
          <Table className="w-full">
            {/* Action Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap bg-gray-50 dark:bg-white/[0.02]"
                  style={{ width: actionColumn.width || '120px' }}
                >
                  {actionColumn.header}
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Action Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell
                    className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap bg-gray-50 dark:bg-white/[0.02]"
                    style={{ width: actionColumn.width || '120px' }}
                  >
                    {actionColumn.render
                      ? actionColumn.render(row[actionColumn.accessor], row)
                      : (row[actionColumn.accessor] as React.ReactNode)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}