// frontend/src/components/RequestCard.jsx
import React from 'react';

const statusColors = {
  Pending: 'bg-yellow-100 text-yellow-800',
  'In Progress': 'bg-blue-100 text-blue-800',
  Completed: 'bg-green-100 text-green-800',
};

const RequestCard = ({ request }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">{request.wasteType}</h2>
      <p className="text-gray-600 mb-2">{request.description}</p>

      {request.location && (
        <p className="text-gray-500 text-sm mb-2">
          Location: {request.location.address || 'Pinned on map'}
        </p>
      )}

      <p className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${statusColors[request.status] || 'bg-gray-100 text-gray-800'}`}>
        {request.status}
      </p>

      {request.createdAt && (
        <p className="text-gray-400 text-xs mt-2">
          Requested on: {new Date(request.createdAt).toLocaleDateString()}
        </p>
      )}
    </div>
  );
};

export default RequestCard;
