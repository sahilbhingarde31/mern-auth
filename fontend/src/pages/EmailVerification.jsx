import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import useAuthStore from "../store/authStore.js";
import toast from "react-hot-toast";
import { Loader2 } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
    const [code, setCode] = useState(["","","","","",""]);
    const inputRefs = useRef([]);
    const { verifyEmail, error, isLoading } = useAuthStore();
    const navigate = useNavigate();

    const handleChange = (index, value) => {
        const newCode = [...code];

        // Handle pasted content
        if (value.length > 1) {
            const pastedCode = value.slice(0,6).split("");
            for(let i = 0; i < 6; i++){
                newCode[i] = pastedCode[i] || "";
            }
            setCode(newCode);

            // Focus on the last non-empty input or the first empty one
            const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
            inputRefs.current[focusIndex].focus();
        } else {
            newCode[index] = value;
            setCode(newCode);

            // Move focus to the next input field if value is entered
            if(value && index < 5){
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };
    useEffect(() => {
        if(code.every(digit => digit !== '')){
            handleSubmit(new Event('submit'));
        }
    },[code]);
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        const verificationCode = code.join("");
        try {
            await verifyEmail(verificationCode);
            navigate("/");
            toast.success("Email Verify Successfully");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md"
            >
                <h2 className="text-center font-bold text-3xl mb-5 p-1 bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text capitalize">
                    Verify Your Email
                </h2>
                <p className="text-center text-white text-sm">
                    Enter the 6-digit code sent to your email address.
                </p>
                <form onSubmit={handleSubmit} className="space-y-6 p-2">
                    <div className="flex justify-between">
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type="text"
                                maxLength='6'
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="size-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-green-500 focus:outline-none"
                            />
                        ))}
                    </div>
                    {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 font-bold text-white py-3 px-4 rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50"
                    >
                        {isLoading ? <Loader2 className='animate-spin mx-auto' size={24}/> : "Verify Email"}
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default EmailVerification;