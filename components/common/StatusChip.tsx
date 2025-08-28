'use client';

import React from 'react';

interface StatusChipProps {
  status?: 'active' | 'inactive' | string;
  size?: 'sm' | 'md' | 'lg';
}

const StatusChip: React.FC<StatusChipProps> = ({ status, size = 'md' }) => {
  const isActive = status?.toLowerCase() === 'active';
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const statusClasses = isActive
    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800'
    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';

  return (
    <span
      className={`
        inline-flex items-center justify-center font-medium rounded-full border
        ${sizeClasses[size]}
        ${statusClasses}
      `}
    >
      <span
        className={`w-2 h-2 rounded-full mr-2 ${
          isActive ? 'bg-green-500' : 'bg-red-500'
        }`}
      />
      {isActive ? 'Active' : 'Inactive'}
    </span>
  );
};

export default StatusChip;
