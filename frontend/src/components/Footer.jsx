import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="bg-gray-900 px-10 pt-10 pb-10 mt-10 mb-0 text-white">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between gap-8">
        <div className="flex-1">
          <img src={assets.logo} alt="Tomato logo" className="mb-4" />
          <p className="text-sm leading-relaxed">
            Tomato is a food delivery app that allows you to order delicious
            food from your favorite restaurants.
          </p>
          <div className="flex gap-3 mt-4">
            <img src={assets.facebook_icon} alt="Facebook" className="w-8 h-8" />
            <img src={assets.twitter_icon} alt="Twitter" className="w-8 h-8" />
            <img src={assets.linkedin_icon} alt="LinkedIn" className="w-8 h-8" />
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-2">COMPANY</h2>
          <ul className="space-y-1 text-sm">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold mb-2">GET IN TOUCH</h2>
          <ul className="space-y-1 text-sm">
            <li>+1-223-456-789</li>
            <li>contact@tomato.com</li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <hr className="mt-6 mb-2 border-gray-700" />

      {/* Bottom Section */}
      <p className="text-center text-sm">
        Copyright © 2024 Tomato. All rights reserved
      </p>
    </div>
  );
};

export default Footer;
