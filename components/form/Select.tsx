import React, { useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  name?: string;
  options: Option[];
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  className?: string;
  error?: string | boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  name,
  options,
  placeholder = "Select an option",
  value,
  onChange,
  onBlur,
  className = "",
  error,
}) => {
  const hasError = typeof error === 'string' ? error : error === true;
  
  // Determine select styles based on state
  let selectClasses = `h-11 w-full appearance-none rounded-lg border px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${className}`;

  if (hasError) {
    selectClasses += ` text-error-800 border-error-500 focus:ring-error-500/10 dark:text-error-400 dark:border-error-500`;
  } else if (value) {
    selectClasses += ` text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800`;
  } else {
    selectClasses += ` text-gray-400 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400`;
  }

  return (
    <div className="relative">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      
      <select
        className={selectClasses}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        name={name}
      >
        {/* Placeholder option */}
        <option
          value=""
          disabled
          className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
        >
          {placeholder}
        </option>
        {/* Map over options */}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
          >
            {option.label}
          </option>
        ))}
      </select>

      {/* Error Message */}
      {typeof error === 'string' && error && (
        <p className="mt-1.5 text-xs text-error-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default Select;
