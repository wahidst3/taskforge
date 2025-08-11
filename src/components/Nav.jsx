import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { MenuIcon, User2Icon } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../utilis/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "./Comp.css"; // Assuming you have a CSS file for styles

export default function GlassNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const user= auth.currentUser;  
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth).then(() => {
      toast.success('You have been signed out successfully',{
        autoClose:2000
      });
      localStorage.removeItem('taskforge_guest_login'); // Clear local storage if needed
      setIsOpen(false);

      navigate('/');
      }).catch((error) => {
        toast.error('Error signing out')
        });
        };
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg   shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-2">
        <div className="flex items-center justify-between">
          {/* Text Logo - Left */}
          <div className="flex items-center">
            <img
              src="/vite.svg"
              alt="Vite Logo"
              className="h-8 w-8 mr-2"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              TaskForge
            </span>
          </div>
<div className='flex items-center gap-4 '>
          {/* Get Started Button - Right */}
          <Link
           to="/" // Navigate to home page first
  onClick={(e) => {
    // Only prevent default if we're already on home page
    if (window.location.pathname === '/') {
      e.preventDefault();
      const heroElement = document.getElementById('hero');
      if (heroElement) {
        heroElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
    // Otherwise, let the Link navigate to home page normally
  }}
            className="flex min-[250px]:max-[640px]:hidden items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2 text-white font-medium hover:shadow-lg transition-all hover:scale-[1.02]"
          >
            Get Started
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
          <div className='flex items-center gap-2 text-slate-400 hover:text-white transition-colors bg-gradient-to-br from-indigo-600/80 to-pink-500/80 rounded-full p-2 cursor-pointer'>
          <User2Icon className='text-white font-bold min-[250px]:max-[640px]:hidden'  onClick={()=>setIsOpen(!isOpen)}/>
            <MenuIcon className='text-white font-bold hidden min-[250px]:max-[640px]:block' onClick={()=>setIsOpen(!isOpen)}/>
          </div>
          </div>
        </div>
      </div>
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute md:right-10 sm:right-7 min-[250px]:max-[640px]:right-10 min-[250px]:max-[640px]:w-24 top-16 right-28 cursor-pointer bg-white shadow-md rounded-md p-4 w-48">
  
          <ul className="space-y-2">
            <li>
               <Link
           to="/" // Navigate to home page first
  onClick={(e) => {
    // Only prevent default if we're already on home page
    if (window.location.pathname === '/') {
      e.preventDefault();
      const heroElement = document.getElementById('hero');
      if (heroElement) {
        heroElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
    // Otherwise, let the Link navigate to home page normally
  }}
              className="hidden min-[250px]:max-[640px]:block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Home
              </Link>
              </li>

            
          { user? 
              <li
                to="/ds"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={()=>handleSignOut()}
              >
                Logout
              </li>: ""
              // <li
              //   to="/ds"
              //   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                
              // >
              //   Login
              // </li>
               }
          
         
          </ul>
        </div>
      )}
    </nav>
  );
}