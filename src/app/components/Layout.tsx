'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
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
import { useTheme } from './ThemeProvider';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

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
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-20"
      >
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-3">
            {!isHomePage && (
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => router.back()}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ChevronLeftIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              </motion.button>
            )}
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg font-semibold text-gray-800 dark:text-white"
            >
              {currentPage}
            </motion.h1>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={theme}
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 180, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {theme === 'light' ? (
                  <MoonIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                ) : (
                  <SunIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.header>

      <AnimatePresence mode="wait">
        {!isLoading && (
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="pt-16 pb-20"
          >
            {children}
          </motion.main>
        )}
      </AnimatePresence>

      <motion.nav
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-20"
      >
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
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center"
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-xs mt-1">{label}</span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </motion.nav>
    </div>
  );
} 