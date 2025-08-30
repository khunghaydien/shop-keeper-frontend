'use client';

import Checkbox from "@/components/form/input/Checkbox";
import { Field, ErrorMessage } from 'formik';
import { useTranslations } from 'next-intl';

interface CheckboxFieldProps {
  name: string;
  label?: string;
  className?: string;
  autoTranslate?: boolean;
  variant?: 'rememberMe' | 'terms' | 'custom';
}

export default function CheckboxField({
  name,
  label,
  className = "",
  autoTranslate = true,
  variant = 'custom'
}: CheckboxFieldProps) {
  const t = useTranslations('auth');

  // Auto-generate label based on variant
  const getDisplayLabel = () => {
    if (label) return label;
    if (!autoTranslate) return '';
    
    switch (variant) {
      case 'rememberMe':
        return t('keepMeLoggedIn');
      case 'terms':
        return t('termsAndConditions');
      default:
        return t(name as any);
    }
  };

  const displayLabel = getDisplayLabel();

  return (
    <div className={`${className} relative pb-6`}>
      <Field name={name}>
        {({ field, form, meta }: any) => (
          <div className="flex items-center gap-3">
            <Checkbox
              checked={field.value}
              onChange={(checked) => form.setFieldValue(name, checked)}
              className={`${variant === 'terms' ? 'w-5 h-5' : ''} ${meta.touched && meta.error ? '!border-red-500 !focus:border-red-500' : ''}`}
            />
            <span className={`block font-normal text-theme-sm dark:text-gray-400 ${meta.touched && meta.error ? 'text-red-500' : 'text-gray-700'}`}>
              {displayLabel}
            </span>
          </div>
        )}
      </Field>
      <ErrorMessage name={name} component="div" className="text-sm text-red-500 absolute top-full" />
    </div>
  );
}
