// frontend/src/services/requestService.js
import api from './api';

// Get all requests for the logged-in user
export const getUserRequests = async (token) => {
  try {
    const response = await api.get('/requests', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // Array of user requests
  } catch (error) {
    throw error;
  }
};

// Get all requests (Admin only)
export const getAllRequests = async (token) => {
  try {
    const response = await api.get('/requests', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // Array of all requests
  } catch (error) {
    throw error;
  }
};

// Create a new waste request
export const createRequest = async (requestData, token) => {
  try {
    const response = await api.post('/requests', requestData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // Created request object
  } catch (error) {
    throw error;
  }
};

// Update status of a request (Admin only)
export const updateRequestStatus = async (requestId, status, token) => {
  try {
    const response = await api.patch(
      `/requests/${requestId}/status`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a request (Admin only)
export const deleteRequest = async (requestId, token) => {
  try {
    const response = await api.delete(`/requests/${requestId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};