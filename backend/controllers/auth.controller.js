import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";
import { sendverificationcode, sendWelcomeEmail } from "../nodemailer/email.js";

// Function to handle user signup
export const signup = async(req, res) => {
    // Logic for user signup
    // 1. Validate the request body
    // 2. Check if the user already exists
    // 3. Hash the password
    // 4. Create a new user in the database
    // 5. Send a response to the client
    const { name, email, password } = req.body;
    try {
        if(!email || !password || !name) 
        {
            return res.status(400).json({ success: false, message: "Please fill all the fields" });
        }
        const userAlreadyExists = await User.findOne({email});  // Check if the user already exists
        if(userAlreadyExists){
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcryptjs.hash(password, 10); // Hash the password
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a verification code

        const user = new User({
            name,
            email,
            password: hashedPassword,
            verificationToken, // Store the verification token in the database
            verificationTokenExpiresAt: Date.now() + 10 * 60 * 1000, // Set the expiration time for the verification token
        });
        
        generateTokenAndSetCookie(res, user._id); // Generate a token and set it in a cookie
        await user.save(); // Save the user to the database
        sendverificationcode(user.email, verificationToken); // Send the verification code to the user's email
        res.status(201).json({
            success: true,
            message: "user created successfully",
            user: {
                ...user._doc,
                password: undefined, // Exclude the password from the response
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const verifyEmail = async (req, res) => {
    // Logic for email verification
    // 1. Validate the request body
    // 2. Check if the user exists
    // 3. Check if the verification token is valid
    // 4. Update the user's email verification status
    // 5. Send a response to the client
    const { code } = req.body;
    try {
        if(!code){
            return res.status(400).json({ success: false, message: "Please provide a verification code" });
        } // Check if the code is provided
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt:Date.now() }, // Check if the token is valid
        }); 
        if(!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
        } // Check if the user exists
        
        user.isVerified = true; // Update the user's email verification status
        user.verificationToken = undefined; // Remove the verification token
        user.verificationTokenExpiresAt = undefined; // Remove the expiration time for the verification token

        await user.save(); // Save the user to the database 
        await sendWelcomeEmail(user.email, user.name); // Send a welcome email to the user
        res.status(200).json({ 
            success: true, 
            message: "Email verified successfully",
            user: {
                ...user._doc,
                password: undefined, // Exclude the password from the response
            }
        });
    } catch (error) {
        console.error("Error verifying email:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};