'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import Layout from '../../components/Layout';
import { Card } from '../../components/ui/Card';
import { useApp } from '../../context/AppContext';
import { Project, Todo, Note } from '../../types';

export default function ProjectDetail() {
  const router = useRouter();
  const params = useParams();
  const { projects, todos, notes, setTodos, setNotes } = useApp();
  const [project, setProject] = useState<Project | null>(null);
  const [newTodo, setNewTodo] = useState('');
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    const projectId = typeof params?.id === 'string' ? parseInt(params.id) : null;
    const foundProject = projectId ? projects.find(p => p.id === projectId) : null;
    
    if (!foundProject) {
      router.push('/projects');
    } else {
      setProject(foundProject);
    }
  }, [params?.id, projects, router]);

  if (!project) return null;

  const projectTodos = todos.filter(todo => project.todos.includes(todo.id));
  const projectNotes = notes.filter(note => project.notes.includes(note.id));

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo: Todo = {
        id: Date.now(),
        title: newTodo,
        completed: false,
        priority: 'medium',
        dueDate: ''
      };
      setTodos([...todos, todo]);
      project.todos.push(todo.id);
      setNewTodo('');
    }
  };

  const addNote = () => {
    if (newNote.trim()) {
      const note: Note = {
        id: Date.now(),
        title: newNote,
        content: '',
        category: 'work',
        date: new Date()
      };
      setNotes([...notes, note]);
      project.notes.push(note.id);
      setNewNote('');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/projects')}
              className="p-2 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
            >
              ←
            </motion.button>
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
            >
              {project.title}
            </motion.h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Project Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <h2 className="text-xl font-semibold mb-4">Details</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                <div className="flex gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    project.status === 'completed' 
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                      : project.status === 'in-progress'
                      ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                  }`}>
                    {project.status}
                  </span>
                  <span className="text-xs text-gray-500">
                    Created: {new Date(project.date).toLocaleDateString()}
                  </span>
                </div>
              </Card>

              {/* Project Todos */}
              <Card className="mt-6 p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <h2 className="text-xl font-semibold mb-4">Tasks</h2>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTodo}
                      onChange={(e) => setNewTodo(e.target.value)}
                      placeholder="Add a new task"
                      className="flex-1 p-2 rounded-xl bg-white dark:bg-gray-700 border-none focus:ring-2 focus:ring-blue-500"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={addTodo}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl"
                    >
                      Add
                    </motion.button>
                  </div>
                  {projectTodos.map(todo => (
                    <div key={todo.id} className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-gray-700">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => {
                          setTodos(todos.map(t => 
                            t.id === todo.id ? { ...t, completed: !t.completed } : t
                          ));
                        }}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <span className={todo.completed ? 'line-through text-gray-400' : ''}>
                        {todo.title}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Project Notes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <h2 className="text-xl font-semibold mb-4">Notes</h2>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Add a new note"
                      className="flex-1 p-2 rounded-xl bg-white dark:bg-gray-700 border-none focus:ring-2 focus:ring-blue-500"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={addNote}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl"
                    >
                      Add
                    </motion.button>
                  </div>
                  {projectNotes.map(note => (
                    <Card key={note.id} className="p-4 bg-white dark:bg-gray-700">
                      <h3 className="font-medium mb-2">{note.title}</h3>
                      {note.content && (
                        <p className="text-sm text-gray-600 dark:text-gray-300">{note.content}</p>
                      )}
                    </Card>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 