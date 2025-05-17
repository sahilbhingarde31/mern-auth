import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from "./emailTemplate.js";
import { transporter } from "./nodemailer.config.js";
import dotenv from "dotenv";

dotenv.config();
export const sendverificationcode = async(email, verificationCode)=> {
    try {
        const response = await transporter.sendMail({
                from:"Auth Company" + process.env.SENDER_EMAIL_USER ,
                to: email,
                subject: "verify email",
                text: "verify your email",
                html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationCode),
            });
             console.log("Email sent successfully:", response.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

export const sendWelcomeEmail = async(email, name) => {
    try {
        const response = await transporter.sendMail({
            from: "Auth Company" + process.env.SENDER_EMAIL_USER,
            to: email,
            subject: "Welcome to Our Service",
            text: `Hello ${name}, welcome to our service!`,
            html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name),
        });
         console.log("Welcome Email sent successfully:", response.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

export const sendPasswordResetEmail = async(email, resetURL) => {
    try {
        const response = await transporter.sendMail({
            from: "Auth Company" + process.env.SENDER_EMAIL_USER,
            to: email,
            subject: "Reset Your Password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset",
        });
        console.log("Password Reset Email sent successfully:", response.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(400).json({ success: false, message: "error sending password reset email:",error }); 
    }
};

export const sendResetSuccessEmail = async(email, name) => {
    try {
        const response = await transporter.sendMail({
            from: "Auth Company" + process.env.SENDER_EMAIL_USER,
            to: email,
            subject: "Password Reset Successful",
            text: "Your password has been reset successfully.",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE.replace("{name}", name),
            category: "Password Reset Success",
        });
        console.log("Password Reset Success Email sent successfully:", response.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(400).json({ success: false, message: error.message });
    }
};