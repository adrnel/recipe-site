import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter(); // To access route information

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (menuRef.current) {
      if (isMenuOpen) {
        menuRef.current.style.maxHeight = `${menuRef.current.scrollHeight}px`;
      } else {
        menuRef.current.style.maxHeight = '0';
      }
    }
  }, [isMenuOpen]);

  return (
    <main className="flex flex-col items-center justify-between">
      <nav className="bg-green-500 text-white w-full p-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex justify-between items-center w-full md:w-auto">
            <Link href="/">
              <h1 className="text-xl md:text-2xl font-bold text-center flex-1 md:text-left">
                Quick Easy Recipes
              </h1>
            </Link>
            <button
              className="text-xl md:hidden"
              onClick={toggleMenu}
              style={{ width: '24px' }}
            >
              {isMenuOpen ? (
                <span style={{ fontSize: '20px' }}>X</span>
              ) : (
                <span style={{ fontSize: '20px' }}>☰</span>
              )}
            </button>
          </div>

          <div
            ref={menuRef}
            className="flex-col md:flex-row flex overflow-hidden transition-max-height duration-300 ease-in-out md:hidden"
            style={{ maxHeight: '0' }}
          >
            <Link
              href="/"
              className={`py-2 px-4 rounded hover:bg-green-600 focus:bg-green-700 ${
                router.pathname === '/' ? 'bg-green-700' : ''
              }`}
            >
              Home
            </Link>
            <Link
              href="/recipes"
              className={`py-2 px-4 rounded hover:bg-green-600 focus:bg-green-700 ${
                router.pathname === '/recipes' ? 'bg-green-700' : ''
              }`}
            >
              Recipes
            </Link>
            <Link
              href="/about"
              className={`py-2 px-4 rounded hover:bg-green-600 focus:bg-green-700 ${
                router.pathname === '/about' ? 'bg-green-700' : ''
              }`}
            >
              About Us
            </Link>

            <div className="mt-4">
              <input
                type="text"
                placeholder="Search for recipe"
                className="p-2 rounded text-gray-900"
              />
            </div>
          </div>

          <div
            className={`flex-col md:flex-row flex ${
              isMenuOpen ? 'flex' : 'hidden'
            } md:flex gap-4 mt-4 md:mt-0 hidden md:block`}
          >
            <Link
              href="/"
              className={`py-2 px-4 rounded hover:bg-green-600 focus:bg-green-700 ${
                router.pathname === '/' ? 'bg-green-700' : ''
              }`}
            >
              Home
            </Link>
            <Link
              href="/recipes"
              className={`py-2 px-4 rounded hover:bg-green-600 focus:bg-green-700 ${
                router.pathname === '/recipes' ? 'bg-green-700' : ''
              }`}
            >
              Recipes
            </Link>
            <Link
              href="/about"
              className={`py-2 px-4 rounded hover:bg-green-600 focus:bg-green-700 ${
                router.pathname === '/about' ? 'bg-green-700' : ''
              }`}
            >
              About Us
            </Link>
          </div>

          <div className="hidden md:block pl-8">
            <input
              type="text"
              placeholder="Search for recipe"
              className="p-2 rounded text-gray-900"
            />
          </div>
        </div>
      </nav>
    </main>
  );
};

export default Header;
