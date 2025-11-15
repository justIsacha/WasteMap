// frontend/src/context/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';
import { loginUser, registerUser } from '../services/authService';

export const AuthContext = createContext();

// Custom hook to use auth easily
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load saved user
  useEffect(() => {
    const saved = localStorage.getItem('wastemapUser');
    if (saved) setUser(JSON.parse(saved));
    setLoading(false);
  }, []);

  const handleSetUser = (data) => {
    setUser(data);
    localStorage.setItem('wastemapUser', JSON.stringify(data));
  };

  // Login (returns success so component can redirect)
  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const data = await loginUser(credentials);
      handleSetUser(data);
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  // Register
  const register = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const data = await registerUser(credentials);
      handleSetUser(data);
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('wastemapUser');
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
