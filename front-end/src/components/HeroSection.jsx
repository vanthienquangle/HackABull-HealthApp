import landingPic from '../assets/landingPic.jpg'

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center mt-1 lg:mt-5 bg-gray-50 px-1 pb-10 border-b border-gray-200">
    <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide text-neutral-800 mt-4">
      Prevent strokes before they happen{" "}
      <span className="bg-gradient-to-r from-teal-500 to-teal-700 text-transparent bg-clip-text">
        with AI that cares
      </span>
    </h1>

    <p className="mt-6 text-lg text-center text-neutral-600 max-w-4xl">
      We help individuals stay ahead of stroke risk through AI-driven prediction,
      personalized health recommendations, and daily habit support — turning awareness
      into action for a healthier future.
    </p>

    <div className="flex justify-center mt-6 mb-8">
      <a
        href="#"
        className="bg-gradient-to-r from-teal-500 to-teal-700 text-white py-3 px-5 mx-3 rounded-md shadow-md hover:scale-105 transition-transform"
      >
        Get Started Free
      </a>
      <a
        href="#"
        className="py-3 px-5 mx-3 rounded-md border border-teal-600 text-teal-700 hover:bg-teal-50 transition-colors"
      >
        How It Works
      </a>
    </div>

    <div className="flex flex-col md:flex-row justify-center gap-4 w-full max-w-6xl">
      <img src={landingPic} alt='LandingPagePicture' className="h-30 w-30"></img>
    </div>
  </div>

  );
};

export default HeroSection;
