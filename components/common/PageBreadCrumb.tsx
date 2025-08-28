import Link from "next/link";
import React from "react";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbProps {
  pageTitle?: string;
  breadcrumbItems?: BreadcrumbItem[];
}

const PageBreadcrumb: React.FC<BreadcrumbProps> = ({ pageTitle, breadcrumbItems }) => {
  // If breadcrumbItems is provided, use it; otherwise, fall back to simple Home > PageTitle
  const items = breadcrumbItems || [
    { label: 'Home', path: '/' },
    { label: pageTitle || 'Page', path: '#' }
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 hidden lg:flex">
      <nav>
        <ol className="flex items-center gap-1.5">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              )}
              {index === items.length - 1 ? (
                <span className="text-sm text-gray-800 dark:text-white/90">
                  {item.label}
                </span>
              ) : (
                <Link
                  className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  href={item.path}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default PageBreadcrumb;
