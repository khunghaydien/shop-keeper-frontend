'use client';

import BackButton from './BackButton';

interface AuthHeaderProps {
  title: string;
  description: string;
  showBackButton?: boolean;
  backHref?: string;
}

export default function AuthHeader({ 
  title, 
  description, 
  showBackButton = true, 
  backHref = "/" 
}: AuthHeaderProps) {
  return (
    <>
      {showBackButton && <BackButton href={backHref} />}
      <div className="w-full max-w-md mx-auto">
        <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md text-center">
          {title}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          {description}
        </p>
      </div>
    </>
  );
}
