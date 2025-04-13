import { useState, useEffect } from 'react';
import { ArrowRight, Activity, Shield, Heart, PlayCircle } from 'lucide-react';
import landingPic from '../sub_assets/landingPic.jpg';

function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white pt-24 pb-20 px-4 sm:px-6">
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-5"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-50 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-50 rounded-full blur-3xl opacity-30"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className={`relative z-10 text-center lg:text-left lg:grid lg:grid-cols-12 lg:gap-8 items-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="lg:col-span-6 lg:pr-8 mb-12 lg:mb-0">
            <div className="inline-block mb-4 px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm font-medium animate-pulse">
              AI-Powered Health Revolution
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-800 leading-tight">
              Prevent strokes before they happen{" "}
              <span className="bg-gradient-to-r from-teal-500 to-teal-700 text-transparent bg-clip-text">
                with AI that cares
              </span>
            </h1>

            <p className="mt-6 text-lg text-neutral-600 max-w-3xl lg:max-w-none">
              We help individuals stay ahead of stroke risk through AI-driven prediction,
              personalized health recommendations, and daily habit support — turning awareness
              into action for a healthier future.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
              <a
                href="/register"
                className="group bg-gradient-to-r from-teal-500 to-teal-700 text-white py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center font-medium overflow-hidden relative"
              >
                <span className="z-10 flex items-center">
                  Get Started Free
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </a>
              
              <div className="flex items-center space-x-4">
                <a
                  href="#how-it-works"
                  className="py-3 px-6 rounded-lg border-2 border-teal-600 text-teal-700 hover:bg-teal-50 transition-colors font-medium flex items-center justify-center"
                >
                  How It Works
                </a>
                
                <a href="#demo" className="hidden md:flex items-center text-teal-700 hover:text-teal-600 font-medium">
                  <PlayCircle size={20} className="mr-2" />
                  Watch Demo
                </a>
              </div>
            </div>
            
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 flex items-center hover:border-teal-200 hover:shadow-md transition-all">
                <div className="p-2 bg-teal-50 rounded-md mr-3">
                  <Activity size={20} className="text-teal-600" />
                </div>
                <span className="text-sm font-medium">
                  99% Accuracy
                </span>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 flex items-center hover:border-teal-200 hover:shadow-md transition-all">
                <div className="p-2 bg-teal-50 rounded-md mr-3">
                  <Shield size={20} className="text-teal-600" />
                </div>
                <span className="text-sm font-medium">
                  HIPAA Compliant
                </span>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 flex items-center hover:border-teal-200 hover:shadow-md transition-all">
                <div className="p-2 bg-teal-50 rounded-md mr-3">
                  <Heart size={20} className="text-teal-600" />
                </div>
                <span className="text-sm font-medium">
                  MD Approved
                </span>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-6 relative">
            <div className="absolute -right-10 -top-10 w-64 h-64 bg-teal-100 rounded-full blur-3xl opacity-30"></div>
            <div className="absolute -left-5 -bottom-10 w-64 h-64 bg-teal-200 rounded-full blur-3xl opacity-30"></div>
            
            <div className="relative bg-white p-3 rounded-2xl shadow-lg transform hover:scale-[1.02] transition-all duration-500 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-teal-700/20 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
              
              <img 
                src={landingPic} 
                alt="NeuroSure Dashboard" 
                className="rounded-xl w-full h-full object-cover shadow-inner"
              />
              
              {/* Floating elements */}
              <div className="absolute -bottom-5 -right-5 bg-white rounded-lg shadow-lg p-4 flex items-center animate-float">
                <div className="bg-teal-500 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <Activity size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-neutral-500 font-medium">Risk Score</p>
                  <p className="text-base font-bold text-teal-600">87% Lower</p>
                </div>
              </div>
              
              <div className="absolute -top-5 -left-5 bg-white rounded-lg shadow-lg p-3 animate-float2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <p className="text-xs font-medium">Daily Activity Tracked</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
};

export default HeroSection;