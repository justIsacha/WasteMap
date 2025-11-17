import Request from '../models/Request.js';

export async function createRequest(req, res) {
  try {
    const { wasteType, description, location } = req.body;
    if (!wasteType || !location || !location.latitude || !location.longitude) {
      return res.status(400).json({ message: 'Provide waste type and location coords' });
    }
    const request = await Request.create({
      user: req.user._id,
      wasteType,
      description: description || '',
      location: {
        latitude: location.latitude,
        longitude: location.longitude,
        address: location.address || '',
      },
      status: 'Pending',
    });
    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: 'Server error creating request', error: error.message });
  }
}

export async function getAllRequests(req, res) {
  try {
    let requests;
    if (req.user.role === 'admin') {
      requests = await Request.find().populate('user', 'name email').sort({ createdAt: -1 });
    } else {
      requests = await Request.find({ user: req.user._id }).sort({ createdAt: -1 });
    }
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching requests', error: error.message });
  }
}

export async function getRequestById(req, res) {
  try {
    const request = await Request.findById(req.params.id).populate('user', 'name email');
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    if (request.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching request', error: error.message });
  }
}
export async function updateRequestStatus(req, res) {
  try {
    const { status } = req.body;
    // Validate status
    const validStatuses = ['Pending', 'In Progress', 'Completed', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }
    // Find request
    const request = await Request.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    //only admin can update status
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    // Update status
    request.status = status;
    await request.save();
//populate user info for response
    await request.populate('user', 'name email');
    res.json({ message: 'Status updated', request });
  } catch (error) {
    console.error('Error updating request status:', error);
    res.status(500).json({ message: 'Server error updating status', error: error.message });
  }
}

export async function updateRequest(req, res) {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    // Only the owner or admin can update
    if (request.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    request.wasteType = req.body.wasteType || request.wasteType;
    request.description = req.body.description !== undefined ? req.body.description : request.description;
    request.status = req.body.status || request.status;
    if (req.body.location) {
      request.location.latitude = req.body.location.latitude || request.location.latitude;
      request.location.longitude = req.body.location.longitude || request.location.longitude;
      request.location.address = req.body.location.address !== undefined ? req.body.location.address : request.location.address;
    }
    const updatedRequest = await request.save();
    res.json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: 'Server error updating request', error: error.message });
  }
}

export async function deleteRequest(req, res) {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    if (request.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    await request.deleteOne();
    res.json({ message: 'Request deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting request', error: error.message });
  }
}

export async function getRequestStats(req, res) {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    const total = await Request.countDocuments();
    const pending = await Request.countDocuments({ status: 'Pending' });
    const inProgress = await Request.countDocuments({ status: 'In Progress' });
    const completed = await Request.countDocuments({ status: 'Completed' });
    res.json({ total, pending, inProgress, completed });
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching stats', error: error.message });
  }
}
