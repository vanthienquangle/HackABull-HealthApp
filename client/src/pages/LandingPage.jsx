// App.jsx or your main page component
import Navbar from './subpages/Navbar'
import HeroSection from './subpages/HeroSection'
import FeatureSection from './subpages/FeatureSection';
import Footer from './subpages/Footer';

function LandingPage() {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6 bg-gray-50">
        <div id="hero">
          <HeroSection />
        </div>
        <div id="features">
          <FeatureSection />
        </div>
        <div id="about">
          {/* Your About section content */}
          <h2 className="text-3xl font-bold text-neutral-800 mb-6">About Us</h2>
          {/* Add your about content here */}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default LandingPage;