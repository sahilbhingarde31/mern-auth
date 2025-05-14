import express from 'express';
import { signup, verifyEmail } from '../controllers/auth.controller.js';

const authrouter = express.Router();

authrouter.post('/signup', signup); // Route for user signup
authrouter.post('/verify-email', verifyEmail); // Route for email verification

export default authrouter; // Export the auth router for use in other files