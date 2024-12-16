export interface Note {
  id: number;
  title: string;
  content: string;
  category: 'personal' | 'work' | 'ideas';
  projectId?: number;
  date: Date;
  color?: string;
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  dueDate?: Date;
  projectId?: number;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  status: 'not-started' | 'in-progress' | 'completed';
  date: Date;
  color: string;
  notes: number[];
  todos: number[];
}

export interface Reminder {
  id: number;
  title: string;
  datetime: string;
  description: string;
  completed: boolean;
  recurring?: 'daily' | 'weekly' | 'monthly' | 'none';
  priority: 'high' | 'medium' | 'low';
} 