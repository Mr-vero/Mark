'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import { Card } from '../components/ui/Card';
import { useApp } from '../context/AppContext';
import { Reminder } from '../types';
import { slideUp, staggerChildren } from '../utils/animations';

export default function Reminders() {
  const { reminders, setReminders } = useApp();
  const [newReminder, setNewReminder] = useState({
    title: '',
    datetime: '',
    description: ''
  });

  const addReminder = () => {
    if (newReminder.title.trim() && newReminder.datetime) {
      const reminder: Reminder = {
        id: Date.now(),
        ...newReminder,
        completed: false
      };
      setReminders([...reminders, reminder]);
      setNewReminder({ title: '', datetime: '', description: '' });
    }
  };

  const toggleReminder = (id: number) => {
    setReminders(reminders.map(reminder =>
      reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder
    ));
  };

  const deleteReminder = (id: number) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto px-4 py-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="space-y-6"
        >
          <Card className="p-4">
            <motion.div variants={slideUp} className="space-y-4">
              <input
                type="text"
                placeholder="Reminder title..."
                value={newReminder.title}
                onChange={(e) => setNewReminder({...newReminder, title: e.target.value})}
                className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="datetime-local"
                value={newReminder.datetime}
                onChange={(e) => setNewReminder({...newReminder, datetime: e.target.value})}
                className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Description..."
                value={newReminder.description}
                onChange={(e) => setNewReminder({...newReminder, description: e.target.value})}
                rows={3}
                className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border-none focus:ring-2 focus:ring-blue-500"
              />
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={addReminder}
                className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add Reminder
              </motion.button>
            </motion.div>
          </Card>

          <motion.div variants={staggerChildren} className="space-y-3">
            <AnimatePresence>
              {reminders.map(reminder => (
                <motion.div
                  key={reminder.id}
                  variants={slideUp}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Card className="p-4">
                    <div className="flex items-start gap-4">
                      <motion.input
                        whileTap={{ scale: 1.2 }}
                        type="checkbox"
                        checked={reminder.completed}
                        onChange={() => toggleReminder(reminder.id)}
                        className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className={`font-semibold ${reminder.completed ? 'line-through text-gray-400' : ''}`}>
                            {reminder.title}
                          </h3>
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => deleteReminder(reminder.id)}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                          >
                            <span className="text-red-500 hover:text-red-600">×</span>
                          </motion.button>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                          {reminder.description}
                        </p>
                        <p className="text-blue-500 dark:text-blue-400 text-xs mt-2">
                          {new Date(reminder.datetime).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
} 