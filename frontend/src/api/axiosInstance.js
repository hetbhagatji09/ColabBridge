// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api-gateway-1w0w.onrender.com',
});

// Add request interceptor to attach token from localStorage
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.url !== '/auth/token') {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});


export default axiosInstance;
