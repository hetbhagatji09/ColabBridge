import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import FacultyProjectList from './FacultyProjectList';
import AddProjectModal from './AddProjectModal';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const FacultyDashboard = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { user } = useAuth();
  useEffect(()=>{
   
    const fetchProjects= async()=>{
        try{
          const response=await axios.get(
            `http://localhost:8765/FACULTY-SERVICE/api/faculty/${user.id}`
           );
          console.log(response.data);
        }catch(error){
          console.log(error);
        }
  
    };
    fetchProjects();
  },[user]);
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold text-gray-900 dark:text-white"
        >
          Faculty Dashboard
        </motion.h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Project
        </motion.button>
      </div>

      <FacultyProjectList />
      
      {isAddModalOpen && (
        <AddProjectModal 
          isOpen={isAddModalOpen} 
          onClose={() => setIsAddModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default FacultyDashboard;