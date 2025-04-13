import { ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

function CtaSection() {
  const benefits = [
    "AI-powered risk assessment",
    "Personalized prevention plans",
    "Expert-backed recommendations",
    "Daily health tracking",
    "Regular progress reports",
    "Connect with healthcare providers"
  ];

  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
              Ready to take control of your neural health?
            </h2>
            <p className="text-teal-50 mb-8 text-lg">
              Join thousands of users who are proactively reducing their stroke risk with NeuroSure's AI-powered platform.
            </p>
            
            <ul className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center text-white">
                  <CheckCircle size={20} className="text-teal-200 mr-3 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link 
                to="/register" 
                className="group bg-white text-teal-700 px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl hover:bg-teal-50 transition-all flex items-center justify-center"
              >
                Get Started Free
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                to="/contact" 
                className="px-6 py-3 border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:text-teal-700 transition-colors flex items-center justify-center"
              >
                Contact Sales
              </Link>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-white mb-6">Start your free trial today</h3>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-teal-50 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 rounded-lg border-0 focus:ring-2 focus:ring-teal-300 bg-white/90"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-teal-50 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 rounded-lg border-0 focus:ring-2 focus:ring-teal-300 bg-white/90"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-teal-50 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-2 rounded-lg border-0 focus:ring-2 focus:ring-teal-300 bg-white/90"
                  placeholder="(123) 456-7890"
                />
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-white text-teal-700 py-3 px-4 rounded-lg font-medium hover:bg-teal-50 transition-colors shadow-md hover:shadow-lg"
                >
                  Start 14-Day Free Trial
                </button>
              </div>
              
              <p className="text-center text-teal-100 text-sm mt-4">
                No credit card required. Cancel anytime.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CtaSection;