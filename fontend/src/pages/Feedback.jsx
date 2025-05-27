
import { motion } from 'framer-motion';
import { useState } from 'react';
import Input from '../components/Input';
import {  Loader, Mail, Text, User } from 'lucide-react';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Feedback = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const {feedback, error, isLoading, feedbackEmail} = useAuthStore();
  const navigate = useNavigate();
  const HandleSubmit = async(e) => {
    e.preventDefault();
    try {
      await feedback(name, email, text);
      setName('');
      setEmail('');
      setText('');
      toast.success('Feedback submitted successfully');
      setTimeout( async()=>{
        await feedbackEmail(name, email, text);
        toast.success('Feedback email sent successfully');
        useAuthStore.setState({ isLoading: false }); 
      }, 1000);
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error submitting feedback');
    }
  }
  return (
    <motion.div
    initial= {{opacity: 0,y:20}}
     animate={{opacity: 1, y:0}}
     transition={{duration: 0.5}}
     className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
    >
      <div className="p-8">
        <h2 className='text-center mb-6 font-bold text-3xl bg-gradient-to-r from-green-500 to-emerald-600 text-transparent bg-clip-text'>Feedback Form</h2>
        <form onSubmit={HandleSubmit}>
          <Input
          icon={User}
          type='text'
          placeholder='Name'
          value={name}
          onChange = {(e) => setName(e.target.value)}
          required
          />
          <Input
          icon={Mail}
          type='email'
          placeholder='Email'
          value={email}
          onChange = {(e) => setEmail(e.target.value)}
          required
          />
          <Input
          icon={Text}
          type='text'
          placeholder='your feedback'
          value={text}
          onChange = {(e) => setText(e.target.value)}
          required
          />
          {error && <p className='text-red-500 text-sm'>{error}</p>}
          <motion.button
          whileHover={{ scale: 1.02}}
          whileTap={{ scale: 0.98}}
          className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white uppercase
          font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2
          focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
          type="submit"
          disabled={isLoading}
          >
            {isLoading ? <Loader className='animate-spin mx-auto size-6'/> : 'Submit Feedback'}
          </motion.button>
        </form>
      </div>
    </motion.div>
  )
}

export default Feedback
