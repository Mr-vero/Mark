'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import { Card } from '../components/ui/Card';
import { EditTodoModal } from '../components/EditTodoModal';
import { useApp } from '../context/AppContext';
import { Todo } from '../types';

const priorities = [
  { value: 'all', label: 'All', color: 'from-gray-500 to-gray-600' },
  { value: 'high', label: 'High Priority', color: 'from-red-500 to-red-600' },
  { value: 'medium', label: 'Medium Priority', color: 'from-yellow-500 to-yellow-600' },
  { value: 'low', label: 'Low Priority', color: 'from-green-500 to-green-600' }
] as const;

const filters = [
  { value: 'all', label: 'All Tasks' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' }
] as const;

export default function Todos() {
  const { todos, setTodos } = useApp();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [selectedPriority, setSelectedPriority] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [isCreating, setIsCreating] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [newTodo, setNewTodo] = useState({
    title: '',
    priority: 'medium' as const,
    dueDate: ''
  });

  const filteredTodos = todos
    .filter(todo => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    })
    .filter(todo => selectedPriority === 'all' || todo.priority === selectedPriority)
    .sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

  const addTodo = () => {
    if (newTodo.title.trim()) {
      const todo: Todo = {
        id: Date.now(),
        ...newTodo,
        completed: false
      };
      setTodos([...todos, todo]);
      setNewTodo({ title: '', priority: 'medium', dueDate: '' });
      setIsCreating(false);
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
            >
              Todos
            </motion.h1>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsCreating(true)}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              + New Todo
            </motion.button>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-2"
            >
              {filters.map((f) => (
                <motion.button
                  key={f.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter(f.value)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    filter === f.value
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-700'
                  }`}
                >
                  {f.label}
                </motion.button>
              ))}
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-2"
            >
              {priorities.map((priority) => (
                <motion.button
                  key={priority.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedPriority(priority.value)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    selectedPriority === priority.value
                      ? `bg-gradient-to-r ${priority.color} text-white shadow-lg`
                      : 'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-700'
                  }`}
                >
                  {priority.label}
                </motion.button>
              ))}
            </motion.div>
          </div>

          {/* Create Todo Form */}
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
                    placeholder="What needs to be done?"
                    value={newTodo.title}
                    onChange={(e) => setNewTodo({...newTodo, title: e.target.value})}
                    className="w-full p-3 rounded-xl bg-white dark:bg-gray-700 border-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex gap-4">
                    <select
                      value={newTodo.priority}
                      onChange={(e) => setNewTodo({...newTodo, priority: e.target.value as Todo['priority']})}
                      className="flex-1 p-3 rounded-xl bg-white dark:bg-gray-700 border-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="high">High Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="low">Low Priority</option>
                    </select>
                    <input
                      type="date"
                      value={newTodo.dueDate}
                      onChange={(e) => setNewTodo({...newTodo, dueDate: e.target.value})}
                      className="flex-1 p-3 rounded-xl bg-white dark:bg-gray-700 border-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={addTodo}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl"
                    >
                      Create Todo
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

          {/* Todos List */}
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
            className="space-y-4"
          >
            {filteredTodos.map((todo) => (
              <motion.div
                key={todo.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="group relative"
              >
                <Card className="p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4">
                    <motion.div
                      whileTap={{ scale: 1.2 }}
                      className="flex-shrink-0"
                    >
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                        className="h-5 w-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                      />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                        {todo.title}
                      </p>
                      {todo.dueDate && (
                        <p className="text-xs text-gray-500 mt-1">
                          Due: {new Date(todo.dueDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        todo.priority === 'high' 
                          ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                          : todo.priority === 'medium'
                          ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                          : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                      }`}>
                        {todo.priority}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setEditingTodo(todo)}
                        className="p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ✏️
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this todo?')) {
                            setTodos(todos.filter(t => t.id !== todo.id));
                          }
                        }}
                        className="p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        🗑️
                      </motion.button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Edit Todo Modal */}
      <AnimatePresence>
        {editingTodo && (
          <EditTodoModal
            todo={editingTodo}
            onSave={(updatedTodo) => {
              setTodos(todos.map(todo => 
                todo.id === updatedTodo.id ? updatedTodo : todo
              ));
              setEditingTodo(null);
            }}
            onCancel={() => setEditingTodo(null)}
          />
        )}
      </AnimatePresence>
    </Layout>
  );
} 