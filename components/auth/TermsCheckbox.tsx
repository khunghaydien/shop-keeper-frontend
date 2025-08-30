'use client';

import Checkbox from "@/components/form/input/Checkbox";
import { useTranslations } from 'next-intl';

interface TermsCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function TermsCheckbox({ checked, onChange }: TermsCheckboxProps) {
  const t = useTranslations('auth');

  return (
    <div className="flex items-center gap-3">
      <Checkbox
        className="w-5 h-5"
        checked={checked}
        onChange={onChange}
      />
      <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
        {t('termsAndConditions')}
      </p>
    </div>
  );
}
