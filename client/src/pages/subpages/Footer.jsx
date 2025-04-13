import { resourcesLinks, platformLinks, communityLinks } from "../constants";
import { BrainCircuit, Twitter, Linkedin, Github, Youtube } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <BrainCircuit size={28} className="text-teal-600 mr-2" />
              <span className="text-xl font-bold tracking-tight text-neutral-800">
                Neuro<span className="text-teal-600">Sure</span>
              </span>
            </div>
            <p className="text-neutral-600 mb-6 max-w-md">
              Advanced AI-powered platform for stroke prediction, prevention, and personalized neural health management.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-teal-100 text-teal-700 hover:bg-teal-600 hover:text-white transition-colors">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-teal-100 text-teal-700 hover:bg-teal-600 hover:text-white transition-colors">
                <Linkedin size={16} />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-teal-100 text-teal-700 hover:bg-teal-600 hover:text-white transition-colors">
                <Github size={16} />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-teal-100 text-teal-700 hover:bg-teal-600 hover:text-white transition-colors">
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-md font-bold mb-4 text-neutral-800">Resources</h3>
            <ul className="space-y-3">
              {resourcesLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-neutral-600 hover:text-teal-600 transition-colors"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-md font-bold mb-4 text-neutral-800">Platform</h3>
            <ul className="space-y-3">
              {platformLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-neutral-600 hover:text-teal-600 transition-colors"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-md font-bold mb-4 text-neutral-800">Community</h3>
            <ul className="space-y-3">
              {communityLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-neutral-600 hover:text-teal-600 transition-colors"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} NeuroSure. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-sm text-neutral-500 hover:text-teal-600">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-neutral-500 hover:text-teal-600">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-neutral-500 hover:text-teal-600">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
