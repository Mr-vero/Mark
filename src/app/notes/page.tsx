'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import { Card } from '../components/ui/Card';
import { EditNoteModal } from '../components/EditNoteModal';
import { useApp } from '../context/AppContext';
import { Note } from '../types';

const categories = [
  { id: 'all', label: 'All Notes', color: 'from-gray-500 to-gray-600' },
  { id: 'personal', label: 'Personal', color: 'from-blue-500 to-blue-600' },
  { id: 'work', label: 'Work', color: 'from-purple-500 to-purple-600' },
  { id: 'ideas', label: 'Ideas', color: 'from-emerald-500 to-emerald-600' }
] as const;

export default function Notes() {
  const { notes, setNotes } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'personal' | 'work' | 'ideas'>('all');
  const [isCreating, setIsCreating] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    category: 'personal' as const
  });

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

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
            >
              Notes
            </motion.h1>
            <div className="flex gap-2">
              <motion.input
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsCreating(true)}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                + New Note
              </motion.button>
            </div>
          </div>

          {/* Categories */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-2 mb-8 overflow-x-auto pb-2"
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                    : 'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-700'
                }`}
              >
                {category.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Create Note Form */}
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
                    placeholder="Note title"
                    value={newNote.title}
                    onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                    className="w-full p-3 rounded-xl bg-white dark:bg-gray-700 border-none focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    placeholder="Note content"
                    value={newNote.content}
                    onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                    className="w-full p-3 rounded-xl bg-white dark:bg-gray-700 border-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                  />
                  <select
                    value={newNote.category}
                    onChange={(e) => setNewNote({...newNote, category: e.target.value as Note['category']})}
                    className="w-full p-3 rounded-xl bg-white dark:bg-gray-700 border-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="personal">Personal</option>
                    <option value="work">Work</option>
                    <option value="ideas">Ideas</option>
                  </select>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={addNote}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl"
                    >
                      Create Note
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

          {/* Notes Grid */}
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredNotes.map((note) => (
              <motion.div
                key={note.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="group relative"
              >
                <Card className="h-full p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">{note.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                      {note.content}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      {new Date(note.date).toLocaleDateString()}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      note.category === 'personal' 
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                        : note.category === 'work'
                        ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
                        : 'bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200'
                    }`}>
                      {note.category}
                    </span>
                  </div>
                  {/* Edit and Delete buttons */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setEditingNote(note)}
                      className="p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg"
                    >
                      ✏️
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this note?')) {
                          setNotes(notes.filter(n => n.id !== note.id));
                        }
                      }}
                      className="p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg"
                    >
                      🗑️
                    </motion.button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Edit Note Modal */}
      <AnimatePresence>
        {editingNote && (
          <EditNoteModal
            note={editingNote}
            onSave={(updatedNote) => {
              setNotes(notes.map(note => 
                note.id === updatedNote.id ? updatedNote : note
              ));
              setEditingNote(null);
            }}
            onCancel={() => setEditingNote(null)}
          />
        )}
      </AnimatePresence>
    </Layout>
  );
} 