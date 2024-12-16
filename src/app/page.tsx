'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Layout from './components/Layout';
import { Card } from './components/ui/Card';
import { useApp } from './context/AppContext';

const features = [
  {
    title: 'Projects',
    description: 'Track and manage projects with teams',
    icon: '💼',
    color: 'bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700',
    link: '/projects',
    count: (context: ReturnType<typeof useApp>) => context.projects.length
  },
  {
    title: 'Notes',
    description: 'Capture and organize your thoughts',
    icon: '✍️',
    color: 'bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700',
    link: '/notes',
    count: (context: ReturnType<typeof useApp>) => context.notes.length
  },
  {
    title: 'Todos',
    description: 'Manage tasks and track progress',
    icon: '✓',
    color: 'bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700',
    link: '/todos',
    count: (context: ReturnType<typeof useApp>) => context.todos.length
  },
  {
    title: 'Reminders',
    description: 'Never miss important deadlines',
    icon: '⏰',
    color: 'bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700',
    link: '/reminders',
    count: (context: ReturnType<typeof useApp>) => context.reminders.length
  }
];

export default function Home() {
  const router = useRouter();
  const context = useApp();

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push(feature.link)}
                className="cursor-pointer"
              >
                <Card className="h-full overflow-hidden relative group">
                  <div className={`absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity ${feature.color}`} />
                  <div className="relative z-10 p-6">
                    <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center text-white text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                      {feature.icon}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold">{feature.title}</h3>
                        <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium">
                          {feature.count(context)}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {feature.description}
                      </p>
                      <div className="flex items-center text-blue-500 dark:text-blue-400 pt-2">
                        <span className="text-sm font-medium">Open {feature.title}</span>
                        <svg 
                          className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12"
          >
            <Card className="p-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {features.map((feature) => (
                  <div 
                    key={feature.title} 
                    className="text-center cursor-pointer"
                    onClick={() => router.push(feature.link)}
                  >
                    <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                      {feature.count(context)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {feature.title}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
