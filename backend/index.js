import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connectDB.js'; // Import the connectDB function from the db directory

dotenv.config(); // Load environment variables from .env file
const app = express(); // Create an instance of express

app.get('/', (req, res) => {
    res.send('Hello Develpers!');
}); // Define a simple route for the root URL

app.listen(3000, () => {
    connectDB();
    console.log('Server is running on port 3000');
}); // Start the server and listen on port 3000