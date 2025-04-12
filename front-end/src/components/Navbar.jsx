import { navItems } from "../constants";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 py-3 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          
          {/* Logo and Name */}
          <div className="flex items-center flex-shrink-0">
            {/* <img className="h-16 w-16 mr-2 ml-2" src={logo} alt="Logo" /> */}
            <span className="text-xl font-semibold tracking-tight text-neutral-800">
              NeuroSure
            </span>
          </div>

          {/* Desktop Nav Links */}
          <ul className="hidden lg:flex ml-14 space-x-12 text-neutral-700">
            {navItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className="hover:text-teal-600 transition-colors font-medium"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Old Login - JWT */}
          {/* <div className="hidden lg:flex justify-center space-x-12 items-center">
            <a href="#" className="py-2 px-3 border rounded-md">
              Sign In
            </a>
            <a
              href="#"
              className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md"
            >
              Create an account
            </a>
          </div> */}


          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton>
                <button className="px-4 py-2 border border-teal-600 text-teal-700 rounded-md hover:bg-teal-50 transition-colors text-sm font-medium shadow-sm">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox:
                      "w-10 h-10 border border-teal-500 shadow-sm rounded-full transition-all",
                  },
                  variables: {
                    colorPrimary: "#14b8a6", // teal-500
                    colorText: "#0f172a", // neutral-900
                  },
                }}
              />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
