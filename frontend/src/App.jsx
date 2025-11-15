// frontend/src/App.jsx
import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import RequestForm from './pages/RequestForm';
import AdminDashboard from './pages/AdminDashboard';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

// ProtectedRoute component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div className="text-center mt-20">Loading...</div>; // Show loading while checking auth

  if (!user) return <Navigate to="/login" replace />; // Redirect guests

  if (adminOnly && user.role !== 'admin') return <Navigate to="/dashboard" replace />; // Restrict non-admins

  return children;
};

const App = () => (
  <Router>
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/request/new"
          element={
            <ProtectedRoute>
              <RequestForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  </Router>
);

export default App;