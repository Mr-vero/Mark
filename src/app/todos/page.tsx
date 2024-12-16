'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import { Card } from '../components/ui/Card';
import { EditTodoModal } from '../components/EditTodoModal';
import { useApp } from '../context/AppContext';
import { Todo } from '../types';
import { slideUp, staggerChildren } from '../utils/animations';

const priorities = [
  { value: 'high', label: 'High Priority', color: 'bg-red-500' },
  { value: 'medium', label: 'Medium Priority', color: 'bg-yellow-500' },
  { value: 'low', label: 'Low Priority', color: 'bg-green-500' }
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
      if (a.priority !== b.priority) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      return 0;
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

  const handleEditTodo = (updatedTodo: Todo) => {
    setTodos(todos.map(todo => 
      todo.id === updatedTodo.id ? updatedTodo : todo
    ));
    setEditingTodo(null);
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      setTodos(todos.filter(todo => todo.id !== id));
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
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Todos</h1>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCreating(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm"
            >
              + New Todo
            </motion.button>
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex gap-2">
              {['all', 'active', 'completed'].map(filterType => (
                <motion.button
                  key={filterType}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter(filterType as typeof filter)}
                  className={`px-4 py-2 rounded-full text-sm capitalize
                    ${filter === filterType 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 dark:bg-gray-800'
                    }`}
                >
                  {filterType}
                </motion.button>
              ))}
            </div>
            <div className="flex gap-2">
              {priorities.map(priority => (
                <motion.button
                  key={priority.value}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedPriority(priority.value)}
                  className={`px-4 py-2 rounded-full text-sm
                    ${selectedPriority === priority.value 
                      ? `${priority.color} text-white` 
                      : 'bg-gray-100 dark:bg-gray-800'
                    }`}
                >
                  {priority.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Create Todo Form */}
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
                    placeholder="What needs to be done?"
                    value={newTodo.title}
                    onChange={(e) => setNewTodo({...newTodo, title: e.target.value})}
                    className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex gap-4">
                    <select
                      value={newTodo.priority}
                      onChange={(e) => setNewTodo({...newTodo, priority: e.target.value as Todo['priority']})}
                      className="flex-1 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500"
                    >
                      {priorities.map(priority => (
                        <option key={priority.value} value={priority.value}>
                          {priority.label}
                        </option>
                      ))}
                    </select>
                    <input
                      type="date"
                      value={newTodo.dueDate}
                      onChange={(e) => setNewTodo({...newTodo, dueDate: e.target.value})}
                      className="flex-1 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={addTodo}
                      className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-xl"
                    >
                      Add Todo
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

          {/* Todos List */}
          <motion.div variants={staggerChildren} className="space-y-3">
            {filteredTodos.map(todo => (
              <motion.div
                key={todo.id}
                variants={slideUp}
                layout
                className="relative group"
              >
                <Card className="p-4">
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
                      <span className={`px-2 py-1 rounded-full text-xs
                        ${todo.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                          todo.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                          'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'}`}
                      >
                        {todo.priority}
                      </span>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setEditingTodo(todo)}
                        className="p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ✏️
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => deleteTodo(todo.id)}
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
        </motion.div>
      </div>

      {/* Edit Todo Modal */}
      <AnimatePresence>
        {editingTodo && (
          <EditTodoModal
            todo={editingTodo}
            onSave={handleEditTodo}
            onCancel={() => setEditingTodo(null)}
          />
        )}
      </AnimatePresence>
    </Layout>
  );
} 