'use client';

import { useSidebar } from '@/context/sidebar';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import { Button } from './button';
import SidebarContent from './SidebarContent';

export default function Sidebar() {
  const { isDesktopExpanded, toggleDesktopSidebar, isMobileOpen, closeMobileSidebar } =
    useSidebar();

  return (
    <>
      {/* Desktop Sidebar - Fixed */}
      <aside
        className={cn(
          'relative hidden lg:flex flex-col bg-white dark:bg-black border-l border-gray-200 dark:border-gray-700 shrink-0 transition-all duration-300 ease-in-out',
          isDesktopExpanded ? 'w-64' : 'w-20',
        )}
      >
        <SidebarContent isExpanded={isDesktopExpanded} />

        <Button
          onClick={toggleDesktopSidebar}
          className='absolute -right-3 top-1/2 -translate-y-1/2 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-full p-1 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-500 transition-all shadow-sm'
        >
          <ChevronLeft
            className={cn(
              'w-4 h-4 transition-transform duration-300',
              !isDesktopExpanded && 'rotate-180',
            )}
          />
        </Button>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 z-40 transition-opacity lg:hidden',
          isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
        onClick={closeMobileSidebar}
      ></div>

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full w-72 sm:w-80 bg-white dark:bg-black z-50 flex flex-col transition-transform duration-300 ease-in-out lg:hidden border-r border-gray-200 dark:border-gray-700 shadow-xl',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <SidebarContent isExpanded={true} onLinkClick={closeMobileSidebar} />
      </aside>
    </>
  );
}
