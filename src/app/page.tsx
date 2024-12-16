'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Layout from './components/Layout';
import { useApp } from './context/AppContext';
import { Card } from './components/ui/Card';

export default function Home() {
  const router = useRouter();
  const { notes, todos, projects, reminders } = useApp();

  const upcomingReminders = reminders
    .filter(r => !r.completed)
    .sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime())
    .slice(0, 3);

  const activeProjects = projects.filter(p => p.status === 'in-progress');
  const urgentTodos = todos.filter(t => !t.completed && t.priority === 'high');
  const recentNotes = notes.slice(-3);

  return (
    <Layout>
      <div className="max-w-xl mx-auto px-4 py-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <h3 className="text-lg font-semibold">Active Projects</h3>
            <p className="text-3xl font-bold mt-2">{activeProjects.length}</p>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <h3 className="text-lg font-semibold">Urgent Todos</h3>
            <p className="text-3xl font-bold mt-2">{urgentTodos.length}</p>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { title: 'New Note', icon: '📝', color: 'bg-blue-100', route: '/notes' },
            { title: 'New Todo', icon: '✓', color: 'bg-purple-100', route: '/todos' },
            { title: 'New Project', icon: '📂', color: 'bg-green-100', route: '/projects' },
            { title: 'Set Reminder', icon: '⏰', color: 'bg-red-100', route: '/reminders' },
          ].map((action) => (
            <motion.button
              key={action.title}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push(action.route)}
              className={`${action.color} p-4 rounded-2xl flex flex-col items-center justify-center space-y-2`}
            >
              <span className="text-2xl">{action.icon}</span>
              <span className="text-xs font-medium">{action.title}</span>
            </motion.button>
          ))}
        </div>

        {/* Upcoming Reminders */}
        {upcomingReminders.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold mb-3">Upcoming Reminders</h2>
            <div className="space-y-3">
              {upcomingReminders.map(reminder => (
                <Card key={reminder.id} className="p-4 bg-red-50 dark:bg-red-900/20">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{reminder.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {new Date(reminder.datetime).toLocaleString()}
                      </p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-red-100 dark:bg-red-900 rounded-full">
                      {reminder.priority}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Active Projects Preview */}
        {activeProjects.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold mb-3">Active Projects</h2>
            <div className="space-y-3">
              {activeProjects.map(project => (
                <Card 
                  key={project.id} 
                  className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => router.push(`/projects/${project.id}`)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{project.title}</h3>
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded-full">
                          {project.notes.length} Notes
                        </span>
                        <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900 rounded-full">
                          {project.todos.length} Todos
                        </span>
                      </div>
                    </div>
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: project.color }}
                    ></div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
