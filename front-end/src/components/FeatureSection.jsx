// FeatureSection.jsx
import { features } from "../constants";
import { ArrowRight } from 'lucide-react'; 

const FeatureSection = () => {
  return (
    <div id="features" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="bg-teal-100 text-teal-700 rounded-full text-sm font-medium px-4 py-1.5 inline-block mb-4">
            FEATURES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-800 max-w-4xl mx-auto">
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
            <div key={index} className="bg-white rounded-xl p-6 transition-all hover:shadow-md border border-gray-100 hover:border-teal-100 group">
              <div className="w-14 h-14 bg-teal-100 text-teal-700 rounded-lg flex items-center justify-center mb-5 group-hover:bg-teal-600 group-hover:text-white transition-all">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-3">
                {feature.text}
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="#learn-more" 
            className="inline-flex items-center text-teal-600 font-medium hover:text-teal-700"
          >
            Explore all features
            <ArrowRight size={16} className="ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
};


export default FeatureSection