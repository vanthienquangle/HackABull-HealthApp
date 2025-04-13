// Navbar.jsx
import { useState, useEffect } from "react";
import { navItems } from "../constants";
import { BrainCircuit, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom'; // For page navigation

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Function to handle smooth scrolling to sections
  const scrollToSection = (sectionId) => {
    setMobileMenuOpen(false); // Close mobile menu if open
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`sticky top-0 z-50 py-3 backdrop-blur-md border-b transition-all duration-300 ${
      scrolled ? "bg-white/90 shadow-sm" : "bg-transparent border-transparent"
    }`}>
      <div className="container px-4 mx-auto">
        <div className="flex justify-between items-center">
          
          {/* Logo and Name */}
          <div className="flex items-center">
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center"
            >
              <BrainCircuit size={32} className="text-teal-600 mr-2" />
              <span className="text-xl font-bold tracking-tight text-neutral-800">
                Neuro<span className="text-teal-600">Sure</span>
              </span>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <ul className="hidden lg:flex ml-14 space-x-12 text-neutral-700">
            {navItems.map((item, index) => (
              <li key={index}>
                <a
                  href={`#${item.id}`}
                  className="hover:text-teal-600 transition-colors font-medium px-2 py-1 rounded-md hover:bg-teal-50"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a 
              href="#about" 
              className="px-4 py-2 text-neutral-700 hover:text-teal-600 font-medium"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('about');
              }}
            >
              About Us
            </a>
            <Link to="/login" className="px-5 py-2 border border-teal-600 text-teal-700 rounded-lg hover:bg-teal-50 transition-colors text-sm font-medium shadow-sm">
              Sign In
            </Link>
            <Link to="/register" className="px-5 py-2 bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-lg hover:shadow-md transition-all text-sm font-medium">
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            className="lg:hidden flex items-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X size={24} className="text-neutral-700" />
            ) : (
              <Menu size={24} className="text-neutral-700" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pt-4 pb-3 border-t mt-3">
            <ul className="flex flex-col space-y-3">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={`#${item.id}`}
                    className="block px-2 py-2 text-neutral-700 hover:text-teal-600 hover:bg-teal-50 rounded-md"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.id);
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              
              {/* Mobile auth buttons */}
              <li className="pt-2 border-t">
                <div className="flex flex-col gap-2 mt-2">
                  <Link to="/login" className="w-full px-4 py-2 border border-teal-600 text-teal-700 rounded-lg hover:bg-teal-50 transition-colors text-sm font-medium text-center">
                    Sign In
                  </Link>
                  <Link to="/register" className="w-full text-center px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-lg hover:shadow-md transition-all text-sm font-medium">
                    Get Started
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;