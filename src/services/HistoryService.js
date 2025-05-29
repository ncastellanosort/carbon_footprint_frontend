import axios from 'axios';

const axiosHistory = axios.create({
  baseURL: 'https://history-service-spring.onrender.com/history-service',
});

axiosHistory.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosHistory;