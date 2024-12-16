'use client';

import { useState } from 'react';
import Layout from '../components/Layout';
import { useApp } from '../context/AppContext';
import { Project } from '../types';

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

  const updateProjectStatus = (id: number, status: Project['status']) => {
    setProjects(projects.map(project =>
      project.id === id ? { ...project, status } : project
    ));
  };

  return (
    <Layout>
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-6">Projects</h1>
        
        <div className="mb-6 space-y-4">
          <input
            type="text"
            className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
            placeholder="Project title..."
            value={newProject.title}
            onChange={(e) => setNewProject({...newProject, title: e.target.value})}
          />
          <textarea
            className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
            placeholder="Project description..."
            value={newProject.description}
            onChange={(e) => setNewProject({...newProject, description: e.target.value})}
          />
          <select
            className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
            value={newProject.status}
            onChange={(e) => setNewProject({...newProject, status: e.target.value as Project['status']})}
          >
            <option value="not-started">Not Started</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <button
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={addProject}
          >
            Add Project
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map(project => (
            <div key={project.id} className="p-4 bg-white rounded-lg shadow-md">
              <h3 className="font-semibold text-lg">{project.title}</h3>
              <p className="text-gray-600 mt-2">{project.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {new Date(project.date).toLocaleDateString()}
                </span>
                <select
                  value={project.status}
                  onChange={(e) => updateProjectStatus(project.id, e.target.value as Project['status'])}
                  className={`px-2 py-1 rounded-full text-sm ${
                    project.status === 'completed' ? 'bg-green-100 text-green-800' :
                    project.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}
                >
                  <option value="not-started">Not Started</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}