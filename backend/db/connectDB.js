import mongoose from "mongoose";

// Connect to MongoDB
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL); // Use the connection string from .env file
        if (conn) {
            console.log('MongoDB connected successfully'); // Log success message
        } else {
            console.log('MongoDB connection failed',error.message); // Log failure message
        } // Log the host of the connected MongoDB instance
    } catch (error) {
        console.log(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // 1 is failure, 0 status code is success
    }
};

export default connectDB; // Export the connectDB function for use in other files