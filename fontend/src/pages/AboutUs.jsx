import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

const AboutUs = () => {
  return (
    <div className='flex gap-5'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity:1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
       >
            <div className="p-8">
                <h2 className='text-center text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
                    About Us
                </h2>
                <p className='text-gray-300 mb-4'>
                    Welcome to our authentication service! We are dedicated to providing secure and reliable authentication solutions for your applications. Our mission is to simplify user management while ensuring the highest level of security.
                </p>
                <p className='text-gray-300 mb-4'>
                    Our team consists of experienced developers and security experts who are passionate about creating a seamless user experience without compromising on security. We believe in transparency, and our code is open-source, allowing you to review and contribute to our project.
                </p>
                <p className='text-gray-300'>
                    Thank you for choosing our service. We look forward to helping you build secure applications!
                </p>
            </div>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className=" p-2 h-10 bg-gray-900 flex items-center justify-center rounded-2xl shadow-lg hover:bg-gray-500 transition duration-300"
       >
        <Link to={"/"} className="text-sm text-green-400 flex items-center">
        <ArrowLeft className="size-4 mr-2"/> Back to Home
        </Link>
      </motion.div>
    </div>
  )
}

export default AboutUs
