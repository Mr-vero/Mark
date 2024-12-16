'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  HomeIcon, 
  DocumentTextIcon,
  ClipboardListIcon,
  BellIcon,
  FolderIcon,
  ChevronLeftIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/react/outline';
import { useApp } from '../context/AppContext';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useApp();

  const navItems = [
    { href: '/', icon: HomeIcon, label: 'Home' },
    { href: '/notes', icon: DocumentTextIcon, label: 'Notes' },
    { href: '/projects', icon: FolderIcon, label: 'Projects' },
    { href: '/todos', icon: ClipboardListIcon, label: 'Todos' },
    { href: '/reminders', icon: BellIcon, label: 'Reminders' },
  ];

  const currentPage = navItems.find(item => item.href === pathname)?.label || 'Home';
  const isHomePage = pathname === '/';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-20">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-3">
            {!isHomePage && (
              <button 
                onClick={() => router.back()}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ChevronLeftIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              </button>
            )}
            <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
              {currentPage}
            </h1>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {theme === 'light' ? (
              <MoonIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            ) : (
              <SunIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-20">
        <div className="flex justify-around items-center h-16">
          {navItems.map(({ href, icon: Icon, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center justify-center w-full h-full
                  ${isActive 
                    ? 'text-blue-500 dark:text-blue-400' 
                    : 'text-gray-500 dark:text-gray-400'
                  }`}
              >
                <Icon className="h-6 w-6" />
                <span className="text-xs mt-1">{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
} 