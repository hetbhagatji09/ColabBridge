import { motion } from 'framer-motion';
import FacultyProjectCard from './FacultyProjectCard';

// Mock data - replace with API call
const projects = [
  {
    id: 1,
    title: 'AI Research Assistant',
    description: 'Developing an AI-powered research assistant for academic papers',
    enrolledStudents: [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    ],
    maxStudents: 4,
    status: 'active',
    technologies: ['Python', 'TensorFlow', 'NLP'],
  },
  // Add more mock projects
];

const FacultyProjectList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <FacultyProjectCard project={project} />
        </motion.div>
      ))}
    </div>
  );
};

export default FacultyProjectList;