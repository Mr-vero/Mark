'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Layout from '../components/Layout';
import { Card } from '../components/ui/Card';
import { useApp } from '../context/AppContext';
import { Project } from '../types';
import { slideUp, staggerChildren } from '../utils/animations';

const projectColors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
  '#FFEEAD', '#D4A5A5', '#9B5DE5', '#00BBF9'
];

export default function Projects() {
  const router = useRouter();
  const { projects, setProjects } = useApp();
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    status: 'not-started' as const
  });
  const [isCreating, setIsCreating] = useState(false);

  const addProject = () => {
    if (newProject.title.trim()) {
      const project: Project = {
        id: Date.now(),
        ...newProject,
        date: new Date(),
        color: projectColors[Math.floor(Math.random() * projectColors.length)],
        notes: [],
        todos: []
      };
      setProjects([...projects, project]);
      setNewProject({ title: '', description: '', status: 'not-started' });
      setIsCreating(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto px-4 py-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="space-y-6"
        >
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Projects</h1>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCreating(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm"
            >
              + New Project
            </motion.button>
          </div>

          {/* Create Project Form */}
          <AnimatePresence>
            {isCreating && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="p-4 space-y-4">
                  <input
                    type="text"
                    placeholder="Project title..."
                    value={newProject.title}
                    onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                    className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    placeholder="Project description..."
                    value={newProject.description}
                    onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                    rows={3}
                    className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex gap-2">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={addProject}
                      className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-xl"
                    >
                      Create Project
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsCreating(false)}
                      className="px-4 py-3 bg-gray-200 dark:bg-gray-700 rounded-xl"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Projects Grid */}
          <div className="grid grid-cols-2 gap-4">
            {projects.map(project => (
              <motion.div
                key={project.id}
                variants={slideUp}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push(`/projects/${project.id}`)}
              >
                <Card className="p-4 h-full cursor-pointer">
                  <div 
                    className="w-full h-24 rounded-xl mb-3"
                    style={{ 
                      backgroundColor: project.color,
                      opacity: 0.2
                    }}
                  />
                  <h3 className="font-semibold text-lg">{project.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex gap-2 mt-3">
                    <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded-full">
                      {project.notes.length} Notes
                    </span>
                    <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900 rounded-full">
                      {project.todos.length} Todos
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-gray-500">
                      {new Date(project.date).toLocaleDateString()}
                    </span>
                    <span 
                      className={`text-xs px-2 py-1 rounded-full ${
                        project.status === 'completed' 
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                          : project.status === 'in-progress'
                          ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}