'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Layout from '../components/Layout';
import { Card } from '../components/ui/Card';
import { EditProjectModal } from '../components/EditProjectModal';
import { useApp } from '../context/AppContext';
import { Project } from '../types';

const projectColors = [
  'from-blue-500 via-blue-600 to-blue-700',
  'from-purple-500 via-purple-600 to-purple-700',
  'from-emerald-500 via-emerald-600 to-emerald-700',
  'from-amber-500 via-amber-600 to-amber-700',
  'from-pink-500 via-pink-600 to-pink-700',
  'from-indigo-500 via-indigo-600 to-indigo-700',
];

export default function Projects() {
  const router = useRouter();
  const { projects, setProjects } = useApp();
  const [isCreating, setIsCreating] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
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
        date: new Date(),
        color: `bg-gradient-to-br ${projectColors[Math.floor(Math.random() * projectColors.length)]}`,
        notes: [],
        todos: []
      };
      setProjects([...projects, project]);
      setNewProject({ title: '', description: '', status: 'not-started' });
      setIsCreating(false);
    }
  };

  const handleEditProject = (updatedProject: Project) => {
    setProjects(projects.map(p => 
      p.id === updatedProject.id ? updatedProject : p
    ));
    setEditingProject(null);
  };

  const handleDeleteProject = (id: number) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
            >
              Projects
            </motion.h1>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsCreating(true)}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl text-sm font-medium shadow-lg hover:shadow-xl transition-shadow"
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
                className="mb-8"
              >
                <Card className="p-6 space-y-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                  <input
                    type="text"
                    placeholder="Project title"
                    value={newProject.title}
                    onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                    className="w-full p-3 rounded-xl bg-white dark:bg-gray-700 border-none focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    placeholder="Project description"
                    value={newProject.description}
                    onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                    className="w-full p-3 rounded-xl bg-white dark:bg-gray-700 border-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                  <select
                    value={newProject.status}
                    onChange={(e) => setNewProject({...newProject, status: e.target.value as Project['status']})}
                    className="w-full p-3 rounded-xl bg-white dark:bg-gray-700 border-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="not-started">Not Started</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={addProject}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl"
                    >
                      Create Project
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
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
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="group relative"
              >
                <Card className="h-full overflow-hidden">
                  <div 
                    className="relative z-10 p-6 cursor-pointer"
                    onClick={() => router.push(`/projects/${project.id}`)}
                  >
                    <div className={`absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity ${project.color}`} />
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {project.description}
                    </p>
                    <div className="flex gap-2 mb-4">
                      <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded-full">
                        {project.notes.length} Notes
                      </span>
                      <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900 rounded-full">
                        {project.todos.length} Todos
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        {new Date(project.date).toLocaleDateString()}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        project.status === 'completed' 
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                          : project.status === 'in-progress'
                          ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                  {/* Edit and Delete buttons */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 z-20">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingProject(project);
                      }}
                      className="p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-shadow"
                    >
                      ✏️
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm('Are you sure you want to delete this project?')) {
                          setProjects(projects.filter(p => p.id !== project.id));
                        }
                      }}
                      className="p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-shadow"
                    >
                      🗑️
                    </motion.button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Edit Project Modal */}
      <AnimatePresence>
        {editingProject && (
          <EditProjectModal
            project={editingProject}
            onSave={handleEditProject}
            onCancel={() => setEditingProject(null)}
          />
        )}
      </AnimatePresence>
    </Layout>
  );
}