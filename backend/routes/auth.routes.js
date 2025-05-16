import express from 'express';
import { login, logout, signup, verifyEmail } from '../controllers/auth.controller.js';

const authrouter = express.Router();

authrouter.post('/signup', signup); // Route for user signup
authrouter.post('/verify-email', verifyEmail); // Route for email verification
authrouter.post('/logout', logout); // Route for user logout
authrouter.post('/login', login); // Route for user login

export default authrouter; // Export the auth router for use in other files