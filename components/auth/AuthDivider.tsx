'use client';

import { useTranslations } from 'next-intl';

export default function AuthDivider() {
  const t = useTranslations('auth');

  return (
    <div className="relative py-3 sm:py-5">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="p-2 text-gray-400 bg-white dark:bg-gray-900 sm:px-5 sm:py-2">
          {t('or')}
        </span>
      </div>
    </div>
  );
}
