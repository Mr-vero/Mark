'use client';

import { useState } from 'react';
import Layout from '../components/Layout';

interface Reminder {
  id: number;
  title: string;
  datetime: string;
  description: string;
  completed: boolean;
}

export default function Reminders() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [newReminder, setNewReminder] = useState({
    title: '',
    datetime: '',
    description: ''
  });

  const addReminder = () => {
    if (newReminder.title.trim() && newReminder.datetime) {
      setReminders([...reminders, {
        id: Date.now(),
        ...newReminder,
        completed: false
      }]);
      setNewReminder({ title: '', datetime: '', description: '' });
    }
  };

  const toggleReminder = (id: number) => {
    setReminders(reminders.map(reminder =>
      reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder
    ));
  };

  return (
    <Layout>
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-6">Reminders</h1>
        
        <div className="mb-6 space-y-4">
          <input
            type="text"
            className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
            placeholder="Reminder title..."
            value={newReminder.title}
            onChange={(e) => setNewReminder({...newReminder, title: e.target.value})}
          />
          <input
            type="datetime-local"
            className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
            value={newReminder.datetime}
            onChange={(e) => setNewReminder({...newReminder, datetime: e.target.value})}
          />
          <textarea
            className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
            placeholder="Description..."
            value={newReminder.description}
            onChange={(e) => setNewReminder({...newReminder, description: e.target.value})}
          />
          <button
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={addReminder}
          >
            Add Reminder
          </button>
        </div>

        <div className="space-y-4">
          {reminders.map(reminder => (
            <div
              key={reminder.id}
              className={`p-4 bg-white rounded-lg shadow-md ${
                reminder.completed ? 'opacity-50' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={reminder.completed}
                  onChange={() => toggleReminder(reminder.id)}
                  className="h-5 w-5 rounded border-gray-300"
                />
                <div className="flex-1">
                  <h3 className={`font-semibold ${reminder.completed ? 'line-through' : ''}`}>
                    {reminder.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{reminder.description}</p>
                  <p className="text-sm text-blue-600 mt-1">
                    {new Date(reminder.datetime).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
} 