'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Note } from '../types';
import { Card } from './ui/Card';

interface EditNoteModalProps {
  note: Note;
  onSave: (updatedNote: Note) => void;
  onCancel: () => void;
}

export function EditNoteModal({ note, onSave, onCancel }: EditNoteModalProps) {
  const [editedNote, setEditedNote] = useState({ ...note });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <Card className="w-full max-w-md p-6 space-y-4">
        <h2 className="text-xl font-bold">Edit Note</h2>
        <input
          type="text"
          value={editedNote.title}
          onChange={(e) => setEditedNote({ ...editedNote, title: e.target.value })}
          className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500"
          placeholder="Note title"
        />
        <textarea
          value={editedNote.content}
          onChange={(e) => setEditedNote({ ...editedNote, content: e.target.value })}
          className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500"
          placeholder="Note content"
          rows={4}
        />
        <select
          value={editedNote.category}
          onChange={(e) => setEditedNote({ ...editedNote, category: e.target.value as Note['category'] })}
          className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="ideas">Ideas</option>
        </select>
        <div className="flex gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onSave(editedNote)}
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