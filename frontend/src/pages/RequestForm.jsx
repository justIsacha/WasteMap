// frontend/src/pages/RequestForm.jsx
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { createRequest } from '../services/requestService';
import { useNavigate } from 'react-router-dom';
import Map from '../components/Map';

const RequestForm = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [wasteType, setWasteType] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location) {
      setError('Please select a location on the map');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await createRequest(
        { wasteType, description, location },
        user.token
      ); // Call backend API
      navigate('/dashboard'); // Redirect after success
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">New Waste Collection Request</h1>

        {error && (
          <div className="text-red-600 text-sm bg-red-100 p-2 rounded mb-4">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Waste Type</label>
            <select
              value={wasteType}
              onChange={(e) => setWasteType(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select type</option>
              <option value="Household">Household</option>
              <option value="Recyclable">Recyclable</option>
              <option value="Bulky">Bulky</option>
              <option value="Hazardous">Hazardous</option>
              <option value="Garden">Garden</option>
              <option value="Electronic">Electronic</option>
              <option value="Organic">Organic</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Provide details about the waste..."
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Pin Location</label>
            <Map selectedLocation={location} setSelectedLocation={setLocation} />
            <p className="text-gray-500 text-sm mt-1">Click on the map to pin the collection location.</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 text-white font-semibold rounded-lg ${
              loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestForm;
