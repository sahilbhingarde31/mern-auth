import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '7d', // Token expiration time
    }); // Generate a JWT token with the user ID and secret key

    res.cookie('token', token, {
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie and prevents from xss site scripting attacks
        secure: process.env.NODE_ENV === 'production', // Set to true in production
        sameSite: 'strict', // Prevents CSRF attacks
        maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration time (7 days)
    }); // Set the token in a cookie

    return token; // Return the generated token
}; // Export the function for use in other files

export default generateTokenAndSetCookie; // Export the function