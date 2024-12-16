export interface Note {
  id: number;
  title: string;
  content: string;
  category: 'personal' | 'work' | 'ideas';
  date: Date;
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  dueDate?: Date;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  status: 'not-started' | 'in-progress' | 'completed';
  date: Date;
}

export interface Reminder {
  id: number;
  title: string;
  datetime: string;
  description: string;
  completed: boolean;
} 