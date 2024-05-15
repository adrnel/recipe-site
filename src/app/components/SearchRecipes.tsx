import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const SearchRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('/data/recipes.json');
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error('Failed to fetch recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    if (event.target.value !== '') {
      setIsOpen(true);
    }
  };

  const handleInputBlur = () => {
    // Optionally delay hiding the dropdown to allow time for click to register on links
    setTimeout(() => setIsOpen(false), 100);
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative" ref={containerRef}>
      <input
        type="text"
        placeholder="Search for recipe"
        className="p-2 rounded text-gray-900 w-full"
        onChange={handleSearchChange}
        onBlur={handleInputBlur}
        onFocus={() => setIsOpen(true)}
      />
      {isOpen && searchQuery && (
        <div className="absolute z-10 w-full bg-white shadow-lg mt-1 rounded">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <Link
                key={recipe.id}
                href={`/recipes/${recipe.id}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {recipe.name}
              </Link>
            ))
          ) : (
            <div className="px-4 py-2 text-sm text-gray-500">
              No results found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchRecipes;
