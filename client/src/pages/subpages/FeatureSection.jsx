import { useState } from "react";
import { features } from "../constants";
import { ArrowRight } from 'lucide-react';

function FeatureSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div id="features" className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="bg-teal-100 text-teal-700 rounded-full text-sm font-medium px-4 py-1.5 inline-block mb-4">
            FEATURES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-800 max-w-4xl mx-auto leading-tight">
            Empower better health with{" "}
            <span className="bg-gradient-to-r from-teal-500 to-teal-700 text-transparent bg-clip-text">
              smarter tools
            </span>
          </h2>
          <p className="mt-6 text-lg text-neutral-600 max-w-3xl mx-auto">
            Our platform combines advanced AI with medical expertise to help you understand
            and reduce your stroke risk through personalized insights and practical actions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-8 transition-all duration-300 border border-gray-100 hover:border-teal-100 group relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-teal-100 text-teal-700 rounded-lg flex items-center justify-center mb-6 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-bold text-neutral-800 mb-3 group-hover:text-teal-700 transition-colors duration-300">
                  {feature.text}
                </h3>
                
                <p className="text-neutral-600 leading-relaxed mb-4">
                  {feature.description}
                </p>
                
                <a 
                  href={`#feature-${index}`} 
                  className="inline-flex items-center text-teal-600 font-medium transition-all duration-300 group-hover:opacity-100"
                >
                  Learn more
                  <ArrowRight size={16} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
              
              {/* Bottom decoration */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-teal-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="#learn-more" 
            className="inline-flex items-center text-white font-medium bg-teal-600 hover:bg-teal-700 px-6 py-3 rounded-lg transition-colors duration-300 group shadow-sm hover:shadow-md"
          >
            Explore all features
            <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;