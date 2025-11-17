// frontend/src/pages/AdminDashboard.jsx
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getAllRequests, updateRequestStatus, deleteRequest } from '../services/requestService';
import RequestCard from '../components/RequestCard';
import api from '../services/api';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  
  // ADD THESE CONSOLE LOGS HERE TO CHECK USER ROLE
  console.log('User role:', user?.role);
  console.log('Full user:', user);
  
  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, inProgress: 0, completed: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('');

  // Fetch all requests and stats
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch requests
        const requestsData = await getAllRequests(user.token);
        setRequests(requestsData);

        // Fetch stats
        try {
          const statsResponse = await api.get('/requests/stats', {
            headers: { Authorization: `Bearer ${user.token}` }
          });
          setStats(statsResponse.data);
        } catch (statsErr) {
          console.error('Stats error:', statsErr);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load requests');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user.token]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateRequestStatus(id, newStatus, user.token);
      setRequests((prev) =>
        prev.map((req) => (req._id === id ? { ...req, status: newStatus } : req))
      );
      
      // Update stats
      const updatedRequests = requests.map((req) => 
        req._id === id ? { ...req, status: newStatus } : req
      );
      updateStats(updatedRequests);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update status');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this request?')) return;
    try {
      await deleteRequest(id, user.token);
      const updatedRequests = requests.filter((req) => req._id !== id);
      setRequests(updatedRequests);
      updateStats(updatedRequests);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete request');
      console.error(err);
    }
  };

  const updateStats = (requestsList) => {
    const newStats = {
      total: requestsList.length,
      pending: requestsList.filter(r => r.status === 'Pending').length,
      inProgress: requestsList.filter(r => r.status === 'In Progress').length,
      completed: requestsList.filter(r => r.status === 'Completed').length
    };
    setStats(newStats);
  };

  const filteredRequests = filterStatus
    ? requests.filter((req) => req.status === filterStatus)
    : requests;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Completed': return 'bg-green-100 text-green-800 border-green-300';
      case 'Cancelled': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage waste collection requests</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
            <div className="text-sm text-gray-600 mb-1">Total Requests</div>
            <div className="text-3xl font-bold text-gray-800">{stats.total}</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
            <div className="text-sm text-gray-600 mb-1">Pending</div>
            <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-600">
            <div className="text-sm text-gray-600 mb-1">In Progress</div>
            <div className="text-3xl font-bold text-blue-600">{stats.inProgress}</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
            <div className="text-sm text-gray-600 mb-1">Completed</div>
            <div className="text-3xl font-bold text-green-600">{stats.completed}</div>
          </div>
        </div>

        {error && (
          <div className="text-red-700 text-center mb-6 bg-red-100 p-4 rounded-lg border border-red-300">
            {error}
          </div>
        )}

        {/* Filter */}
        <div className="bg-white p-4 rounded-xl shadow-md mb-6 flex flex-wrap items-center gap-4">
          <label className="text-gray-700 font-medium">Filter by Status:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Requests</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <div className="text-sm text-gray-600 ml-auto">
            Showing {filteredRequests.length} of {requests.length} requests
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 mt-4">Loading requests...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredRequests.length === 0 && (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="text-gray-400 text-5xl mb-4">📭</div>
            <p className="text-gray-600 text-lg">No requests found.</p>
          </div>
        )}

        {/* Requests Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRequests.map((req) => (
            <div key={req._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <RequestCard request={req} />
              
              {/* Admin Controls */}
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <div className="mb-3">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Update Status
                  </label>
                  <select
                    value={req.status}
                    onChange={(e) => handleStatusChange(req._id, e.target.value)}
                    className={`w-full px-3 py-2 border-2 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 ${getStatusColor(req.status)}`}
                  >
                    <option value="Pending">⏳ Pending</option>
                    <option value="In Progress">🔄 In Progress</option>
                    <option value="Completed">✅ Completed</option>
                    <option value="Cancelled">❌ Cancelled</option>
                  </select>
                </div>

                <button
                  onClick={() => handleDelete(req._id)}
                  className="w-full px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  🗑️ Delete Request
                </button>
              </div>

              {/* User Info */}
              {req.user && (
                <div className="px-4 py-2 bg-gray-100 text-xs text-gray-600">
                  <strong>User:</strong> {req.user.name} ({req.user.email})
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;