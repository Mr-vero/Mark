'use client';

import { useState } from 'react';
import Layout from '../components/Layout';
import { useApp } from '../context/AppContext';
import { Note } from '../types';

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

  return (
    <Layout>
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-6">Notes</h1>
        
        <div className="mb-6 space-y-4">
          <input
            type="text"
            className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
            placeholder="Note title..."
            value={newNote.title}
            onChange={(e) => setNewNote({...newNote, title: e.target.value})}
          />
          <textarea
            className="w-full p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
            placeholder="Write a new note..."
            value={newNote.content}
            onChange={(e) => setNewNote({...newNote, content: e.target.value})}
            rows={4}
          />
          <select
            className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
            value={newNote.category}
            onChange={(e) => setNewNote({...newNote, category: e.target.value as 'personal' | 'work' | 'ideas'})}
          >
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="ideas">Ideas</option>
          </select>
          <button
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={addNote}
          >
            Add Note
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {notes.map(note => (
            <div key={note.id} className="p-4 bg-white rounded-lg shadow-md">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-lg">{note.title}</h3>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
              <p className="text-gray-600 mt-2">{note.content}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {new Date(note.date).toLocaleDateString()}
                </span>
                <span className="px-2 py-1 rounded-full text-sm bg-gray-100">
                  {note.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
} 