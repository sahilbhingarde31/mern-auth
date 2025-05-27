import User from "../models/userModel.js";
import crypto from "crypto";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";
import { sendFeedbackEmail, sendPasswordResetEmail, sendResetSuccessEmail, sendverificationcode, sendWelcomeEmail } from "../nodemailer/email.js";

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

// Function to handle user verifyEmail
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

// Function to handle user logout
export const logout = async (req, res) => {
    // Logic for user logout
    // 1. Clear the cookie
    // 2. Send a response to the client
    res.clearCookie("token"); // Clear the cookie
    res.status(200).json({ success: true, message: "Logged out successfully" });
};

// Function to handle user login
export const login = async (req, res) => {
    // Logic for user login
    // 1. Validate the request body
    // 2. Check if the user exists
    // 3. Check if the password is correct
    // 4. Generate a token and set it in a cookie
    // 5. Send a response to the client
    const { email, password } = req.body;
    try {
        if(!email || !password){
            return res.status(400).json({ success: false, message: "Please fill all the fields" });
        }
        const user = await User.findOne({ email }); // Check if the user exists
        if(!user) {
            return res.status(400).json({ success: false, message: "Invalid Credentials" });
        }
        const isPasswordCorrect = await bcryptjs.compare(password, user.password); // Check if the password is correct
        if(!isPasswordCorrect) {
            return res.status(400).json({ success: false, message: "Invalid Credentials" });
        }
        generateTokenAndSetCookie(res, user._id); // Generate a token and set it in a cookie
        user.lastLogin = Date.now(); // Update the last login time
        await user.save(); // Save the user to the database
        res.status(200).json({
            success: true, 
            message: "Login successfully",
            user:{
                ...user._doc,
                password:undefined, // Exclude the password from the response
            }
        }); // Send a response to the client
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// Function to handle forgot password and send reset token to user's email
export const forgotPassword = async (req, res) => {
    // Logic for forgot password
    // 1. Validate the request body
    // 2. Check if the user exists
    // 3. Generate a password reset token
    // 4. Send the password reset token to the user's email
    // 5. Send a response to the client
    const { email } = req.body;
    try {
        if(!email){
            return res.status(400).json({ success: false, message: "Please provide an email" });
        }
        const user = await User.findOne({ email }); // Check if the user exists
        if(!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
        const resetToken = crypto.randomBytes(20).toString("hex"); // Generate a password reset token
        const resetTokenExpiresAt = Date.now() + 10 * 60 * 1000; // Set the expiration time for the password reset token
        user.resetpasswordToken = resetToken; // Store the password reset token in the database
        user.resetpasswordTokenExpiresAt = resetTokenExpiresAt; // Store the expiration time for the password reset token

        await user.save(); // Save the user to the database
        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`); // Send the password reset token to the user's email

        res.status(200).json({ success: true, message: "Password reset link sent to your email" }); // Send a response to the client
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Function to handle password reset
export const resetPassword = async (req, res) => {
    // Logic for resetting the password
    // 1. Validate the request body
    // 2. Check if the user exists
    // 3. Check if the password reset token is valid
    // 4. Hash the new password
    // 5. Update the user's password in the database
    // 6. Send a response to the client
    try {
        const { token } = req.params; // Get the token from the request parameters
        const { password } = req.body; // Get the new password from the request body
        const user = await User.findOne({
            resetpasswordToken: token, //store the password reset token in the database
            resetpasswordTokenExpiresAt: { $gt: Date.now() }, // Check if the token is valid
        });
        if(!user){
            return res.status(400).json({ success: false, message: "Invalid or expired password reset token" });
        }
        const hashedPassword =await bcryptjs.hash(password, 10); // Hash the new password
        user.password = hashedPassword; // Update the user's password in the database
        user.resetpasswordToken = undefined; // Remove the password reset token
        user.resetpasswordTokenExpiresAt = undefined; // Remove the expiration time for the password reset token
        await user.save(); // Save the user to the database
        await sendResetSuccessEmail(user.email, user.name); // Send a success email to the user
        res.status(200).json({ success: true, message: "Password reset successfully" }); // Send a response to the client
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Function to check if the user is authenticated
export const checkAuth = async (req, res) => {
    try {
        // Validate that userId exists
        if (!req.userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        // Find the user in the database and exclude password
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Send successful response
        res.status(200).json({ success: true, message: "User is authenticated", user });
    } catch (error) {
        console.error("Error in checkAuth:", error); // Log error for debugging
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
};

export const feedback = async (req, res) => {
    // Logic for handling feedback
    // 1. Validate the request body
    // 2. Send the feedback to the admin's email
    // 3. Send a response to the client
    const { name, email, text } = req.body;
    try {
        if(!name || !email || !text) {
            return res.status(400).json({ success: false, message: "Please fill all the fields" });
        }
        await sendFeedbackEmail(name, email, text); // Send the feedback to the admin's email
        res.status(200).json({ success: true, message: "Feedback sent successfully" }); // Send a response to the client
    } catch (error) {
        console.error("Error sending feedback:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};