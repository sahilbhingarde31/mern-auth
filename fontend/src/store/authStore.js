import { create } from 'zustand'; // state management library 
import axios from 'axios';

const API_URL = import.meta.env.MODE === "development" ? 'http://localhost:5000/api/auth' : "/api/auth"; // API URL based on the environment mode
axios.defaults.withCredentials = true;
const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true ,
    message: null,

    signup: async(name ,email, password) =>{
        set({isLoading: true, error: null});
        try {
            const response = await axios.post(`${API_URL}/signup`,
                {
                    name,
                    email,
                    password
                }
            );
            set({ user: response.data.user, isAuthenticated: true, isLoading: false});
        } catch (error) {
            set({error: error.response.data.message || "Error signing up", isLoading: false});
            throw error;
        }
    },

    login: async(email, password) =>{
        set({isLoading: true, error: null});
        try {
            const response = await axios.post(`${API_URL}/login`,
                {
                    email,
                    password
                }
            );
            set({ user:response.data.user, isAuthenticated: true,error: null, isLoading: false});
        } catch (error) {
            set({error: error.response?.data?.message || "Error logging in", isLoading: false});
            throw error;
        }
    },

    logout: async() =>{
        set({isLoading: true, error: null})
        try {
            await axios.post(`${API_URL}/logout`);
            set({user: null, isAuthenticated: false, isLoading: false, error: null});
        } catch (error) {
            set({ error: "error logging out", isLoading:false});
            throw error;
        }
    },

    verifyEmail: async(code) => {
        set({isLoading: true, error: null});
        try {
            const response = await axios.post(`${API_URL}/verify-email`,{ 
                code
            });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false});
            return response.data;
        } catch (error) {
            set({ error: error.response.data.message || "Error Verifying Email", isLoading: false});
            throw error;
        }
    },

    checkAuth: async() => {
        set({ isCheckingAuth: true, error: null});
        try {
            const response = await axios.get(`${API_URL}/check-auth`);
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false});
        } catch (error) {
            set({ error: null, isCheckingAuth: false, isAuthenticated: false});
            throw error;
        }
    },

    forgotPassword: async(email) => {
        set({ isLoading: true, error: null, message: null});
        try {
            const response = await axios.post(`${API_URL}/forgot-password`,{
                email
            });
            set({ user:response.data.message, isLoading: false})
        } catch (error) {
            set({ isLoading: false, error: error.response.data.message || "Error sending reset password email"});
            throw error;
        }
    },

    resetPassword: async(token, password) =>{
        set({isLoading: true, error: null});
        try {
            const response = await axios.post(`${API_URL}/reset-password/${token}`,{
                password
            });
            set({message:response.data.message, isLoading: false});
        } catch (error) {
            set({isLoading: false, error: error.response.data.message || "Error resetting password"})
        }
    },

    feedback: async(name, email, text) => {
        set({isLoading: true, error: null});
        try {
            const response = await axios.post(`${API_URL}/feedback`, {
                name,
                email,
                text
            });
            set({message: response.data.message, isLoading: false});
        } catch (error) {
            set({error: error.response.data.message || "Error sending feedback", isLoading: false});
            throw error;
        }
    },

    feedbackEmail: async(name, email, text) => {
        set({isLoading: true, error: null});
        try {
            const response = await axios.post(`${API_URL}/feedback-email`, {
                name,
                email,
                text
            });
            set({message: response.data.message, isLoading: false});
        } catch (error) {
            set({error: error.response.data.message || "Error sending feedback email", isLoading: false});
            throw error;
        }
    },

    fetchUser: async() => {
        set({isLoading: true, error: null});
        try {
            const response = await axios.get(`${API_URL}/update-profile`);
            set({ user: response.data.user, isLoading: false });
        } catch (error) {
            set({error: error.response?.data?.message || error.message, isLoading: false});
        }
    },

    updateProfile: async(updatedData) =>{
        set({isLoading:true, error: null});
        try {
            const response = await axios.put(`${API_URL}/update-profile`, updatedData);
            set({user: response.data.user, isLoading: false, error: null, isAuthenticated: true});
            return response.data;
        } catch (error) {
            set({error: error.response?.data?.message || "Error updating profile", isLoading: false});
        }
    }
}));

export default useAuthStore;