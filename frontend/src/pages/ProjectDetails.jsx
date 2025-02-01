import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Clock, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [isApplying, setIsApplying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:8765/FACULTY-SERVICE/api/project/${id}`);
        setProject(response.data);
      } catch (err) {
        setError('Failed to load project details');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const handleApply = async () => {
    setIsApplying(true);
    try {
      await axios.post(`http://localhost:8765/FACULTY-SERVICE/api/project/${id}/apply`);
      toast.success('Application submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit application');
    } finally {
      setIsApplying(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!project) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{project.title}</h1>
          <span className={`px-4 py-2 rounded-full text-sm font-medium ${project.status === 'OPEN_FOR_APPLICATIONS' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'}`}>{project.status}</span>
        </div>
        <div className="flex items-center space-x-6 mb-6 text-gray-600 dark:text-gray-300">
          <div className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            <span>Faculty: {project.faculty.name}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            <span>Deadline: {new Date(project.deadline).toLocaleDateString()}</span>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{project.description}</p>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleApply} disabled={isApplying} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed">
          {isApplying ? 'Submitting...' : <><Send className="h-5 w-5 mr-2" /> Apply for Project</>}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProjectDetails;
