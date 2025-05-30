import express from 'express';
import { checkAuth, feedback, forgotPassword, login, logout, resetPassword, sendFeedbackReceivedEmail, signup, updateProfile, verifyEmail } from '../controllers/auth.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const authrouter = express.Router();

authrouter.post('/signup', signup); // Route for user signup
authrouter.post('/verify-email', verifyEmail); // Route for email verification
authrouter.post('/logout', logout); // Route for user logout
authrouter.post('/login', login); // Route for user login
authrouter.post('/forgot-password', forgotPassword); // Route for password reset
authrouter.post('/reset-password/:token', resetPassword); // Route for resetting password
authrouter.get('/check-auth',verifyToken, checkAuth); // Route to check if user is authenticated
authrouter.post('/feedback', feedback); // Route for submitting feedback
authrouter.post('/feedback-email', sendFeedbackReceivedEmail); // Route to send feedback received email
authrouter.get('/update-profile', verifyToken, checkAuth); // Route to get user profile for updating
authrouter.put('/update-profile',verifyToken, updateProfile); // Route to update user profile
export default authrouter; // Export the auth router for use in other files