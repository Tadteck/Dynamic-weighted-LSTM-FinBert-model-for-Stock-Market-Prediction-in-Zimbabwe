import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const fetchStocks = async () => {
  try {
    const res = await api.get('/api/stocks/');
    return res.data;
  } catch (error) {
    console.warn('API Error /api/stocks/ - using fallback data for demo', error.message);
    return [];
  }
};

export const fetchNews = async () => {
  try {
    const res = await api.get('/api/news/');
    return res.data;
  } catch (error) {
    console.warn('API Error /api/news/ - using fallback data for demo', error.message);
    return [];
  }
};

export const fetchPredictions = async () => {
  try {
    const res = await api.get('/api/history/');
    return res.data;
  } catch (error) {
    console.warn('API Error /api/history/ - using fallback data for demo', error.message);
    return [];
  }
};

export default api;
