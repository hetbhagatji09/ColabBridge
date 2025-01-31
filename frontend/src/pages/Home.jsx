import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GraduationCap, Users, Rocket, BookOpen, Star, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';

const features = [
  {
    icon: GraduationCap,
    title: 'Student Projects',
    description: 'Access and apply to various academic projects posted by faculty members.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'Work together with faculty and other students on innovative projects.',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: Rocket,
    title: 'Progress Tracking',
    description: 'Monitor your project progress and receive feedback from faculty.',
    color: 'from-green-500 to-green-600',
  },
];

const stats = [
  { value: '500+', label: 'Active Projects' },
  { value: '1000+', label: 'Students' },
  { value: '200+', label: 'Faculty Members' },
  { value: '50+', label: 'Departments' },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      
      <main className="container mx-auto px-6">
        {/* Hero Section */}
        <div className="pt-32 pb-16 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <div className="flex items-center justify-center mb-4">
              <BookOpen className="h-12 w-12 text-blue-600 dark:text-blue-400 mr-3" />
              <Star className="h-8 w-8 text-yellow-500 animate-pulse" />
            </div>
            
            <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Welcome to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                CollabBridge
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Connect, collaborate, and create amazing projects with faculty and fellow students.
              Your gateway to academic excellence.
            </p>
            
            <div className="flex justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/login"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium flex items-center group"
                >
                  Get Started
                  <ChevronRight className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/about"
                  className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg font-medium border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
                >
                  Learn More
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-24"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="text-center"
            >
              <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {stat.value}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r rounded-xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"
                  style={{
                    background: `linear-gradient(to right, ${feature.color.split(' ')[1]}, ${feature.color.split(' ')[3]})`,
                  }}
                />
                <div className="relative bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                  <div className="w-12 h-12 bg-gradient-to-r rounded-lg flex items-center justify-center mb-6"
                    style={{
                      background: `linear-gradient(to right, ${feature.color.split(' ')[1]}, ${feature.color.split(' ')[3]})`,
                    }}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Home;