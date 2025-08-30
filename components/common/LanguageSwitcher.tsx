'use client';

import { useLocale } from 'next-intl';
import { setUserLocale } from '@/i18n/service';
import { Locale } from '@/i18n/config';

export default function LanguageSwitcher() {
  const locale = useLocale();

  const handleLanguageChange = async (newLocale: Locale) => {
    await setUserLocale(newLocale);
    window.location.reload();
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleLanguageChange('en')}
        className={`px-3 py-1 text-sm rounded-md transition-colors ${
          locale === 'en'
            ? 'bg-brand-500 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => handleLanguageChange('vi')}
        className={`px-3 py-1 text-sm rounded-md transition-colors ${
          locale === 'vi'
            ? 'bg-brand-500 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10'
        }`}
      >
        VI
      </button>
    </div>
  );
}
