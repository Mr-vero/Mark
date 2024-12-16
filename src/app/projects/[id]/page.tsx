'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Layout from '../../components/Layout';
import { Card } from '../../components/ui/Card';
import { useApp } from '../../context/AppContext';
import { Note, Todo } from '../../types';
import { slideUp, staggerChildren } from '../../utils/animations';
import { use } from 'react';

export default function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { projects, notes, todos, setProjects, setNotes, setTodos } = useApp();
  const [activeTab, setActiveTab] = useState<'notes' | 'todos'>('notes');
  const [newItem, setNewItem] = useState({ title: '', content: '' });

  const project = projects.find(p => p.id === parseInt(resolvedParams.id));
  if (!project) return null;

  const projectNotes = notes.filter(note => project.notes.includes(note.id));
  const projectTodos = todos.filter(todo => project.todos.includes(todo.id));

  const addNote = () => {
    if (newItem.title.trim()) {
      const note: Note = {
        id: Date.now(),
        title: newItem.title,
        content: newItem.content,
        category: 'personal',
        projectId: project.id,
        date: new Date()
      };
      setNotes([...notes, note]);
      setProjects(projects.map(p => 
        p.id === project.id 
          ? { ...p, notes: [...p.notes, note.id] }
          : p
      ));
      setNewItem({ title: '', content: '' });
    }
  };

  const addTodo = () => {
    if (newItem.title.trim()) {
      const todo: Todo = {
        id: Date.now(),
        title: newItem.title,
        completed: false,
        priority: 'medium',
        projectId: project.id
      };
      setTodos([...todos, todo]);
      setProjects(projects.map(p => 
        p.id === project.id 
          ? { ...p, todos: [...p.todos, todo.id] }
          : p
      ));
      setNewItem({ title: '', content: '' });
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
          {/* Project Header */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold">{project.title}</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {project.description}
              </p>
            </div>
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: project.color }}
            />
          </div>

          {/* Tabs */}
          <div className="flex rounded-xl bg-gray-100 dark:bg-gray-800 p-1">
            {(['notes', 'todos'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 rounded-xl text-sm font-medium capitalize
                  ${activeTab === tab 
                    ? 'bg-white dark:bg-gray-700 shadow-sm' 
                    : 'text-gray-500 dark:text-gray-400'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'notes' ? (
              <motion.div
                key="notes"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <Card className="p-4">
                  <input
                    type="text"
                    placeholder="Note title..."
                    value={newItem.title}
                    onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                    className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    placeholder="Note content..."
                    value={newItem.content}
                    onChange={(e) => setNewItem({...newItem, content: e.target.value})}
                    rows={3}
                    className="w-full p-3 mt-2 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500"
                  />
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={addNote}
                    className="w-full px-4 py-3 mt-3 bg-blue-500 text-white rounded-xl"
                  >
                    Add Note
                  </motion.button>
                </Card>

                {projectNotes.map(note => (
                  <Card key={note.id} className="p-4">
                    <h3 className="font-semibold">{note.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                      {note.content}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(note.date).toLocaleDateString()}
                    </p>
                  </Card>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="todos"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <Card className="p-4">
                  <input
                    type="text"
                    placeholder="New todo..."
                    value={newItem.title}
                    onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                    className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500"
                  />
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={addTodo}
                    className="w-full px-4 py-3 mt-3 bg-blue-500 text-white rounded-xl"
                  >
                    Add Todo
                  </motion.button>
                </Card>

                {projectTodos.map(todo => (
                  <Card key={todo.id} className="p-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => {
                          setTodos(todos.map(t =>
                            t.id === todo.id ? { ...t, completed: !t.completed } : t
                          ));
                        }}
                        className="h-5 w-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                      />
                      <span className={todo.completed ? 'line-through text-gray-400' : ''}>
                        {todo.title}
                      </span>
                    </div>
                  </Card>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </Layout>
  );
} 