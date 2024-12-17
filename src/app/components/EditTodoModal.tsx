'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Todo } from '../types';
import { Card } from './ui/Card';

interface EditTodoModalProps {
  todo: Todo;
  onSave: (updatedTodo: Todo) => void;
  onCancel: () => void;
}

export function EditTodoModal({ todo, onSave, onCancel }: EditTodoModalProps) {
  const [editedTodo, setEditedTodo] = useState({ ...todo });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <Card className="w-full max-w-md p-6 space-y-4">
        <h2 className="text-xl font-bold">Edit Todo</h2>
        <input
          type="text"
          value={editedTodo.title}
          onChange={(e) => setEditedTodo({ ...editedTodo, title: e.target.value })}
          className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500"
          placeholder="Todo title"
        />
        <div className="flex gap-4">
          <select
            value={editedTodo.priority}
            onChange={(e) => setEditedTodo({ ...editedTodo, priority: e.target.value as Todo['priority'] })}
            className="flex-1 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
          <input
            type="date"
            value={editedTodo.dueDate instanceof Date ? editedTodo.dueDate.toISOString().split('T')[0] : editedTodo.dueDate || ''}
            onChange={(e) => setEditedTodo({ ...editedTodo, dueDate: new Date(e.target.value) })}
            className="flex-1 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onSave(editedTodo)}
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