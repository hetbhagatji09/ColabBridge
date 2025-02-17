import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios'; // For making API calls

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); // Store the JWT token
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const login = async (username, password) => {
    try {
      if (username === 'faculty@example.com' && password === 'faculty123') {
        setUser({
          id: 3,
          name: 'Faculty User',
          email: 'faculty@example.com',
          role: 'FACULTY',
        });
        setToken('dummy-token'); // Set a dummy token
        navigate('faculty/dashboard');
        toast.success('Login successful!');
        return;
      }
      // Call your Spring Boot API to get the token
      const response = await axios.post('http://localhost:8765/auth/token', {
          username,
          password,
      });

      // Extract the token from the response
      const { token } = response.data;

      // Save the token in the context
      setToken(token);

      // Fetch user details using the token as a query parameter
      const userResponse = await axios.get(`http://localhost:8765/auth/user?token=${token}`);

      const userData = userResponse.data;
      console.log(userData);
      // Save the user data in the context
      

      
      // Navigate based on the user's role
      if (userData.userRole==='STUDENT') {
        const studentResponse = await axios.get(
          `http://localhost:8765/STUDENT-SERVICE/students/email/${userData.username}`
        );
        Object.assign(userData, studentResponse.data);
        userData.id = userData.studentId;
        console.log(userData)
        navigate('student/dashboard');
        toast.success('Login successful!');
      } else if (userData.userRole === 'FACULTY') {
        const facultyResponse = await axios.get(
          `http://localhost:8765/FACULTY-SERVICE/api/faculty/email/${userData.username}`
        );
        Object.assign(userData, facultyResponse.data);
        userData.id = userData.f_id;
        console.log(userData)
        navigate('faculty/dashboard');
        toast.success('Login successful!');
      }
      setUser(userData);
      
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setSelectedRole(null);
    navigate('/');
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token, // Use token to check authentication
        login,
        logout,
        selectedRole,
        setSelectedRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
// import { createContext, useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem('token') || null);
//   const navigate = useNavigate();

//   // Login function
//   const login = async (username, password, role) => {
//     try {
      
//       const response = await axios.post('http://localhost:8765/auth/token', {
//         username,
//         password,
//       });

//       const newToken = response.data.token;
//       console.log("get the token bro");
//       // Store token and role in localStorage
//       localStorage.setItem('token', newToken);
//       localStorage.setItem('role', role);

//       setToken(newToken);
//       setUser({ username, role });
//       console.log(user);
//       toast.success('Login successful!');
//        console.log(role);
//       // Navigate based on stored role
//       if (role === 'faculty') {
//         console.log("Go to dashboard",role);
//         navigate('/faculty/dashboard');
//         console.log("out from faculty dashboard");
//       } else if (role === 'student') {
//         navigate('/student/dashboard');
//       }
//     } catch (error) {
//       toast.error('Login failed. Please check your credentials.');
//       console.error('Login error:', error);
//     }
//   };

//   // Validate stored token
//   const validateToken = async () => {
//     const storedToken = localStorage.getItem('token');
//     console.log('Token stored:', storedToken);
//     const storedRole = localStorage.getItem('role'); // Get role from localStorage
//     console.log('Stored role:', storedRole);
//     if (!storedToken) return false;

//     try {
//       await axios.get(`http://localhost:8765/auth/validate?token=${storedToken}`);

//       // Set user state
//       setUser({ username: 'storedUser', role: storedRole });
      
//       // Navigate based on stored role
//       if (storedRole === 'faculty') {
//         console.log("In role role",storedRole);
//         navigate('/faculty/dashboard', { replace: true });
//         console.log("out from faculty dashboard");
//       } else if (storedRole === 'student') {
//         navigate('/student/dashboard');
//       }
//       return true;
//     } catch (error) {
//       localStorage.removeItem('token');
//       localStorage.removeItem('role');
//       setToken(null);
//       setUser(null);
//       return false;
//     }
//   };

//   // Check token validity on component mount
//   // useEffect(() => {
//   //   (async () => {
//   //     console.log("DO not validate");
//   //     const isValid = await validateToken();
      
//   //   })();
//   // }, []);

//   // Logout function
//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     setToken(null);
//     setUser(null);
//     navigate('/login');
//     toast.info('Logged out successfully');
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, token }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook for using AuthContext
// export const useAuth = () => useContext(AuthContext);
