'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import { Card } from '../components/ui/Card';
import { EditReminderModal } from '../components/EditReminderModal';
import { useApp } from '../context/AppContext';
import { Reminder } from '../types';

const priorities = [
  { value: 'all', label: 'All', color: 'from-gray-500 to-gray-600' },
  { value: 'high', label: 'High', color: 'from-red-500 to-red-600' },
  { value: 'medium', label: 'Medium', color: 'from-yellow-500 to-yellow-600' },
  { value: 'low', label: 'Low', color: 'from-green-500 to-green-600' }
] as const;

const recurringOptions = [
  { value: 'none', label: 'One-time' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' }
] as const;

export default function Reminders() {
  const { reminders, setReminders } = useApp();
  const [isCreating, setIsCreating] = useState(false);
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);
  const [selectedPriority, setSelectedPriority] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [newReminder, setNewReminder] = useState({
    title: '',
    description: '',
    datetime: '',
    priority: 'medium' as const,
    recurring: 'none' as const
  });

  const filteredReminders = reminders
    .filter(reminder => selectedPriority === 'all' || reminder.priority === selectedPriority)
    .sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime());

  const groupedReminders = filteredReminders.reduce((groups, reminder) => {
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

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
            >
              Reminders
            </motion.h1>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsCreating(true)}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              + New Reminder
            </motion.button>
          </div>

          {/* Priority Filter */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-2 mb-8 overflow-x-auto pb-2"
          >
            {priorities.map((priority) => (
              <motion.button
                key={priority.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedPriority(priority.value)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  selectedPriority === priority.value
                    ? `bg-gradient-to-r ${priority.color} text-white shadow-lg`
                    : 'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-700'
                }`}
              >
                {priority.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Create Reminder Form */}
          <AnimatePresence>
            {isCreating && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-8"
              >
                <Card className="p-6 space-y-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                  <input
                    type="text"
                    placeholder="Reminder title"
                    value={newReminder.title}
                    onChange={(e) => setNewReminder({...newReminder, title: e.target.value})}
                    className="w-full p-3 rounded-xl bg-white dark:bg-gray-700 border-none focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    placeholder="Description (optional)"
                    value={newReminder.description}
                    onChange={(e) => setNewReminder({...newReminder, description: e.target.value})}
                    className="w-full p-3 rounded-xl bg-white dark:bg-gray-700 border-none focus:ring-2 focus:ring-blue-500"
                    rows={2}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <input
                      type="datetime-local"
                      value={newReminder.datetime}
                      onChange={(e) => setNewReminder({...newReminder, datetime: e.target.value})}
                      className="p-3 rounded-xl bg-white dark:bg-gray-700 border-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                      value={newReminder.priority}
                      onChange={(e) => setNewReminder({...newReminder, priority: e.target.value as Reminder['priority']})}
                      className="p-3 rounded-xl bg-white dark:bg-gray-700 border-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="high">High Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="low">Low Priority</option>
                    </select>
                    <select
                      value={newReminder.recurring}
                      onChange={(e) => setNewReminder({...newReminder, recurring: e.target.value as Reminder['recurring']})}
                      className="p-3 rounded-xl bg-white dark:bg-gray-700 border-none focus:ring-2 focus:ring-blue-500"
                    >
                      {recurringOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={addReminder}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl"
                    >
                      Create Reminder
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
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
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05
                }
              }
            }}
            className="space-y-8"
          >
            {sortedDates.map((date) => (
              <div key={date}>
                <h2 className="text-lg font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                  {new Date(date).toLocaleDateString(undefined, { 
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </h2>
                <div className="space-y-4">
                  {groupedReminders[date].map((reminder) => (
                    <motion.div
                      key={reminder.id}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      className="group relative"
                    >
                      <Card className="p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
                        <div className="flex items-start gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium">{reminder.title}</h3>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                reminder.priority === 'high' 
                                  ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                                  : reminder.priority === 'medium'
                                  ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                                  : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                              }`}>
                                {reminder.priority}
                              </span>
                              {reminder.recurring !== 'none' && (
                                <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                                  {reminder.recurring}
                                </span>
                              )}
                            </div>
                            {reminder.description && (
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                {reminder.description}
                              </p>
                            )}
                            <p className="text-xs text-gray-500">
                              {new Date(reminder.datetime).toLocaleTimeString([], { 
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setEditingReminder(reminder)}
                              className="p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              ✏️
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => {
                                if (window.confirm('Are you sure you want to delete this reminder?')) {
                                  setReminders(reminders.filter(r => r.id !== reminder.id));
                                }
                              }}
                              className="p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              🗑️
                            </motion.button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Edit Reminder Modal */}
      <AnimatePresence>
        {editingReminder && (
          <EditReminderModal
            reminder={editingReminder}
            onSave={(updatedReminder) => {
              setReminders(reminders.map(reminder => 
                reminder.id === updatedReminder.id ? updatedReminder : reminder
              ));
              setEditingReminder(null);
            }}
            onCancel={() => setEditingReminder(null)}
          />
        )}
      </AnimatePresence>
    </Layout>
  );
} 