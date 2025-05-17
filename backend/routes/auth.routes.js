import express from 'express';
import { checkAuth, forgotPassword, login, logout, resetPassword, signup, verifyEmail } from '../controllers/auth.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const authrouter = express.Router();

authrouter.post('/signup', signup); // Route for user signup
authrouter.post('/verify-email', verifyEmail); // Route for email verification
authrouter.post('/logout', logout); // Route for user logout
authrouter.post('/login', login); // Route for user login
authrouter.post('/forgot-password', forgotPassword); // Route for password reset
authrouter.post('/reset-password/:token', resetPassword); // Route for resetting password
authrouter.get('/check-auth',verifyToken, checkAuth); // Route to check if user is authenticated

export default authrouter; // Export the auth router for use in other files