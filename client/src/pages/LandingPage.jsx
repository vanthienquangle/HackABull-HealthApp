import { useState, useEffect } from 'react';
import Navbar from './subpages/Navbar';
import HeroSection from './subpages/HeroSection';
import FeatureSection from './subpages/FeatureSection';
import AboutSection from './subpages/AboutSection';
import CtaSection from './subpages/CtaSection';
import Footer from './subpages/Footer';

function LandingPage() {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    // Set loaded to true after component mounts
    setLoaded(true);
    
    // Optional: Add a class to the body when loaded
    if (loaded) {
      document.body.classList.add('page-loaded');
    }
    
    return () => {
      document.body.classList.remove('page-loaded');
    };
  }, [loaded]);

  return (
    <div className={`${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
      <Navbar />
      <main>
        <section id="hero">
          <HeroSection />
        </section>
        
        <section id="features" className="relative">
          <FeatureSection />
        </section>
        
        <section id="about">
          <AboutSection />
        </section>
        
        <section id="cta" className="bg-gradient-to-r from-teal-500 to-teal-700">
          <CtaSection />
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default LandingPage;