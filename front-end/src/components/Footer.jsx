import { resourcesLinks, platformLinks, communityLinks } from "../constants";

const Footer = () => {
  return (
    <footer className="mt-20 bg-gray-50 border-t border-gray-200 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-3 gap-8 text-neutral-700">
        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Resources</h3>
          <ul className="space-y-2">
            {resourcesLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="hover:text-teal-600 transition-colors"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Platform */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Platform</h3>
          <ul className="space-y-2">
            {platformLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="hover:text-teal-600 transition-colors"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Community */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Community</h3>
          <ul className="space-y-2">
            {communityLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="hover:text-teal-600 transition-colors"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} NeuroSure. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
