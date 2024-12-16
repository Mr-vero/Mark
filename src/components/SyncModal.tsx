'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Card } from './ui/Card';
import { useApp } from '../context/AppContext';
import { generateSyncCode, decodeSyncCode, exportData, importData } from '../utils/sync';
import QRScanner from '../app/components/QRScanner';

export default function SyncModal({ onClose }: { onClose: () => void }) {
  const { todos, projects, notes, reminders, setTodos, setProjects, setNotes, setReminders } = useApp();
  const [syncCode, setSyncCode] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const data = { todos, projects, notes, reminders };
    exportData(data);
  };

  const handleImport = async (file: File) => {
    try {
      const data = await importData(file);
      setTodos(data.todos || []);
      setProjects(data.projects || []);
      setNotes(data.notes || []);
      setReminders(data.reminders || []);
      onClose();
    } catch (error) {
      setError('Failed to import data. Please check your file.');
    }
  };

  const handleGenerateCode = () => {
    const data = { todos, projects, notes, reminders };
    const code = generateSyncCode(data);
    setSyncCode(code);
    setCopied(false);
  };

  const handleImportCode = () => {
    try {
      const data = decodeSyncCode(syncCode);
      setTodos(data.todos || []);
      setProjects(data.projects || []);
      setNotes(data.notes || []);
      setReminders(data.reminders || []);
      onClose();
    } catch (error) {
      setError('Invalid sync code. Please check and try again.');
    }
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleScan = (scannedCode: string) => {
    try {
      const data = decodeSyncCode(scannedCode);
      setTodos(data.todos || []);
      setProjects(data.projects || []);
      setNotes(data.notes || []);
      setReminders(data.reminders || []);
      setShowScanner(false);
      onClose();
    } catch (error) {
      setError('Invalid QR code. Please try again.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <Card className="w-full max-w-md p-6 space-y-6">
        <h2 className="text-2xl font-bold">Sync Data</h2>
        
        <div className="space-y-6">
          {/* File Export/Import */}
          <div>
            <h3 className="font-medium mb-2">Export/Import File</h3>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleExport}
                className="px-4 py-2 bg-blue-500 text-white rounded-xl"
              >
                Export Data
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-purple-500 text-white rounded-xl"
              >
                Import Data
              </motion.button>
              <input
                type="file"
                ref={fileInputRef}
                accept=".json"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleImport(e.target.files[0])}
              />
            </div>
          </div>

          {/* Sync Code */}
          <div>
            <h3 className="font-medium mb-2">Quick Sync</h3>
            <div className="space-y-4">
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGenerateCode}
                  className="px-4 py-2 bg-emerald-500 text-white rounded-xl"
                >
                  Generate Code
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowScanner(true)}
                  className="px-4 py-2 bg-amber-500 text-white rounded-xl"
                >
                  Scan QR Code
                </motion.button>
              </div>

              <textarea
                value={syncCode}
                onChange={(e) => setSyncCode(e.target.value)}
                placeholder="Enter sync code here..."
                className="w-full p-3 rounded-xl bg-white dark:bg-gray-700 border-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />

              {syncCode && (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <QRCodeSVG value={syncCode} size={200} />
                  </div>
                  <CopyToClipboard text={syncCode} onCopy={handleCopy}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl"
                    >
                      {copied ? 'Copied!' : 'Copy Code'}
                    </motion.button>
                  </CopyToClipboard>
                </div>
              )}
            </div>
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClose}
          className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-xl"
        >
          Close
        </motion.button>
      </Card>

      <AnimatePresence>
        {showScanner && (
          <QRScanner
            onScan={handleScan}
            onClose={() => setShowScanner(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
} 