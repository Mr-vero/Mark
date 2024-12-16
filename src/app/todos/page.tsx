'use client';

import { useState } from 'react';
import Layout from '../components/Layout';
import { useApp } from '../context/AppContext';
import { Todo } from '../types';

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

  return (
    <Layout>
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-6">Todos</h1>
        
        <div className="mb-6 space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              className="flex-1 p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
              placeholder="New todo..."
              value={newTodo.title}
              onChange={(e) => setNewTodo({...newTodo, title: e.target.value})}
            />
            <select
              className="w-32 p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
              value={newTodo.priority}
              onChange={(e) => setNewTodo({...newTodo, priority: e.target.value as Todo['priority']})}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <button
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={addTodo}
          >
            Add Todo
          </button>
        </div>

        <div className="space-y-2">
          {todos.map(todo => (
            <div
              key={todo.id}
              className={`p-4 bg-white rounded-lg shadow-sm flex items-center gap-4 ${
                todo.completed ? 'opacity-50' : ''
              }`}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="h-5 w-5 rounded border-gray-300"
              />
              <span className={todo.completed ? 'line-through' : ''}>
                {todo.title}
              </span>
              <span className={`ml-auto px-2 py-1 rounded-full text-sm ${
                todo.priority === 'high' ? 'bg-red-100 text-red-800' :
                todo.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {todo.priority}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
} 