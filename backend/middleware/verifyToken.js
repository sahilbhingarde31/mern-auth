import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token; // Get the token from cookies
    if(!token){
        return res.status(401).json({ success: false, message: "Unauthorized - no token provided" }); // If no token, return unauthorized
    } // Check if token is provided
    
    try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    if(!decoded){
        return res.status(401).json({ success: false, message: "Unauthorized - Invalid token" }); // If token is invalid, return unauthorized
    }
    req.userId = decoded.userId; // Get the user ID from the token
    next(); // Call the next middleware
} catch (error) {
    console.error("Token verification error:", error); // Log the error
    return res.status(500).json({ success: false, message: "Internal Server Error" }); // If an error occurs, return internal server error
}
};