import React, { FC } from "react";

interface InputFieldProps {
  label?: string;
  type?: "text" | "number" | "email" | "password" | "date" | "time" | "tel" | string;
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  min?: string;
  max?: string;
  step?: number;
  disabled?: boolean;
  success?: boolean;
  error?: string | boolean;
  hint?: string; // Optional hint text
}

const InputField: FC<InputFieldProps> = ({
  label,
  type = "text",
  id,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  className = "",
  min,
  max,
  step,
  disabled = false,
  success = false,
  error,
  hint,
}) => {
  const hasError = typeof error === 'string' ? error : error === true;
  
  // Determine input styles based on state (disabled, success, error)
  let inputClasses = `h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${className}`;

  // Add styles for the different states
  if (disabled) {
    inputClasses += ` text-gray-500 border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`;
  } else if (hasError) {
    inputClasses += ` text-error-800 border-error-500 focus:border-error-500 focus:ring-3 focus:ring-error-500/10  dark:text-error-400 dark:border-error-500 dark:focus:border-error-500`;
  } else if (success) {
    inputClasses += ` text-success-500 border-success-400 focus:ring-success-500/10 focus:border-success-300  dark:text-success-400 dark:border-success-500`;
  } else {
    inputClasses += ` bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800`;
  }

  return (
    <div className="relative">
      {label && (
        <label htmlFor={id || name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      
      <input
        type={type}
        id={id || name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={inputClasses}
      />

      {/* Error Message */}
      {typeof error === 'string' && error && (
        <p className="mt-1.5 text-xs text-error-500 absolute bottom-[-16px]">
          {error}
        </p>
      )}

      {/* Optional Hint Text */}
      {hint && !hasError && (
        <p className="mt-1.5 text-xs text-gray-500">
          {hint}
        </p>
      )}
    </div>
  );
};

export default InputField;
