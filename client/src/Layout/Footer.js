import React from 'react';

const Footer = () => {
  return (
    <footer className="py-6 mt-16 bg-gray-900 border-t border-gray-800 shadow-2xl">
      <div className="container mx-auto text-center">
        <p className="text-sm font-medium text-white animate-pulse">
          Created with ReactJS and TailwindCSS
        </p>
        <div className="mt-4">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Contact Manager. All rights reserved.
          </p>
          <nav className="mt-2">
            <ul className="flex justify-center space-x-6 text-sm text-gray-400">
              <li>
                <a
                  href="/about"
                  className="hover:text-white transition-colors duration-200"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="hover:text-white transition-colors duration-200"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="hover:text-white transition-colors duration-200"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/your-repo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="mt-4">
          <p className="text-xs text-gray-500">
            Need help? <a href="/contact" className="text-yellow-400 hover:text-white">Contact Support</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
