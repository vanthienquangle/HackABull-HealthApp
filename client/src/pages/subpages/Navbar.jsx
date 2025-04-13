/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { BrainCircuit, Menu, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  
  // Define navigation items to match your sections
  const navItems = [
    { id: "hero", label: "Home" },
    { id: "features", label: "Features" },
    { id: "about", label: "About Us" },
    { id: "cta", label: "Get Started" }
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
      
      // Determine active section for highlighting
      const sections = navItems.map(item => item.id);
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    document.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled, navItems]);

  const scrollToSection = (sectionId) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 py-3 backdrop-blur-md border-b transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 shadow-sm border-gray-200" 
          : "bg-transparent border-transparent"
      }`}
    >
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
              className="flex items-center group"
            >
              <div className="relative">
                <BrainCircuit size={32} className="text-teal-600 mr-2 transition-transform group-hover:scale-110" />
                <div className="absolute -inset-1 bg-teal-100 rounded-full blur-md opacity-0 group-hover:opacity-70 transition-opacity"></div>
              </div>
              <span className="text-xl font-bold tracking-tight text-neutral-800">
                Neuro<span className="text-teal-600">Sure</span>
              </span>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <ul className="hidden lg:flex ml-14 space-x-8 text-neutral-700">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`px-3 py-2 rounded-md transition-all relative hover:text-teal-600 ${
                    activeSection === item.id
                      ? "text-teal-600 font-medium"
                      : "text-neutral-700"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-500 rounded-full"></span>
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a 
              href="#about" 
              className="px-4 py-2 text-neutral-700 hover:text-teal-600 font-medium transition-colors"
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
            <Link to="/register" className="group px-5 py-2 bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-lg hover:shadow-md transition-all text-sm font-medium flex items-center">
              Get Started
              <ArrowRight size={14} className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            className="lg:hidden flex items-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <div className="relative w-10 h-10 flex items-center justify-center">
              {mobileMenuOpen ? (
                <X size={24} className="text-neutral-700 absolute transition-all duration-300 rotate-0" />
              ) : (
                <Menu size={24} className="text-neutral-700 absolute transition-all duration-300 rotate-0" />
              )}
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pt-4 pb-6 border-t mt-3 animate-fadeIn">
            <ul className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`block px-3 py-2 rounded-md transition-colors ${
                      activeSection === item.id
                        ? "bg-teal-50 text-teal-600 font-medium"
                        : "text-neutral-700 hover:text-teal-600 hover:bg-teal-50"
                    }`}
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
              <li className="pt-3 border-t mt-1">
                <div className="flex flex-col gap-3 mt-3">
                  <Link to="/login" className="w-full px-4 py-2.5 border border-teal-600 text-teal-700 rounded-lg hover:bg-teal-50 transition-colors text-sm font-medium text-center">
                    Sign In
                  </Link>
                  <Link to="/register" className="w-full text-center px-4 py-2.5 bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-lg hover:shadow-md transition-all text-sm font-medium flex items-center justify-center">
                    Get Started
                    <ArrowRight size={14} className="ml-1" />
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