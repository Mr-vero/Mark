'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pageTransition } from '../utils/animations';
import SyncModal from '../app/components/SyncModal';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [showSync, setShowSync] = useState(false);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          {...pageTransition}
          className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSync(true)}
            className="fixed bottom-4 right-4 p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg"
          >
            🔄
          </motion.button>
          {children}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {showSync && <SyncModal onClose={() => setShowSync(false)} />}
      </AnimatePresence>
    </>
  );
}