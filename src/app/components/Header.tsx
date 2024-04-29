import React from 'react';

const Header = () => (
  <main className="flex min-h-screen flex-col items-center justify-between">
        <nav className="bg-green-500 text-white p-4 w-full">
          <div className="container mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Quick Easy Recipes</h1>
            </div>

            <div className="flex gap-4">
              
              <div className="dropdown relative">
                <button className="py-2 px-4 rounded hover:bg-green-600 focus:bg-green-700">Home</button>
              </div>

              <div className="dropdown relative">
                <button className="py-2 px-4 rounded hover:bg-green-600 focus:bg-green-700">Recipes</button>
                <div className="dropdown-menu absolute hidden bg-green-500 text-white">
                  <a href="#" className="block px-4 py-2 hover:bg-green-600">Submenu 1</a>
                  <a href="#" className="block px-4 py-2 hover:bg-green-600">Submenu 2</a>
                  <a href="#" className="block px-4 py-2 hover:bg-green-600">Submenu 3</a>
                </div>
              </div>

              <div className="dropdown relative">
                <button className="py-2 px-4 rounded hover:bg-green-600 focus:bg-green-700">Ingredients</button>
                <div className="dropdown-menu absolute hidden bg-green-500 text-white">
                  <a href="#" className="block px-4 py-2 hover:bg-green-600">Submenu 1</a>
                  <a href="#" className="block px-4 py-2 hover:bg-green-600">Submenu 2</a>
                  <a href="#" className="block px-4 py-2 hover:bg-green-600">Submenu 3</a>
                </div>
              </div>

              <div className="dropdown relative">
                <button className="py-2 px-4 rounded hover:bg-green-600 focus:bg-green-700">About us</button>
                <div className="dropdown-menu absolute hidden bg-green-500 text-white">
                  <a href="#" className="block px-4 py-2 hover:bg-green-600">Submenu 1</a>
                  <a href="#" className="block px-4 py-2 hover:bg-green-600">Submenu 2</a>
                  <a href="#" className="block px-4 py-2 hover:bg-green-600">Submenu 3</a>
                </div>
              </div>
            </div>

            <div>
              <input type="text" placeholder="Search for recipe" className="p-2 rounded" />
            </div>
          </div>
        </nav>
      </main>
);

export default Header;
