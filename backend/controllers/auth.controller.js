import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail } from "../mailtrap/emails.js";

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
        await user.save(); // Save the user to the database

        generateTokenAndSetCookie(res, user._id); // Generate a token and set it in a cookie
        await sendVerificationEmail(user.email, verificationToken); // Send the verification email 
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