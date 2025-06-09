import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connectDB.js'; // Import the connectDB function from the db directory
import authrouter from './routes/auth.routes.js'; // Import the auth router from the routes directory
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

dotenv.config(); // Load environment variables from .env file
const app = express(); // Create an instance of express
const port = process.env.PORT || 5000 ; // Get the port from environment variables
const __dirname = path.resolve(); // Get the current directory name

app.use(cors({origin: "http://localhost:5173", credentials: true}));
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cookieParser()); // Middleware to parse cookies from the request(incoming cookies)

app.use('/api/auth', authrouter); // Use the auth router for authentication routes

app.use(express.static(path.join(__dirname, '/fontend/dist'))); // Serve static files from the frontend build directory
app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, 'fontend', 'dist', 'index.html')); // Serve the index.html file for all other routes
})
app.get('/', (req, res) => {
    res.send('Welcome to the backend server!'); // Respond with a welcome message
},)
app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`); // Log the port number
}); // Start the server and listen on port 3000