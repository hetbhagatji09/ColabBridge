import { motion } from 'framer-motion';
import { Users, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    faculty: string;
    status: 'open' | 'closed';
    enrolledCount: number;
    maxEnrollment: number;
  };
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {project.title}
          </h3>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              project.status === 'open'
                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
            }`}
          >
            {project.status}
          </span>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>
              {project.enrolledCount}/{project.maxEnrollment} enrolled
            </span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{project.faculty}</span>
          </div>
        </div>

        <Link
          to={`/project/${project.id}`}
          className="mt-4 block w-full text-center py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default ProjectCard;