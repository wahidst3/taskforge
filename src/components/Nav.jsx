import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
export default function GlassNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg   shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-2">
        <div className="flex items-center justify-between">
          {/* Text Logo - Left */}
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              TaskForge
            </span>
          </div>

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
            className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5 text-white font-medium hover:shadow-lg transition-all hover:scale-[1.02]"
          >
            Get Started
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </nav>
  );
}