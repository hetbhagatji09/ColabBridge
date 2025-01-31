import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProjectDetails from './pages/ProjectDetails';
import ConfirmedProjects from './pages/ConfirmedProjects';
import Feedback from './pages/Feedback';
import Layout from './components/Layout';

// Protected Route wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <Toaster position="top-right" />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path="project/:id" element={<ProjectDetails />} />
                <Route path="confirmed-projects" element={<ConfirmedProjects />} />
                <Route path="feedback" element={<Feedback />} />
              </Route>
            </Routes>
          </AnimatePresence>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;