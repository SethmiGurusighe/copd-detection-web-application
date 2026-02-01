// API Service with Axios
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => apiClient.post('/auth/register', data),
  login: (data) => apiClient.post('/auth/login', data),
  getCurrentUser: () => apiClient.get('/auth/me'),
};

// Assistant API
export const assistantAPI = {
  getDashboard: () => apiClient.get('/assistant/dashboard'),
  getAppointments: () => apiClient.get('/assistant/appointments'),
  createAppointment: (data) => apiClient.post('/assistant/appointments', data),
  updateAppointment: (id, data) => apiClient.put(`/assistant/appointments/${id}`, data),
  getPatients: () => apiClient.get('/assistant/patients'),
};

export default apiClient;
