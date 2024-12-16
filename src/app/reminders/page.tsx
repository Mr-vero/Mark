'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import { Card } from '../components/ui/Card';
import { EditReminderModal } from '../components/EditReminderModal';
import { useApp } from '../context/AppContext';
import { Reminder } from '../types';
import { slideUp, staggerChildren } from '../utils/animations';

const priorities = [
  { value: 'high', label: 'High', color: 'bg-red-500' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-500' },
  { value: 'low', label: 'Low', color: 'bg-green-500' }
] as const;

const recurringOptions = [
  { value: 'none', label: 'No Repeat' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' }
] as const;

export default function Reminders() {
  const { reminders, setReminders } = useApp();
  const [isCreating, setIsCreating] = useState(false);
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);
  const [newReminder, setNewReminder] = useState({
    title: '',
    description: '',
    datetime: '',
    priority: 'medium' as const,
    recurring: 'none' as const
  });

  const groupedReminders = reminders.reduce((groups, reminder) => {
    const date = new Date(reminder.datetime).toLocaleDateString();
    if (!groups[date]) groups[date] = [];
    groups[date].push(reminder);
    return groups;
  }, {} as Record<string, Reminder[]>);

  const sortedDates = Object.keys(groupedReminders).sort((a, b) => 
    new Date(a).getTime() - new Date(b).getTime()
  );

  const addReminder = () => {
    if (newReminder.title.trim() && newReminder.datetime) {
      const reminder: Reminder = {
        id: Date.now(),
        ...newReminder,
        completed: false
      };
      setReminders([...reminders, reminder]);
      setNewReminder({
        title: '',
        description: '',
        datetime: '',
        priority: 'medium',
        recurring: 'none'
      });
      setIsCreating(false);
    }
  };

  const handleEditReminder = (updatedReminder: Reminder) => {
    setReminders(reminders.map(reminder => 
      reminder.id === updatedReminder.id ? updatedReminder : reminder
    ));
    setEditingReminder(null);
  };

  const toggleReminder = (id: number) => {
    setReminders(reminders.map(reminder =>
      reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder
    ));
  };

  const deleteReminder = (id: number) => {
    if (window.confirm('Are you sure you want to delete this reminder?')) {
      setReminders(reminders.filter(reminder => reminder.id !== id));
    }
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
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Reminders</h1>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCreating(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm"
            >
              + New Reminder
            </motion.button>
          </div>

          {/* Create Reminder Form */}
          <AnimatePresence>
            {isCreating && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="p-4 space-y-4">
                  <input
                    type="text"
                    placeholder="Reminder title"
                    value={newReminder.title}
                    onChange={(e) => setNewReminder({...newReminder, title: e.target.value})}
                    className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    placeholder="Description (optional)"
                    value={newReminder.description}
                    onChange={(e) => setNewReminder({...newReminder, description: e.target.value})}
                    className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500"
                    rows={2}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="datetime-local"
                      value={newReminder.datetime}
                      onChange={(e) => setNewReminder({...newReminder, datetime: e.target.value})}
                      className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                      value={newReminder.recurring}
                      onChange={(e) => setNewReminder({...newReminder, recurring: e.target.value as Reminder['recurring']})}
                      className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500"
                    >
                      {recurringOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <select
                    value={newReminder.priority}
                    onChange={(e) => setNewReminder({...newReminder, priority: e.target.value as Reminder['priority']})}
                    className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500"
                  >
                    {priorities.map(priority => (
                      <option key={priority.value} value={priority.value}>
                        {priority.label} Priority
                      </option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={addReminder}
                      className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-xl"
                    >
                      Add Reminder
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsCreating(false)}
                      className="px-4 py-3 bg-gray-200 dark:bg-gray-700 rounded-xl"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reminders List */}
          <motion.div variants={staggerChildren} className="space-y-6">
            {sortedDates.map(date => (
              <div key={date}>
                <h2 className="text-lg font-semibold mb-3">
                  {new Date(date).toLocaleDateString(undefined, { 
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric'
                  })}
                </h2>
                <div className="space-y-3">
                  {groupedReminders[date].map(reminder => (
                    <motion.div
                      key={reminder.id}
                      variants={slideUp}
                      layout
                      className="relative group"
                    >
                      <Card className="p-4">
                        <div className="flex items-start gap-4">
                          <motion.div
                            whileTap={{ scale: 1.2 }}
                            className="flex-shrink-0 mt-1"
                          >
                            <input
                              type="checkbox"
                              checked={reminder.completed}
                              onChange={() => toggleReminder(reminder.id)}
                              className="h-5 w-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                            />
                          </motion.div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h3 className={`font-semibold ${reminder.completed ? 'line-through text-gray-400' : ''}`}>
                                {reminder.title}
                              </h3>
                              <div className="flex gap-2">
                                <motion.button
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => setEditingReminder(reminder)}
                                  className="p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  ✏️
                                </motion.button>
                                <motion.button
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => deleteReminder(reminder.id)}
                                  className="p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  🗑️
                                </motion.button>
                              </div>
                            </div>
                            {reminder.description && (
                              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                                {reminder.description}
                              </p>
                            )}
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs text-gray-500">
                                {new Date(reminder.datetime).toLocaleTimeString([], { 
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                              {reminder.recurring !== 'none' && (
                                <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                                  Repeats {reminder.recurring}
                                </span>
                              )}
                              <span className={`text-xs px-2 py-1 rounded-full
                                ${reminder.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                                  reminder.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                  'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'}`}
                              >
                                {reminder.priority}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Edit Reminder Modal */}
      <AnimatePresence>
        {editingReminder && (
          <EditReminderModal
            reminder={editingReminder}
            onSave={handleEditReminder}
            onCancel={() => setEditingReminder(null)}
          />
        )}
      </AnimatePresence>
    </Layout>
  );
} 