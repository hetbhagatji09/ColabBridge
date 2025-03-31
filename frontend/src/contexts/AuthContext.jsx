import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'https://api-gateway-production-ed7d.up.railway.app',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const navigate = useNavigate();

  // Set token in axios headers whenever it changes
  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const fetchUserData = async (storedToken) => {
    try {
      const response = await axios.get(`https://api-gateway-production-ed7d.up.railway.app/auth/user?token=${storedToken}`);
      const userData = response.data;

      if (userData.userRole === 'STUDENT') {
        const studentResponse = await api.get(
          `/STUDENT-SERVICE/students/email/${userData.username}`
        );
        Object.assign(userData, studentResponse.data);
        userData.id = userData.studentId;
      } else if (userData.userRole === 'FACULTY') {
        const facultyResponse = await api.get(
          `/FACULTY-SERVICE/api/faculty/email/${userData.username}`
        );
        Object.assign(userData, facultyResponse.data);
        userData.id = userData.f_id;
      }

      setUser(userData);
      navigate(
        userData.userRole === 'STUDENT' 
          ? '/student/dashboard' 
          : userData.userRole === 'FACULTY' 
            ? '/faculty/dashboard' 
            : '/admin/dashboard', 
        { replace: true }
      );
      
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      logout();
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      axios.get(`https://api-gateway-production-ed7d.up.railway.app/auth/validate?token=${storedToken}`)
        .then(() => {
          setToken(storedToken);
          fetchUserData(storedToken);
        })
        .catch(() => {
          logout();
        });
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post('https://api-gateway-production-ed7d.up.railway.app/auth/token', { 
        username, 
        password 
      });
      
      const newToken = response.data.token;
      localStorage.setItem('token', newToken);
      setToken(newToken);

      await fetchUserData(newToken);
      toast.success('Login successful!');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please check your credentials.');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
    delete api.defaults.headers.common['Authorization'];
    navigate('/login');
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      isAuthenticated: !!token, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

