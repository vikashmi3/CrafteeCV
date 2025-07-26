import React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import logo from '../assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-indigo-900 via-cyan-900 to-pink-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div className="flex flex-col items-start space-y-4">
          <img src={logo} alt="Logo" className="w-16 h-16 object-contain" />
          <h3 className="text-2xl font-bold">CrafteeCV</h3>
          <p className="text-gray-300">
            Transform your career with our AI-powered resume builder. Create stunning, ATS-optimized resumes that get you noticed by top employers worldwide.
          </p>
          <div className="flex space-x-4">
            <a href="https://linkedin.com/in/er-vikash-mishra-ba198b181" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-indigo-400 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg>
            </a>
            <a href="https://github.com/vikashmi3" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-indigo-400 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a href="https://vikasrmishra.netlify.app" target="_blank" rel="noopener noreferrer" aria-label="Website" className="hover:text-indigo-400 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.372 0 0 5.372 0 12c0 6.627 5.372 12 12 12s12-5.373 12-12c0-6.628-5.372-12-12-12zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Navigation</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link to="/" className="hover:text-indigo-400 transition-colors">Home</Link>
            </li>
            <li>
              <Link to="/builder" className="hover:text-indigo-400 transition-colors">Resume Builder</Link>
            </li>
            <li>
              <Link to="/templates" className="hover:text-indigo-400 transition-colors">Templates</Link>
            </li>
            <li>
              <Link to="/examples" className="hover:text-indigo-400 transition-colors">Examples</Link>
            </li>
            <li>
              <Link to="/pricing" className="hover:text-indigo-400 transition-colors">Pricing</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-4 flex items-center">
            <EnvelopeIcon className="w-5 h-5 mr-2" />
            Get in Touch
          </h4>
          <p className="text-gray-400 mb-2">Email Support</p>
          <a href="mailto:study.vikashmishra@gmail.com" className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
            study.vikashmishra@gmail.com
          </a>
        </div>
      </div>

      <div className="border-t border-gray-800 bg-gray-800 text-gray-400 text-center py-6 mt-12">
        <p>
          &copy; {currentYear} Vikash Mishra. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
