import { useState } from "react";
import { resourcesLinks, platformLinks, communityLinks } from "../constants";
import { BrainCircuit, Twitter, Linkedin, Github, Youtube, Mail, ArrowRight } from 'lucide-react';

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      // Here you would typically send the email to your backend
    }
  };
  
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="flex items-center mb-4">
              <BrainCircuit size={28} className="text-teal-600 mr-2" />
              <span className="text-xl font-bold tracking-tight text-neutral-800">
                Neuro<span className="text-teal-600">Sure</span>
              </span>
            </div>
            <p className="text-neutral-600 mb-6 max-w-md">
              Advanced AI-powered platform for stroke prediction, prevention, and personalized neural health management.
            </p>
            
            {subscribed ? (
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-6 animate-fadeIn">
                <p className="text-teal-700 font-medium text-sm">
                  Thanks for subscribing! We'll keep you updated.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mb-6">
                <p className="text-sm font-medium text-neutral-700 mb-2">Subscribe to our newsletter</p>
                <div className="flex">
                  <div className="relative flex-grow">
                    <Mail size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                    <input
                      type="email"
                      placeholder="Your email"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-r-lg transition-colors flex items-center"
                  >
                    <span className="sr-only sm:not-sr-only sm:inline-block">Subscribe</span>
                    <ArrowRight size={16} className="sm:ml-1" />
                  </button>
                </div>
              </form>
            )}
            
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-teal-100 text-teal-700 hover:bg-teal-600 hover:text-white transition-colors shadow-sm">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-teal-100 text-teal-700 hover:bg-teal-600 hover:text-white transition-colors shadow-sm">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-teal-100 text-teal-700 hover:bg-teal-600 hover:text-white transition-colors shadow-sm">
                <Github size={18} />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-teal-100 text-teal-700 hover:bg-teal-600 hover:text-white transition-colors shadow-sm">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="text-md font-bold mb-6 text-neutral-800 flex items-center">
              <span className="w-6 h-0.5 bg-teal-500 rounded-full mr-3"></span>
              Resources
            </h3>
            <ul className="space-y-3">
              {resourcesLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-neutral-600 hover:text-teal-600 transition-colors flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-teal-500 opacity-0 group-hover:w-3 group-hover:opacity-100 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div className="lg:col-span-2">
            <h3 className="text-md font-bold mb-6 text-neutral-800 flex items-center">
              <span className="w-6 h-0.5 bg-teal-500 rounded-full mr-3"></span>
              Platform
            </h3>
            <ul className="space-y-3">
              {platformLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-neutral-600 hover:text-teal-600 transition-colors flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-teal-500 opacity-0 group-hover:w-3 group-hover:opacity-100 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div className="lg:col-span-2">
            <h3 className="text-md font-bold mb-6 text-neutral-800 flex items-center">
              <span className="w-6 h-0.5 bg-teal-500 rounded-full mr-3"></span>
              Community
            </h3>
            <ul className="space-y-3">
              {communityLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-neutral-600 hover:text-teal-600 transition-colors flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-teal-500 opacity-0 group-hover:w-3 group-hover:opacity-100 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div className="lg:col-span-2">
            <h3 className="text-md font-bold mb-6 text-neutral-800 flex items-center">
              <span className="w-6 h-0.5 bg-teal-500 rounded-full mr-3"></span>
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:contact@neurosure.com" className="text-neutral-600 hover:text-teal-600 transition-colors">
                  contact@neurosure.com
                </a>
              </li>
              <li className="text-neutral-600">
                123 Health Avenue
                <br />
                San Francisco, CA 94103
              </li>
              <li>
                <a href="tel:+18005551234" className="text-neutral-600 hover:text-teal-600 transition-colors">
                  +1 (800) 555-1234
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} NeuroSure. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex flex-wrap justify-center gap-6">
            <a href="#" className="text-sm text-neutral-500 hover:text-teal-600 transition-colors relative group">
              Privacy Policy
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#" className="text-sm text-neutral-500 hover:text-teal-600 transition-colors relative group">
              Terms of Service
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#" className="text-sm text-neutral-500 hover:text-teal-600 transition-colors relative group">
              Cookie Policy
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;