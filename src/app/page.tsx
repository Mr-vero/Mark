'use client';

import { useRouter } from 'next/navigation';
import Layout from './components/Layout';
import { useApp } from './context/AppContext';

export default function Home() {
  const router = useRouter();
  const { notes, todos, projects } = useApp();

  const recentNotes = notes.slice(-3);
  const activeProjects = projects.filter(p => p.status === 'in-progress').slice(0, 3);
  const todaysTodos = todos.filter(t => !t.completed).slice(0, 3);

  return (
    <Layout>
      <div className="max-w-xl mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Welcome Section */}
          <div className="bg-blue-500 text-white p-6 rounded-2xl">
            <h1 className="text-2xl font-bold">Welcome Back!</h1>
            <p className="mt-2 opacity-90">Here's your workspace overview</p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => router.push('/notes')}
              className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
            >
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl">📝</span>
              </div>
              <span className="text-sm">New Note</span>
            </button>
            <button
              onClick={() => router.push('/todos')}
              className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
            >
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl">✓</span>
              </div>
              <span className="text-sm">Add Todo</span>
            </button>
            <button
              onClick={() => router.push('/projects')}
              className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
            >
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl">📊</span>
              </div>
              <span className="text-sm">Project</span>
            </button>
          </div>

          {/* Recent Items */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold mb-3">Recent Notes</h2>
              {recentNotes.length > 0 ? (
                <ul className="space-y-2">
                  {recentNotes.map(note => (
                    <li key={note.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      {note.title}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">No recent notes</p>
              )}
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold mb-3">Active Projects</h2>
              {activeProjects.length > 0 ? (
                <ul className="space-y-2">
                  {activeProjects.map(project => (
                    <li key={project.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      {project.title}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">No active projects</p>
              )}
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold mb-3">Today's Tasks</h2>
              {todaysTodos.length > 0 ? (
                <ul className="space-y-2">
                  {todaysTodos.map(todo => (
                    <li key={todo.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      {todo.title}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">No pending tasks</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
