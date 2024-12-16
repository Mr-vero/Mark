'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import { Card } from '../components/ui/Card';
import { useApp } from '../context/AppContext';
import { Project } from '../types';
import { slideUp, staggerChildren } from '../utils/animations';

export default function Projects() {
  const { projects, setProjects } = useApp();
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    status: 'not-started' as const
  });

  const addProject = () => {
    if (newProject.title.trim()) {
      const project: Project = {
        id: Date.now(),
        ...newProject,
        date: new Date()
      };
      setProjects([...projects, project]);
      setNewProject({ title: '', description: '', status: 'not-started' });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const updateProjectStatus = (id: number, status: Project['status']) => {
    setProjects(projects.map(project =>
      project.id === id ? { ...project, status } : project
    ));
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
          <Card className="p-4">
            <motion.div variants={slideUp} className="space-y-4">
              <input
                type="text"
                placeholder="Project title..."
                value={newProject.title}
                onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Project description..."
                value={newProject.description}
                onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                rows={3}
                className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={newProject.status}
                onChange={(e) => setNewProject({...newProject, status: e.target.value as Project['status']})}
                className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="not-started">Not Started</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={addProject}
                className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add Project
              </motion.button>
            </motion.div>
          </Card>

          <motion.div variants={staggerChildren} className="space-y-4">
            <AnimatePresence>
              {projects.map(project => (
                <motion.div
                  key={project.id}
                  variants={slideUp}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Card className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-lg">{project.title}</h3>
                        <select
                          value={project.status}
                          onChange={(e) => updateProjectStatus(project.id, e.target.value as Project['status'])}
                          className={`px-2 py-1 rounded-full text-xs ${getStatusColor(project.status)}`}
                        >
                          <option value="not-started">Not Started</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {project.description}
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                        <span>Created: {new Date(project.date).toLocaleDateString()}</span>
                        <motion.div
                          className="h-2 w-2 rounded-full"
                          animate={{
                            backgroundColor: project.status === 'completed' ? '#22c55e' : 
                                          project.status === 'in-progress' ? '#eab308' : '#94a3b8'
                          }}
                        />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
}