import { useNavigate } from 'react-router-dom';
import { Users, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const statusColors = {
  OPEN_FOR_APPLICATIONS: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  IN_PROGRESS: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
  COMPLETED: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
  CANCELLED: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
  ON_HOLD: "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400",
  APPROVED: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
};

// Component
const CompletedProjectCard = ({ project }) => {
  const navigate = useNavigate();

  const viewDetails = () => {
    console.log(project);
    navigate(`/projects/${project.projectId}/report-submission`);
  };

  // Determine status class dynamically
  const statusClass = statusColors[project.status] || "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
    >
      <div className="p-6">
        {/* Project Title & Status */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {project.title}
          </h3>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusClass}`}>
            {project.status.replace(/_/g, " ")}
          </span>
        </div>

        {/* Project Details */}
        <div className="flex justify-between text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center">
            <span className="text-sm">{new Date(project.deadline).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Technology Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies?.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 rounded"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* View Details Button */}
        <button
          onClick={viewDetails}
          className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          View Details
          <ChevronRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </motion.div>
  );
};

export default CompletedProjectCard;
