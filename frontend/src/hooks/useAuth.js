// frontend/src/context/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';
import { loginUser, registerUser } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(false);

  // Persist user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', user.token);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }, [user]);

  // Handle login
  const login = async (credentials) => {
    setLoading(true);
    try {
      const data = await loginUser(credentials);
      setUser(data);
      return data;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Handle registration
  const register = async (userData) => {
    setLoading(true);
    try {
      const data = await registerUser(userData);
      setUser(data);
      return data;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
