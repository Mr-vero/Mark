'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Layout from './components/Layout';
import { Card } from './components/ui/Card';
import { useApp } from './context/AppContext';

export default function Home() {
  const router = useRouter();
  const context = useApp();

  // Get today's date at midnight for comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Get tomorrow's date
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  // Get date 7 days from now
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);

  // Get upcoming reminders
  const upcomingReminders = context.reminders
    .filter(r => new Date(r.datetime) >= today)
    .sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime())
    .slice(0, 5);

  // Get high priority incomplete todos
  const urgentTodos = context.todos
    .filter(t => !t.completed && t.priority === 'high')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5);

  // Get in-progress projects
  const activeProjects = context.projects
    .filter(p => p.status === 'in-progress')
    .slice(0, 3);

  // Get recent notes
  const recentNotes = context.notes
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Overview Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <h3 className="text-lg font-medium mb-2">Active Projects</h3>
              <p className="text-3xl font-bold">
                {context.projects.filter(p => p.status === 'in-progress').length}
              </p>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <h3 className="text-lg font-medium mb-2">Due Today</h3>
              <p className="text-3xl font-bold">
                {context.todos.filter(t => !t.completed && t.dueDate && new Date(t.dueDate) <= tomorrow).length}
              </p>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-red-500 to-red-600 text-white">
              <h3 className="text-lg font-medium mb-2">High Priority</h3>
              <p className="text-3xl font-bold">
                {context.todos.filter(t => !t.completed && t.priority === 'high').length}
              </p>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-amber-500 to-amber-600 text-white">
              <h3 className="text-lg font-medium mb-2">Today's Reminders</h3>
              <p className="text-3xl font-bold">
                {context.reminders.filter(r => new Date(r.datetime) >= today && new Date(r.datetime) < tomorrow).length}
              </p>
            </Card>
          </motion.div>

          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Upcoming Reminders */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Upcoming Reminders</h2>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => router.push('/reminders')}
                      className="text-sm text-blue-500 hover:text-blue-600"
                    >
                      View All →
                    </motion.button>
                  </div>
                  <div className="space-y-4">
                    {upcomingReminders.map(reminder => (
                      <div key={reminder.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-xl">
                        <div>
                          <h3 className="font-medium">{reminder.title}</h3>
                          <p className="text-sm text-gray-500">
                            {new Date(reminder.datetime).toLocaleString()}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          reminder.priority === 'high' 
                            ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                            : 'bg-gray-100 dark:bg-gray-700'
                        }`}>
                          {reminder.priority}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Urgent Todos */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">High Priority Tasks</h2>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => router.push('/todos')}
                      className="text-sm text-blue-500 hover:text-blue-600"
                    >
                      View All →
                    </motion.button>
                  </div>
                  <div className="space-y-4">
                    {urgentTodos.map(todo => (
                      <div key={todo.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-xl">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => {
                              // Update todo completion status
                              const updatedTodos = context.todos.map(t =>
                                t.id === todo.id ? { ...t, completed: !t.completed } : t
                              );
                              context.setTodos(updatedTodos);
                            }}
                            className="h-4 w-4 rounded border-gray-300"
                          />
                          <div>
                            <h3 className="font-medium">{todo.title}</h3>
                            {todo.dueDate && (
                              <p className="text-sm text-red-500">
                                Due: {new Date(todo.dueDate).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Active Projects */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Active Projects</h2>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => router.push('/projects')}
                      className="text-sm text-blue-500 hover:text-blue-600"
                    >
                      View All →
                    </motion.button>
                  </div>
                  <div className="space-y-4">
                    {activeProjects.map(project => (
                      <div 
                        key={project.id} 
                        className="p-4 bg-white dark:bg-gray-800 rounded-xl cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => router.push(`/projects/${project.id}`)}
                      >
                        <h3 className="font-medium mb-2">{project.title}</h3>
                        <div className="flex gap-2 mb-2">
                          <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded-full">
                            {project.todos.length} Tasks
                          </span>
                          <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900 rounded-full">
                            {project.notes.length} Notes
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                          <div 
                            className="h-full bg-blue-500 rounded-full"
                            style={{ 
                              width: `${(project.todos.filter(id => 
                                context.todos.find(t => t.id === id)?.completed
                              ).length / project.todos.length) * 100}%` 
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Recent Notes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Recent Notes</h2>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => router.push('/notes')}
                      className="text-sm text-blue-500 hover:text-blue-600"
                    >
                      View All →
                    </motion.button>
                  </div>
                  <div className="space-y-4">
                    {recentNotes.map(note => (
                      <div key={note.id} className="p-4 bg-white dark:bg-gray-800 rounded-xl">
                        <h3 className="font-medium mb-2">{note.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                          {note.content}
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            note.category === 'work' 
                              ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
                              : note.category === 'personal'
                              ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                              : 'bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200'
                          }`}>
                            {note.category}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(note.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
