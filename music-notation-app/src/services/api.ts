import axios from 'axios';
import { Song, User } from '../types/song';

// API Configuration
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';
const API_VERSION = process.env.REACT_APP_API_VERSION || 'v1';
const API_TIMEOUT = parseInt(process.env.REACT_APP_API_TIMEOUT || '30000', 10);

// Create axios instance with default config
const api = axios.create({
  baseURL: `${API_URL}/${API_VERSION}`,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
    try {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      if (tokenPayload.userId) {
        // Add userId to request data if it's a POST or PUT request
        if (config.method === 'post' || config.method === 'put') {
          const data = config.data || {};
          config.data = {
            ...data,
            userId: tokenPayload.userId
          };
        }
      }
    } catch (error) {
      console.error('Error parsing token:', error);
    }
  }
  console.log('Request:', {
    url: config.url,
    method: config.method,
    data: config.data,
    headers: config.headers
  });
  return config;
});

// Handle token expiration and auth errors
api.interceptors.response.use(
  (response) => {
    console.log('Response:', {
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error: any) => {
    console.error('API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        data: error.config?.data
      }
    });
    
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/';
    } else if (error.response?.status === 403) {
      // Handle forbidden error
      console.error('Access forbidden. Please check your permissions.');
      throw new Error(error.response?.data?.message || 'Access forbidden. Please check your permissions.');
    } else if (error.response?.status === 404) {
      throw new Error(error.response?.data?.message || 'Resource not found.');
    } else if (error.response?.status === 500) {
      throw new Error('Server error. Please try again later.');
    }
    return Promise.reject(error);
  }
);

interface OTPResponse {
  message: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

// Auth services
export const authService = {
  register: async (data: { name: string; email: string; password: string }): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  login: async (data: { email: string; password: string }): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },

  sendOTP: async (phoneNumber: string): Promise<OTPResponse> => {
    const response = await api.post<OTPResponse>('/auth/send-otp', { phoneNumber });
    return response.data;
  },

  verifyOTP: async (phoneNumber: string, otp: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/verify-otp', { phoneNumber, otp });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  }
};

// Song services
export const songService = {
  getAll: async (): Promise<Song[]> => {
    try {
      const response = await api.get<Song[]>('/songs');
      return response.data;
    } catch (error) {
      console.error('Error fetching songs:', error);
      throw error;
    }
  },

  getById: async (id: string): Promise<Song> => {
    try {
      const response = await api.get<Song>(`/songs/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching song:', error);
      throw error;
    }
  },

  create: async (data: Omit<Song, '_id'>): Promise<Song> => {
    try {
      console.log('Creating song with data:', data);
      const response = await api.post<Song>('/songs', data);
      return response.data;
    } catch (error) {
      console.error('Error creating song:', error);
      throw error;
    }
  },

  update: async (id: string, data: Partial<Song>): Promise<Song> => {
    try {
      console.log('Updating song with data:', data);
      const response = await api.put<Song>(`/songs/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating song:', error);
      throw error;
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/songs/${id}`);
    } catch (error) {
      console.error('Error deleting song:', error);
      throw error;
    }
  },

  toggleFavorite: async (id: string): Promise<Song> => {
    try {
      const response = await api.put<Song>(`/songs/${id}/favorite`);
      return response.data;
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw error;
    }
  }
};

// Collection services
export const collectionService = {
  getAll: async () => {
    const response = await api.get('/collections');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/collections/${id}`);
    return response.data;
  },

  create: async (data: { name: string; description?: string }) => {
    const response = await api.post('/collections', data);
    return response.data;
  },

  update: async (id: string, data: { name?: string; description?: string }) => {
    const response = await api.put(`/collections/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/collections/${id}`);
    return response.data;
  },

  addSong: async (collectionId: string, songId: string) => {
    const response = await api.post(`/collections/${collectionId}/songs`, { songId });
    return response.data;
  },

  removeSong: async (collectionId: string, songId: string) => {
    const response = await api.delete(`/collections/${collectionId}/songs/${songId}`);
    return response.data;
  },
};

export default api; 