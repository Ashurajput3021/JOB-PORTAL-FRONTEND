import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo & Description */}
        <div>
          <h1 className="text-2xl font-bold mb-3">JobPortal</h1>
          <p className="text-gray-100">
            Discover your dream job and connect with top companies. Stay updated with the latest opportunities.
          </p>
          <div className="flex items-center mt-4 gap-3">
            <FaFacebookF className="w-5 h-5 hover:text-gray-200 cursor-pointer transition-colors" />
            <FaTwitter className="w-5 h-5 hover:text-gray-200 cursor-pointer transition-colors" />
            <FaLinkedinIn className="w-5 h-5 hover:text-gray-200 cursor-pointer transition-colors" />
            <FaInstagram className="w-5 h-5 hover:text-gray-200 cursor-pointer transition-colors" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="font-semibold text-lg mb-3">Quick Links</h2>
          <ul className="space-y-2 text-gray-100">
            <li className="hover:text-gray-200 cursor-pointer transition-colors">Home</li>
            <li className="hover:text-gray-200 cursor-pointer transition-colors">Jobs</li>
            <li className="hover:text-gray-200 cursor-pointer transition-colors">Companies</li>
            <li className="hover:text-gray-200 cursor-pointer transition-colors">About Us</li>
            <li className="hover:text-gray-200 cursor-pointer transition-colors">Contact</li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h2 className="font-semibold text-lg mb-3">Resources</h2>
          <ul className="space-y-2 text-gray-100">
            <li className="hover:text-gray-200 cursor-pointer transition-colors">Blog</li>
            <li className="hover:text-gray-200 cursor-pointer transition-colors">FAQ</li>
            <li className="hover:text-gray-200 cursor-pointer transition-colors">Terms & Conditions</li>
            <li className="hover:text-gray-200 cursor-pointer transition-colors">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="font-semibold text-lg mb-3">Contact Us</h2>
          <p className="text-gray-100">123 Street, City, Country</p>
          <p className="text-gray-100 mt-1">Email: info@jobportal.com</p>
          <p className="text-gray-100 mt-1">Phone: +123 456 7890</p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 border-t border-white/30 pt-6 text-center text-gray-200 text-sm">
        © 2025 JobPortal. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
