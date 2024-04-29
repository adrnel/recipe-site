import React, { useState, useRef, useEffect } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Function to toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Calculate height dynamically
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
    <main className="flex min-h-screen flex-col items-center justify-between">
      <nav className="bg-green-500 text-white w-full p-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex justify-between items-center w-full md:w-auto">
            <h1 className="text-xl md:text-2xl font-bold text-center flex-1 md:text-left">Quick Easy Recipes</h1>
            <button className="text-xl md:hidden" onClick={toggleMenu}>
              <button className="text-xl md:hidden" onClick={toggleMenu} style={{ width: '24px' }}>
                {isMenuOpen ? (
                  <span style={{ fontSize: '20px' }}>X</span>
                ) : (
                  <span style={{ fontSize: '20px' }}>☰</span>
                )}
              </button>
            </button>
          </div>

          <div ref={menuRef} className="flex-col md:flex-row flex overflow-hidden transition-max-height duration-300 ease-in-out md:hidden" style={{ maxHeight: '0' }}>
            <button className="py-2 px-4 rounded hover:bg-green-600 focus:bg-green-700">Home</button>
            <button className="py-2 px-4 rounded hover:bg-green-600 focus:bg-green-700">Recipes</button>
            <button className="py-2 px-4 rounded hover:bg-green-600 focus:bg-green-700">About Us</button>
            <div className="mt-4 md:mt-0 md:hidden">
              <input type="text" placeholder="Search for recipe" className="p-2 rounded" />
            </div>
          </div>

          
          <div className={`flex-col md:flex-row flex ${isMenuOpen ? 'flex' : 'hidden'} md:flex gap-4 mt-4 md:mt-0 hidden md:block`}>
            <button className="py-2 px-4 rounded hover:bg-green-600 focus:bg-green-700">Home</button>
            <button className="py-2 px-4 rounded hover:bg-green-600 focus:bg-green-700">Recipes</button>
            <button className="py-2 px-4 rounded hover:bg-green-600 focus:bg-green-700">About Us</button>
            <div className="mt-4 md:mt-0 md:hidden">
              <input type="text" placeholder="Search for recipe" className="p-2 rounded" />
            </div>
          </div>

          <div className="hidden md:block">
            <input type="text" placeholder="Search for recipe" className="p-2 rounded" />
          </div>
        </div>
      </nav>
    </main>
  );
};

export default Header;
