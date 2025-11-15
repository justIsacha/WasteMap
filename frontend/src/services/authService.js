// frontend/src/services/authService.js
import api from './api';

// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data; // Return user info + token
  } catch (error) {
    throw error;
  }
};

// Login an existing user
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data; // Return user info + token
  } catch (error) {
    throw error;
  }
};
