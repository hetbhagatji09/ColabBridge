import { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import SearchBar from '../components/SearchBar';

// Mock data - replace with API call
const mockProjects = [
  {
    id: '1',
    title: 'AI-Powered Learning Assistant',
    description: 'Develop an AI-based learning assistant to help students with their studies.',
    faculty: 'Dr. Smith',
    status: 'open',
    enrolledCount: 2,
    maxEnrollment: 4,
  },
  {
    id: '2',
    title: 'Smart Campus Navigation',
    description: 'Create a mobile app for efficient campus navigation using indoor positioning.',
    faculty: 'Prof. Johnson',
    status: 'open',
    enrolledCount: 3,
    maxEnrollment: 5,
  },
  // Add more mock projects...
];

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = mockProjects.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.faculty.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8"
      >
        Available Projects
      </motion.h1>

      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;