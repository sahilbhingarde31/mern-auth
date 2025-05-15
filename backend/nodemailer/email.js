import { VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from "./emailTemplate.js";
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