import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='bg-gradient-to-r from-green-600 to-emerald-700 sticky top-0 backdrop-blur-md shadow-md z-50'>
      <div className="flex items-center justify-between max-w-6xl mx-auto p-3">
        <Link to='/'>
          <img src="./assest/shield.png" alt="companylogo" className="w-20 h-15" />
        </Link>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-green-300 to-emerald-400 text-transparent bg-clip-text">Auth Company</h1>

        {/* Animated Hamburger Menu Button */}
        <div 
          className={`sm:hidden cursor-pointer  transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="text-red-600 size-9"/> : <Menu className="size-9"/>}
        </div>

        {/* Navigation Menu */}
        {isOpen ? (
          <ul className="cursor-pointer absolute top-24 right-0 bg-gradient-to-r from-green-600 to-emerald-700 w-full sm:flex sm:flex-col text-center p-4 shadow-lg text-white transition-opacity duration-300">
            <li className="mb-1 font-semibold hover:text-green-300"><Link to="/">Home</Link></li>
            <li className="mb-1 font-semibold hover:text-green-300"><Link to="/about-us">About Us</Link></li>
            <li className="font-semibold hover:text-green-300"><Link to="/feedback">Feedback</Link></li>
          </ul>
        ) : (
          <ul className="cursor-pointer hidden sm:flex space-x-6 text-white">
            <li className="font-semibold hover:text-green-300"><Link to="/">Home</Link></li>
            <li className="font-semibold hover:text-green-300"><Link to="/about-us">About Us</Link></li>
            <li className="font-semibold hover:text-green-300"><Link to="/feedback">Feedback</Link></li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Header;