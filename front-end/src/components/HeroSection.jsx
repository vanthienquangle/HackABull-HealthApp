// HeroSection.jsx
import { ArrowRight, Activity, Shield, Heart } from 'lucide-react';
import landingPic from '../assets/landingPic.jpg';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white pt-16 pb-24 px-4 sm:px-6">
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-5"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 text-center lg:text-left lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          <div className="lg:col-span-6 lg:pr-8 mb-12 lg:mb-0">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-800">
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
                className="bg-gradient-to-r from-teal-500 to-teal-700 text-white py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center font-medium"
              >
                Get Started Free
                <ArrowRight size={18} className="ml-2" />
              </a>
              <a
                href="#how-it-works"
                className="py-3 px-6 rounded-lg border-2 border-teal-600 text-teal-700 hover:bg-teal-50 transition-colors font-medium flex items-center justify-center"
              >
                How It Works
              </a>
            </div>
            
            <div className="mt-12 grid grid-cols-3 gap-4">
              <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 flex items-center">
                <Activity size={20} className="text-teal-600 mr-2" />
                <span className="text-sm font-medium">
                  99% Accuracy
                </span>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 flex items-center">
                <Shield size={20} className="text-teal-600 mr-2" />
                <span className="text-sm font-medium">
                  HIPAA Compliant
                </span>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 flex items-center">
                <Heart size={20} className="text-teal-600 mr-2" />
                <span className="text-sm font-medium">
                  MD Approved
                </span>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-6 relative">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-teal-100 rounded-full blur-3xl opacity-30"></div>
            <div className="absolute -left-5 -bottom-10 w-40 h-40 bg-teal-200 rounded-full blur-3xl opacity-30"></div>
            
            <div className="relative bg-white p-3 rounded-2xl shadow-lg transform hover:scale-[1.02] transition-all">
              <img 
                src={landingPic} 
                alt="NeuroSure Dashboard" 
                className="rounded-xl w-full h-full object-cover shadow-inner"
              />
              
              <div className="absolute -bottom-5 -right-5 bg-white rounded-lg shadow-lg p-4 flex items-center">
                <div className="bg-teal-500 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  <Activity size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-neutral-500 font-medium">Risk Score</p>
                  <p className="text-base font-bold text-teal-600">87% Lower</p>
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
