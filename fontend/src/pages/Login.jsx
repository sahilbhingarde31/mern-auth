import { motion } from "framer-motion"
import Input from "../components/Input";
import { Loader, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore.js";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login, error, isLoading} = useAuthStore();
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      await login(email,password);
      toast.success("Login Successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <motion.div
    initial = {{ opacity: 0, y: 20}}
    animate = {{opacity: 1, y: 0}}
    transition={{ duration: 0.5}}
    className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-center text-3xl capitalize font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          login 
        </h2>
        <form onSubmit={handleSubmit}>
          <Input
          icon={Mail}
          type='email'
          placeholder='Email'
          value={email}
          onChange = {(e) => setEmail(e.target.value)}
          />
          <Input
          icon={Lock}
          type='password'
          placeholder='Password'
          value={password}
          onChange = {(e) => setPassword(e.target.value)}
          />
          <div className="flex items-center mb-6">
            <Link 
             className="text-sm text-green-400 hover:underline" 
             to={'/forgot-password'}
             >
              forgot password?
            </Link>
          </div>
          {error && <p className="text-red-500 font-semibold mb-2">{error}</p>}
          <motion.button
          whileHover={{ scale: 1.02}}
          whileTap={{ scale: 0.98}}
          className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white uppercase
          font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2
          focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
          type="submit"
          >
            {isLoading ? <Loader className="animate-spin mx-auto" size={24}/> : "login"}
          </motion.button>
        </form>
      </div>
        <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex gap-2 items-center">
          <p className="text-sm text-gray-400">
            Don't have an account?
          </p>
            <p className="text-sm text-gray-400 hover:underline hover:text-green-600 capitalize">
            <Link to={'/signup'}
             >
              sign up
            </Link>
            </p>
        </div>
    </motion.div>
  )
}

export default Login
