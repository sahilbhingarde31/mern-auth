import express from 'express';
import { signup } from '../controllers/auth.controller.js';

const authrouter = express.Router();

authrouter.post('/signup', signup); // Route for user signup

export default authrouter; // Export the auth router for use in other files