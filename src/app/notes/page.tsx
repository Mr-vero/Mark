'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import { Card } from '../components/ui/Card';
import { useApp } from '../context/AppContext';
import { Note } from '../types';
import { slideUp, staggerChildren } from '../utils/animations';

const categories = [
  { id: 'all', label: 'All Notes' },
  { id: 'personal', label: 'Personal', color: 'bg-blue-500' },
  { id: 'work', label: 'Work', color: 'bg-purple-500' },
  { id: 'ideas', label: 'Ideas', color: 'bg-green-500' }
] as const;

export default function Notes() {
  const { notes, setNotes } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'personal' | 'work' | 'ideas'>('all');
  const [isCreating, setIsCreating] = useState(false);
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    category: 'personal' as const
  });
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotes = notes
    .filter(note => 
      (selectedCategory === 'all' || note.category === selectedCategory) &&
      (searchQuery === '' || 
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const addNote = () => {
    if (newNote.title.trim()) {
      const note: Note = {
        id: Date.now(),
        ...newNote,
        date: new Date()
      };
      setNotes([...notes, note]);
      setNewNote({ title: '', content: '', category: 'personal' });
      setIsCreating(false);
    }
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
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
            <h1 className="text-2xl font-bold">Notes</h1>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCreating(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm"
            >
              + New Note
            </motion.button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 pl-10 rounded-xl bg-gray-100 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute left-3 top-3 text-gray-400">🔍</span>
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
            {categories.map(category => (
              <motion.button
                key={category.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap
                  ${selectedCategory === category.id
                    ? `${category.color || 'bg-blue-500'} text-white`
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                  }`}
              >
                {category.label}
              </motion.button>
            ))}
          </div>

          {/* Create Note Form */}
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
                    placeholder="Note title..."
                    value={newNote.title}
                    onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                    className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    placeholder="Note content..."
                    value={newNote.content}
                    onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                    rows={4}
                    className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500"
                  />
                  <select
                    value={newNote.category}
                    onChange={(e) => setNewNote({...newNote, category: e.target.value as Note['category']})}
                    className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="personal">Personal</option>
                    <option value="work">Work</option>
                    <option value="ideas">Ideas</option>
                  </select>
                  <div className="flex gap-2">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={addNote}
                      className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-xl"
                    >
                      Save Note
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

          {/* Notes Grid */}
          <motion.div 
            variants={staggerChildren}
            className="grid gap-4"
          >
            <AnimatePresence>
              {filteredNotes.map(note => (
                <motion.div
                  key={note.id}
                  variants={slideUp}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Card className="p-4 relative group">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => deleteNote(note.id)}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-opacity"
                    >
                      <span className="text-red-500">×</span>
                    </motion.button>
                    <h3 className="font-semibold text-lg pr-8">{note.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm line-clamp-3">
                      {note.content}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-xs text-gray-500">
                        {new Date(note.date).toLocaleDateString()}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full
                        ${note.category === 'personal' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                          note.category === 'work' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                          'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'}`}
                      >
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