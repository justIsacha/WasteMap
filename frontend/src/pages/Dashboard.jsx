// frontend/src/pages/Dashboard.jsx
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getUserRequests } from '../services/requestService';
import RequestCard from '../components/RequestCard';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user requests on mount
  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getUserRequests(user.token); // Send JWT token for auth
        setRequests(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load requests');
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [user.token]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">My Waste Collection Requests</h1>
          <Link
            to="/request/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
          >
            New Request
          </Link>
        </div>

        {loading && <div className="text-center text-gray-600">Loading requests...</div>}

        {error && (
          <div className="text-red-600 text-center mb-4 bg-red-100 p-2 rounded">{error}</div>
        )}

        {!loading && requests.length === 0 && (
          <div className="text-gray-600 text-center">No requests found. Create your first request!</div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req) => (
            <RequestCard key={req._id} request={req} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
