'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import { Card } from '../components/ui/Card';
import { useApp } from '../context/AppContext';
import { Note } from '../types';
import { slideUp, staggerChildren } from '../utils/animations';

export default function Notes() {
  const { notes, setNotes } = useApp();
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    category: 'personal' as const
  });

  const addNote = () => {
    if (newNote.title.trim() && newNote.content.trim()) {
      const note: Note = {
        id: Date.now(),
        ...newNote,
        date: new Date()
      };
      setNotes([...notes, note]);
      setNewNote({ title: '', content: '', category: 'personal' });
    }
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'personal': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'work': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'ideas': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
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
          {/* Add Note Form */}
          <Card className="p-4">
            <motion.div variants={slideUp} className="space-y-4">
              <input
                type="text"
                placeholder="Note title..."
                value={newNote.title}
                onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Write your note..."
                value={newNote.content}
                onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                rows={4}
                className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={newNote.category}
                onChange={(e) => setNewNote({...newNote, category: e.target.value as Note['category']})}
                className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="personal">Personal</option>
                <option value="work">Work</option>
                <option value="ideas">Ideas</option>
              </select>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={addNote}
                className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add Note
              </motion.button>
            </motion.div>
          </Card>

          {/* Notes List */}
          <motion.div 
            variants={staggerChildren}
            className="grid gap-4 sm:grid-cols-2"
          >
            <AnimatePresence>
              {notes.map(note => (
                <motion.div
                  key={note.id}
                  variants={slideUp}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Card className="p-4 h-full">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg">{note.title}</h3>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => deleteNote(note.id)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                      >
                        <span className="text-red-500 hover:text-red-600">×</span>
                      </motion.button>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
                      {note.content}
                    </p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(note.date).toLocaleDateString()}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(note.category)}`}>
                        {note.category}
                      </span>
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