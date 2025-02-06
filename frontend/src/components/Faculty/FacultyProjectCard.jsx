import { useState } from 'react';
import { Users, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ProjectDetailsModal from './ProjectDetailsModal';

const FacultyProjectCard = ({ project }) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const openModal = () => setIsDetailsOpen(true);
  const closeModal = () => setIsDetailsOpen(false);

  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {project.title}
            </h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              project.status === 'active' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
            }`}>
              {project.status}
            </span>
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
            {project.description}
          </p>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center text-gray-500 dark:text-gray-400">
              <Users className="w-5 h-5 mr-2" />
              <span>{project.enrolledStudents.length}/{project.maxStudents}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={openModal}
            className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            View Details
            <ChevronRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </motion.div>

      {isDetailsOpen && (
        <ProjectDetailsModal
          project={project}
          isOpen={isDetailsOpen}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default FacultyProjectCard;
