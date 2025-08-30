'use client';

import { ChevronLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface BackButtonProps {
  href?: string;
  text?: string;
  className?: string;
}

export default function BackButton({ 
  href = "/", 
  text,
  className = "w-full max-w-md sm:py-5 mx-auto"
}: BackButtonProps) {
  const t = useTranslations('auth');
  
  const displayText = text || t('backToDashboard');

  return (
    <div className={className}>
      <Link
        href={href}
        className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
      >
        <ChevronLeftIcon />
        {displayText}
      </Link>
    </div>
  );
}
