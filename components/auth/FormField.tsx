'use client';

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { Field, ErrorMessage } from 'formik';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface FormFieldProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  autoTranslate?: boolean; // Tự động dịch label từ i18n
  variant?: 'input' | 'password'; // Loại field
}

export default function FormField({
  name,
  label,
  type = "text",
  placeholder,
  required = true,
  className = "",
  autoTranslate = true,
  variant = 'input'
}: FormFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const t = useTranslations('auth');
  const tCommon = useTranslations('common');

  // Tự động lấy label và placeholder từ i18n nếu autoTranslate = true
  const displayLabel = autoTranslate && !label ? t(name as any) : label;
  const displayPlaceholder = autoTranslate && !placeholder ? t(`enter${name.charAt(0).toUpperCase() + name.slice(1)}` as any) : placeholder;

  // Password field with show/hide functionality
  if (variant === 'password') {
    return (
      <div className={`${className} relative mb-6`}>
        {displayLabel && (
          <Label>
            {displayLabel} {required && <span className="text-error-500">{tCommon('required')}</span>}
          </Label>
        )}
        <div className="relative">
          <Field name={name}>
            {({ field, meta }: any) => (
              <Input
                {...field}
                type={showPassword ? "text" : "password"}
                placeholder={displayPlaceholder}
                id={name}
                error={meta.touched && meta.error}
              />
            )}
          </Field>
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
          >
            {showPassword ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-500 dark:text-gray-400"
              >
                <path
                  d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-500 dark:text-gray-400"
              >
                <path
                  d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"
                  fill="currentColor"
                />
              </svg>
            )}
          </span>
        </div>
      </div>
    );
  }

  // Regular input field
  return (
    <div className={`${className} relative mb-6`}>
      {displayLabel && (
        <Label>
          {displayLabel} {required && <span className="text-error-500">{tCommon('required')}</span>}
        </Label>
      )}
      <Field name={name}>
        {({ field, meta }: any) => (
          <Input
            {...field}
            type={type}
            placeholder={displayPlaceholder}
            id={name}
            error={meta.touched && meta.error}
          />
        )}
      </Field>
    </div>
  );
}
