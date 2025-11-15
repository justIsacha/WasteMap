// Test file to debug import issue
console.log('1. Importing express...');
import express from 'express';
console.log('2. OK - importing authController...');

import { registerUser, loginUser, getUserProfile } from './controllers/authController.js';
console.log('3. OK - importing authMiddleware...');

import { protect } from './middleware/authMiddleware.js';
console.log('4. OK - creating router...');

const router = express.Router();
console.log('5. OK - setting up routes...');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
console.log('6. OK - exporting router...');

export default router;
console.log('7. SUCCESS - module fully loaded');
