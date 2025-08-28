'use client';

import React from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';

interface ActionButtonsProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  size?: 'sm' | 'md' | 'lg';
  showView?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onView,
  onEdit,
  onDelete,
  size = 'md',
  showView = true,
  showEdit = true,
  showDelete = true
}) => {
  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8',
    lg: 'w-9 h-9'
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <div className="flex items-center gap-1">
      {showView && onView && (
        <button
          onClick={onView}
          className={`${sizeClasses[size]} flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 transition-colors duration-200`}
          title="View"
        >
          <Eye className={iconSizes[size]} />
        </button>
      )}
      
      {showEdit && onEdit && (
        <button
          onClick={onEdit}
          className={`${sizeClasses[size]} flex items-center justify-center rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400 dark:hover:bg-amber-900/50 transition-colors duration-200`}
          title="Edit"
        >
          <Edit className={iconSizes[size]} />
        </button>
      )}
      
      {showDelete && onDelete && (
        <button
          onClick={onDelete}
          className={`${sizeClasses[size]} flex items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 transition-colors duration-200`}
          title="Delete"
        >
          <Trash2 className={iconSizes[size]} />
        </button>
      )}
    </div>
  );
};

export default ActionButtons;
