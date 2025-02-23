import { useEffect, useState } from 'react';
import { User, Mail, Github, Code } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { useParams } from 'react-router-dom';

const StudentFacultyProfile = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://localhost:8765/STUDENT-SERVICE/students/${studentId}`);
        setStudent(response.data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };
    fetchStudent();
  }, [studentId]);

  if (!student) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Profile</h2>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <User className="w-5 h-5 text-gray-400" />
              <span className="text-gray-900 dark:text-white">{student.name}</span>
            </div>
            <div className="flex items-center space-x-4">
              <Mail className="w-5 h-5 text-gray-400" />
              <span className="text-gray-900 dark:text-white">{student.email}</span>
            </div>
            <div className="flex items-center space-x-4">
              <Github className="w-5 h-5 text-gray-400" />
              <a
                href={student.githubProfileLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                {student.githubProfileLink}
              </a>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <Code className="w-5 h-5 text-gray-400" />
                <span className="text-gray-900 dark:text-white font-medium">Skills</span>
              </div>
              <div className="flex flex-wrap gap-2 pl-9">
                {student.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="pl-9">
              <p className="text-gray-600 dark:text-gray-300">{student.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentFacultyProfile;
