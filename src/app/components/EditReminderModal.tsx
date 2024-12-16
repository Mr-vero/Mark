'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Reminder } from '../types';
import { Card } from './ui/Card';

interface EditReminderModalProps {
  reminder: Reminder;
  onSave: (updatedReminder: Reminder) => void;
  onCancel: () => void;
}

export function EditReminderModal({ reminder, onSave, onCancel }: EditReminderModalProps) {
  const [editedReminder, setEditedReminder] = useState({ ...reminder });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <Card className="w-full max-w-md p-6 space-y-4">
        <h2 className="text-xl font-bold">Edit Reminder</h2>
        <input
          type="text"
          value={editedReminder.title}
          onChange={(e) => setEditedReminder({ ...editedReminder, title: e.target.value })}
          className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500"
          placeholder="Reminder title"
        />
        <textarea
          value={editedReminder.description}
          onChange={(e) => setEditedReminder({ ...editedReminder, description: e.target.value })}
          className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500"
          placeholder="Description (optional)"
          rows={2}
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="datetime-local"
            value={editedReminder.datetime}
            onChange={(e) => setEditedReminder({ ...editedReminder, datetime: e.target.value })}
            className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={editedReminder.recurring}
            onChange={(e) => setEditedReminder({ ...editedReminder, recurring: e.target.value as Reminder['recurring'] })}
            className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="none">No Repeat</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <select
          value={editedReminder.priority}
          onChange={(e) => setEditedReminder({ ...editedReminder, priority: e.target.value as Reminder['priority'] })}
          className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
        <div className="flex gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onSave(editedReminder)}
            className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-xl"
          >
            Save Changes
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onCancel}
            className="px-4 py-3 bg-gray-200 dark:bg-gray-700 rounded-xl"
          >
            Cancel
          </motion.button>
        </div>
      </Card>
    </motion.div>
  );
} 