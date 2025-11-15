import * as auth from './controllers/authController.js';
console.log('Module contents:', Object.keys(auth));
console.log('registerUser:', typeof auth.registerUser);
console.log('loginUser:', typeof auth.loginUser);
console.log('getUserProfile:', typeof auth.getUserProfile);
