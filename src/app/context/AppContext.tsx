'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Note } from '../pages/notes';
import { Todo } from '../pages/todos';
import { Project } from '../pages/projects';
import { Reminder } from '../pages/reminders';

interface AppContextType {
  notes: Note[];
  setNotes: (notes: Note[]) => void;
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  reminders: Reminder[];
  setReminders: (reminders: Reminder[]) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Load data from localStorage
    const loadData = () => {
      const savedNotes = localStorage.getItem('notes');
      const savedTodos = localStorage.getItem('todos');
      const savedProjects = localStorage.getItem('projects');
      const savedReminders = localStorage.getItem('reminders');
      const savedTheme = localStorage.getItem('theme');

      if (savedNotes) setNotes(JSON.parse(savedNotes));
      if (savedTodos) setTodos(JSON.parse(savedTodos));
      if (savedProjects) setProjects(JSON.parse(savedProjects));
      if (savedReminders) setReminders(JSON.parse(savedReminders));
      if (savedTheme) setTheme(savedTheme as 'light' | 'dark');
    };

    loadData();
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('projects', JSON.stringify(projects));
    localStorage.setItem('reminders', JSON.stringify(reminders));
    localStorage.setItem('theme', theme);
  }, [notes, todos, projects, reminders, theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <AppContext.Provider value={{
      notes, setNotes,
      todos, setTodos,
      projects, setProjects,
      reminders, setReminders,
      theme, toggleTheme
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
} 