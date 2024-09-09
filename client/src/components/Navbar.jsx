import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X,  Home, UserPlus, LogIn, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const getNavLinkClass = (path) => {
    return location.pathname === path
      ? 'text-teal-300 font-bold'
      : 'text-white hover:text-teal-300 transition-colors duration-200';
  };

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/signup', label: 'Sign Up', icon: UserPlus },
    { path: '/signin', label: 'Sign In', icon: LogIn },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/95 shadow-lg' : 'bg-gray-900'}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center text-2xl font-bold text-white hover:text-teal-300 transition-colors duration-200">
            <ShoppingBag className="h-8 w-8 mr-2" />
            <span>Marketplace</span>
          </Link>
          <div className="hidden md:flex md:items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${getNavLinkClass(item.path)} text-lg flex items-center`}
              >
                <item.icon className="h-5 w-5 mr-2" />
                {item.label}
              </Link>
              
            ))}
            
          </div>
          <div className="md:hidden">
            <button
              className="p-2 rounded-md text-white hover:bg-gray-800 transition-colors duration-200"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-gray-900 shadow-lg"
          >
            <div className="container mx-auto px-6 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`${getNavLinkClass(item.path)} flex items-center py-2 text-lg`}
                  onClick={toggleMenu}
                >
                  <item.icon className="h-5 w-5 mr-2" />
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}