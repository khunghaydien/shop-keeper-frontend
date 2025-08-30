'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface AuthLinkProps {
  type: 'signIn' | 'signUp';
}

export default function AuthLink({ type }: AuthLinkProps) {
  const t = useTranslations('auth');

  if (type === 'signIn') {
    return (
      <div className="mt-5">
        <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
          {t('dontHaveAccount')} {""}
          <Link
            href="/sign-up"
            className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
          >
            {t('signUp')}
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="mt-5">
      <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
        {t('alreadyHaveAccount')}{" "}
        <Link
          href="/sign-in"
          className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
        >
          {t('signIn')}
        </Link>
      </p>
    </div>
  );
}
