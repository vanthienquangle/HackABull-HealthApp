import { features } from "../constants";

const FeatureSection = () => {
  return (
    <div className="relative mt-8 border-b border-gray-200 bg-gray-50 py-10 px-4">
      <div className="text-center">
        <span className="bg-teal-100 text-teal-700 rounded-full h-6 text-sm font-medium px-3 py-1 uppercase tracking-wider">
          Features
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-4 lg:mt-8 tracking-tight text-neutral-800">
          Empower better health with{" "}
          <span className="bg-gradient-to-r from-teal-500 to-teal-700 text-transparent bg-clip-text">
            smarter tools
          </span>
        </h2>
      </div>

      <div className="flex flex-wrap mt-10 justify-center max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-6 mb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-12 w-12 p-3 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center shadow-sm">
                {feature.icon}
              </div>
              <div className="ml-4">
                <h5 className="text-lg font-semibold text-neutral-800 mb-2">
                  {feature.text}
                </h5>
                <p className="text-md text-neutral-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
};

export default FeatureSection;
