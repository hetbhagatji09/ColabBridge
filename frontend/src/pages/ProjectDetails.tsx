import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Clock, Send } from 'lucide-react';
import toast from 'react-hot-toast';

// Mock data - replace with API call
const mockProject = {
  id: '1',
  title: 'AI-Powered Learning Assistant',
  description: 'Develop an AI-based learning assistant to help students with their studies. The project aims to create an intelligent tutoring system that adapts to individual learning styles and provides personalized feedback.',
  faculty: 'Dr. Smith',
  status: 'open' as const,
  enrolledCount: 2,
  maxEnrollment: 4,
  requirements: [
    'Strong understanding of machine learning concepts',
    'Experience with Python and TensorFlow/PyTorch',
    'Good communication skills',
  ],
  objectives: [
    'Create an adaptive learning algorithm',
    'Develop user-friendly interface',
    'Implement real-time feedback system',
  ],
};

const ProjectDetails = () => {
  const { id } = useParams();
  const [isApplying, setIsApplying] = useState(false);

  const handleApply = async () => {
    setIsApplying(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Application submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit application');
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {mockProject.title}
          </h1>
          <span
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              mockProject.status === 'open'
                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
            }`}
          >
            {mockProject.status}
          </span>
        </div>

        <div className="flex items-center space-x-6 mb-6 text-gray-600 dark:text-gray-300">
          <div className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            <span>{mockProject.enrolledCount}/{mockProject.maxEnrollment} enrolled</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            <span>{mockProject.faculty}</span>
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none mb-8">
          <p className="text-gray-600 dark:text-gray-300">
            {mockProject.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Requirements
            </h2>
            <ul className="space-y-2">
              {mockProject.requirements.map((req, index) => (
                <li
                  key={index}
                  className="flex items-start text-gray-600 dark:text-gray-300"
                >
                  <span className="mr-2">•</span>
                  {req}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Objectives
            </h2>
            <ul className="space-y-2">
              {mockProject.objectives.map((obj, index) => (
                <li
                  key={index}
                  className="flex items-start text-gray-600 dark:text-gray-300"
                >
                  <span className="mr-2">•</span>
                  {obj}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleApply}
          disabled={isApplying}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isApplying ? (
            'Submitting...'
          ) : (
            <>
              <Send className="h-5 w-5 mr-2" />
              Apply for Project
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProjectDetails;