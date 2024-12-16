'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import { Card } from '../components/ui/Card';
import { useApp } from '../context/AppContext';
import { Todo } from '../types';
import { slideUp, staggerChildren } from '../utils/animations';

export default function Todos() {
  const { todos, setTodos } = useApp();
  const [newTodo, setNewTodo] = useState({
    title: '',
    priority: 'medium' as const
  });

  const addTodo = () => {
    if (newTodo.title.trim()) {
      const todo: Todo = {
        id: Date.now(),
        title: newTodo.title,
        priority: newTodo.priority,
        completed: false
      };
      setTodos([...todos, todo]);
      setNewTodo({ title: '', priority: 'medium' });
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
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
          <Card className="p-4">
            <motion.div variants={slideUp} className="space-y-4">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="New todo..."
                  value={newTodo.title}
                  onChange={(e) => setNewTodo({...newTodo, title: e.target.value})}
                  className="flex-1 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={newTodo.priority}
                  onChange={(e) => setNewTodo({...newTodo, priority: e.target.value as Todo['priority']})}
                  className="w-32 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={addTodo}
                className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add Todo
              </motion.button>
            </motion.div>
          </Card>

          <motion.div variants={staggerChildren} className="space-y-3">
            <AnimatePresence>
              {todos.map(todo => (
                <motion.div
                  key={todo.id}
                  variants={slideUp}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Card className="p-4">
                    <div className="flex items-center gap-4">
                      <motion.input
                        whileTap={{ scale: 1.2 }}
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                        className="h-5 w-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                      />
                      <span className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                        {todo.title}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(todo.priority)}`}>
                        {todo.priority}
                      </span>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => deleteTodo(todo.id)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                      >
                        <span className="text-red-500 hover:text-red-600">×</span>
                      </motion.button>
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