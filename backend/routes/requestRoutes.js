import express from 'express';
import { createRequest, getAllRequests, getRequestById, updateRequest, deleteRequest, getRequestStats } from '../controllers/requestController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/stats', protect, admin, getRequestStats);
router.post('/', protect, createRequest);
router.get('/', protect, getAllRequests);
router.get('/:id', protect, getRequestById);
router.put('/:id', protect, updateRequest);
router.delete('/:id', protect, deleteRequest);

export default router;