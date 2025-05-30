import { motion } from "framer-motion"
import Input from "../components/Input";
import { ArrowLeft, Loader, Lock, Mail, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { toast } from "react-hot-toast";

const Profile = () => {
  const { user, fetchUser, updateProfile, isLoading, error } = useAuthStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  
  useEffect(() => {
    fetchUser();
  },[]);

  useEffect(() => {
    if(user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        password: '' // Password should not be pre-filled for security reasons
      }));
    }
  },[user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      toast.success("Profile updated successfully");
      setTimeout(() => {
        fetchUser(); // Refresh user data after update
      },1000);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
};
  return (
    <>
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 
         className="text-center text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text"
        >
            Profile
        </h2>
        <form onSubmit={handleSubmit}>
            <Input
            icon={User}
            name='name'
            type='text'
            placeholder='Name'
            value={formData.name}
            onChange={handleChange}
            />
            <Input
            icon={Mail}
            name='email'
            type='text'
            placeholder='Email'
            value={formData.email}
            onChange={handleChange}
            />
            <Input
            icon={Lock}
            name='password'
            type='text'
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
            />
            { error && <p className="text-red-500 text-sm mb-6">{error}</p>}
            <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white uppercase
            font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2
          focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
            >
                {isLoading ? <Loader className="animate-spin mx-auto size-8"/> : "Update Profile"}
            </motion.button>
        </form>
      </div>
    </motion.div>
      <motion.div 
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ delay: 0.4 }}
       className="px-8 py-4 mt-4 bg-gray-900 flex items-center justify-center rounded-2xl shadow-lg hover:bg-gray-500 transition duration-300">
            <Link to={"/"} className="text-sm text-green-400 flex items-center">
            <ArrowLeft className="size-4 mr-2"/> Back to Home
            </Link>
      </motion.div>
    </>
  )
}

export default Profile
