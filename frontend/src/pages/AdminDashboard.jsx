// frontend/src/pages/AdminDashboard.jsx
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getAllRequests, updateRequestStatus, deleteRequest } from '../services/requestService';
import RequestCard from '../components/RequestCard';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('');

  // Fetch all requests
  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllRequests(user.token);
        setRequests(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load requests');
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [user.token]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateRequestStatus(id, newStatus, user.token);
      setRequests((prev) =>
        prev.map((req) => (req._id === id ? { ...req, status: newStatus } : req))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this request?')) return;
    try {
      await deleteRequest(id, user.token);
      setRequests((prev) => prev.filter((req) => req._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredRequests = filterStatus
    ? requests.filter((req) => req.status === filterStatus)
    : requests;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>

        {error && (
          <div className="text-red-600 text-center mb-4 bg-red-100 p-2 rounded">{error}</div>
        )}

        <div className="mb-4 flex space-x-4 items-center">
          <label className="text-gray-700 font-medium">Filter by Status:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {loading && <div className="text-center text-gray-600">Loading requests...</div>}

        {!loading && filteredRequests.length === 0 && (
          <div className="text-gray-600 text-center">No requests found.</div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRequests.map((req) => (
            <div key={req._id} className="relative">
              <RequestCard request={req} />
              <div className="flex justify-between mt-2">
                <select
                  value={req.status}
                  onChange={(e) => handleStatusChange(req._id, e.target.value)}
                  className="px-2 py-1 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
                <button
                  onClick={() => handleDelete(req._id)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
