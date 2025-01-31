import { motion } from 'framer-motion';
import { Users, Clock, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data - replace with API call
const confirmedProjects = [
  {
    id: '1',
    title: 'AI-Powered Learning Assistant',
    description: 'Develop an AI-based learning assistant to help students with their studies.',
    faculty: 'Dr. Smith',
    progress: 60,
    lastUpdate: '2024-03-15',
  },
  {
    id: '2',
    title: 'Smart Campus Navigation',
    description: 'Create a mobile app for efficient campus navigation using indoor positioning.',
    faculty: 'Prof. Johnson',
    progress: 30,
    lastUpdate: '2024-03-14',
  },
];

const ConfirmedProjects = () => {
  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8"
      >
        My Projects
      </motion.h1>

      <div className="space-y-6">
        {confirmedProjects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {project.title}
                </h3>
                <Link
                  to="/feedback"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <MessageSquare className="h-5 w-5" />
                </Link>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {project.description}
              </p>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{project.faculty}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Last update: {project.lastUpdate}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ConfirmedProjects;