import { createContext, useState, useContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

// Custom hook
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Register function
  const register = async ({ name, email, password }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('/api/auth/register', { name, email, password });
      if (res.data?.user) {
        setUser(res.data.user); // auto-login new user
        setLoading(false);
        return { success: true, user: res.data.user };
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

// Login function
const login = async ({ email, password }) => {
  setLoading(true);
  setError(null);

  try {
    const res = await axios.post('/api/auth/login', { email, password });

    // Backend returns the user fields directly (NOT inside res.data.user)
    if (res.data && res.data._id) {
      const userData = {
        _id: res.data._id,
        name: res.data.name,
        email: res.data.email,
        role: res.data.role,
        token: res.data.token,
      };

      setUser(userData);
      setLoading(false);

      return { success: true, user: userData };
    } else {
      setError("Invalid credentials");
      setLoading(false);
      return { success: false };
    }
  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
    setLoading(false);
    return { success: false };
  }
};

  // Logout function
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};
