'use client';

import React from 'react';

interface Column {
  width?: string;
}

interface TableSkeletonProps {
  rows?: number;
  columns: Column[];
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({ rows = 5, columns }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="overflow-x-auto">
        <div style={{ minWidth: 'fit-content' }}>
          <table className="w-full">
            {/* Table Header Skeleton */}
            <thead className="border-b border-gray-100 dark:border-white/[0.05]">
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className="px-5 py-3 text-start"
                    style={{ width: column.width || '200px' }}
                  >
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-20"></div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body Skeleton */}
            <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {Array.from({ length: rows }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-4 py-3"
                      style={{ width: column.width || '200px' }}
                    >
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-16"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableSkeleton;
