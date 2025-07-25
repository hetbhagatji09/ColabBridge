import { motion } from 'framer-motion';
import FacultyProjectCard from './FacultyProjectCard';
import { useAuth } from '../../contexts/AuthContext';
import { useState,useEffect } from 'react';
import axios from 'axios';
// import no_projects from '../../assets/no_projects.jpeg';
import axiosInstance from '../../api/axiosInstance';


const FacultyProjectList = () => {
  const [projects,setProjects]=useState([]);
  const { user } = useAuth();
  useEffect(()=>{
   
    const fetchProjects= async()=>{
        try{
          const response=await axiosInstance.get(
            `/FACULTY-SERVICE/api/faculty/${user.id}`
           );
          console.log(response.data);
          setProjects(response.data); // Use fetched data
        }catch(error){
          console.log(error);
        }
  
    };
    fetchProjects();
  },[user]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects && projects.length > 0 ? (
        projects.filter((project)=>project.status!=="APPROVED").map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <FacultyProjectCard project={project} />
          </motion.div>
        ))
      ) : (
        // Display an image when no projects are available
        <div className="flex flex-col items-center col-span-full mt-10">
          {/* <img
            src="/assets/no-projects.png" // Ensure this image is placed in the 'public/assets' folder
            alt="No projects available"
            className="w-64 h-64"
          /> */}
          <p className="mt-4 text-lg text-gray-500">No projects available</p>
        </div>
      )}
    </div>
  );
};

export default FacultyProjectList;

