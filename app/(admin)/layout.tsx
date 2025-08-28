"use client";

import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  const maxWidth = isExpanded || isHovered ? "lg:max-w-[calc(100%-290px)]" : "lg:max-w-[calc(100%-90px)]";

  return (
    <div className="min-h-screen xl:flex relative">
      <AppSidebar />
      <Backdrop />
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin} ${maxWidth}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto w-full md:p-6">
          <div className="max-w-full overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
