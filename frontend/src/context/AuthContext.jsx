// frontend/src/context/AuthContext.jsx
import { createContext, useState, useContext } from 'react';
import api from '../services/api';

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Register new user
  const register = async ({ name, email, password }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post('/auth/register', { name, email, password });
      if (res.data?._id) {
        const userData = {
          _id: res.data._id,
          name: res.data.name,
          email: res.data.email,
          role: res.data.role,
          token: res.data.token,
        };
        setUser(userData);
        localStorage.setItem('token', userData.token);
        setLoading(false);
        return { success: true, user: userData };
      } else {
        setError('Registration failed');
        setLoading(false);
        return { success: false };
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      setLoading(false);
      return { success: false };
    }
  };

  // Login user/admin
  const login = async ({ email, password }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data?._id) {
        const userData = {
          _id: res.data._id,
          name: res.data.name,
          email: res.data.email,
          role: res.data.role,
          token: res.data.token,
        };
        setUser(userData);
        localStorage.setItem('token', userData.token);
        setLoading(false);
        return { success: true, user: userData };
      } else {
        setError('Login failed');
        setLoading(false);
        return { success: false };
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      setLoading(false);
      return { success: false };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};
