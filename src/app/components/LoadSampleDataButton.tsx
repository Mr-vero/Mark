import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { sampleData } from '../utils/sampleData';

export function LoadSampleDataButton() {
  const { setNotes, setTodos, setProjects, setReminders } = useApp();

  const handleLoadSampleData = () => {
    if (window.confirm('This will replace any existing data with sample data. Are you sure?')) {
      setNotes(sampleData.notes);
      setTodos(sampleData.todos);
      setProjects(sampleData.projects);
      setReminders(sampleData.reminders);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleLoadSampleData}
      className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl 
                 text-sm font-medium shadow-lg hover:shadow-xl transition-shadow"
    >
      Load Sample Data
    </motion.button>
  );
} 