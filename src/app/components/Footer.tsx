import Link from 'next/link';
import React from 'react';

const Footer = () => (
  <footer className="bg-gray-900 text-white p-4">
    <div className="container mx-auto px-4 flex flex-wrap justify-between items-center">
      <div className="w-full md:w-auto mb-4 md:mb-0 text-center">
        <p>Contact us: +123 456 7890 | contact@quickeasyrecipes.com</p>
        <div className="social-icons">{/* Icons for social media */}</div>
      </div>
      <div className="w-full md:w-auto">
        <form className="flex flex-col md:flex-row items-center">
          <label htmlFor="email-signup" className="mr-2">
            Sign up for updates:
          </label>
          <input
            type="email"
            id="email-signup"
            placeholder="Your email"
            className="flex-1 m-2 p-2 rounded"
          />
          <button type="submit" className="m-2">
            Subscribe
          </button>
        </form>
      </div>
    </div>
    <div className="container mx-auto px-4 flex flex-wrap justify-between items-center mt-4">
      <Link href="/privacy-policy" className="mb-2 md:mb-0">
        Privacy Policy
      </Link>
      <Link href="/terms-and-conditions" className="mb-2 md:mb-0">
        Terms & Conditions
      </Link>
      <p className="text-center w-full md:w-auto">
        © 2024 Quick Easy Recipes. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
