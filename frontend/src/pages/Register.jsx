// frontend/src/context/AuthContext.jsx
import { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;  
// This will load:
// - http://localhost:5000 (development)
// - https://wastemap-backend.onrender.com (production)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // REGISTER FUNCTION
  const register = async (formData) => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        `${API_URL}/api/auth/register`,   // <- FIXED URL
        formData
      );

      setUser(res.data.user);
      localStorage.setItem("token", res.data.token);

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, register, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};
