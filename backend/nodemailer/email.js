import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate.js";
import { transporter } from "./nodemailer.config.js";


export const sendverificationcode = async(email, verificationCode)=> {
    try {
        const response = await transporter.sendMail({
                from:'"Auth Company" "<sahilbhingarde18@gmail.com>"',
                to: email,
                subject: "verify email",
                text: "verify your email",
                html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationCode),
            });
            return res.status(200).json({sucess: true, message: "verification code sent successfully", response});
    } catch (error) {
        console.error("Error sending email:", error);
    }
}