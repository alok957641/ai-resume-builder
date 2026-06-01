import axios from 'axios';

// Axios ka ek instance banao apne backend ke liye
const api = axios.create({
  baseURL: 'http://localhost:5000/api',  // backend ka address
  headers: {
    'Content-Type': 'application/json',
  },
});

// Har request mein token automatically lagao
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;