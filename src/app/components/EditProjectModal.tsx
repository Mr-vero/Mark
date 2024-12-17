'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { Card } from './ui/Card';

interface EditProjectModalProps {
  project: Project;
  onSave: (updatedProject: Project) => void;
  onCancel: () => void;
}

export function EditProjectModal({ project, onSave, onCancel }: EditProjectModalProps) {
  const [editedProject, setEditedProject] = useState({ ...project });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <Card className="w-full max-w-md p-6 space-y-4">
        <h2 className="text-xl font-bold">Edit Project</h2>
        <input
          type="text"
          value={editedProject.title}
          onChange={(e) => setEditedProject({ ...editedProject, title: e.target.value })}
          className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500"
          placeholder="Project title"
        />
        <textarea
          value={editedProject.description}
          onChange={(e) => setEditedProject({ ...editedProject, description: e.target.value })}
          className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500"
          placeholder="Project description"
          rows={3}
        />
        <select
          value={editedProject.status}
          onChange={(e) => setEditedProject({ ...editedProject, status: e.target.value as Project['status'] })}
          className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="not-started">Not Started</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <div className="flex gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onSave(editedProject)}
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