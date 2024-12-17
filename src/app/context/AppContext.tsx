'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Note, Todo, Project, Reminder } from '../types';

type Theme = 'light' | 'dark';

interface AppContextType {
  notes: Note[];
  setNotes: (notes: Note[]) => void;
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  reminders: Reminder[];
  setReminders: (reminders: Reminder[]) => void;
  theme: Theme;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [theme, setTheme] = useState<Theme>('light');

  // Load data from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) setNotes(JSON.parse(savedNotes));

    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) setTodos(JSON.parse(savedTodos));

    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) setProjects(JSON.parse(savedProjects));

    const savedReminders = localStorage.getItem('reminders');
    if (savedReminders) setReminders(JSON.parse(savedReminders));

    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) setTheme(savedTheme);
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <AppContext.Provider value={{
      notes,
      setNotes,
      todos,
      setTodos,
      projects,
      setProjects,
      reminders,
      setReminders,
      theme,
      toggleTheme
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}; 