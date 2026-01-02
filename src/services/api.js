import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests
api.interceptors.request.use(
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
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    login: (credentials) => api.post('/auth/login', credentials),
    getMe: () => api.get('/auth/me'),
    logout: () => api.post('/auth/logout')
};

// Menu API
export const menuAPI = {
    getAll: (params) => api.get('/menu', { params }),
    getOne: (id) => api.get(`/menu/${id}`),
    create: (data) => api.post('/menu', data),
    update: (id, data) => api.put(`/menu/${id}`, data),
    delete: (id) => api.delete(`/menu/${id}`),
    toggleAvailability: (id) => api.patch(`/menu/${id}/toggle-availability`)
};

// Orders API
export const ordersAPI = {
    getAll: (params) => api.get('/orders', { params }),
    getOne: (id) => api.get(`/orders/${id}`),
    create: (data) => api.post('/orders', data),
    simulate: () => api.post('/orders/simulate'),
    updateStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }),
    delete: (id) => api.delete(`/orders/${id}`)
};

// Dashboard API
export const dashboardAPI = {
    getStats: () => api.get('/dashboard/stats')
};

export default api;
