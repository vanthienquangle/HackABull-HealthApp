import Navbar from "./subpages/Navbar";
import HeroSection from "./subpages/HeroSection";
import FeatureSection from "./subpages/FeatureSection";
import Footer from "./subpages/Footer";


function LandingPage() {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6 bg-gray-50">
        <HeroSection />
        <FeatureSection />
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
