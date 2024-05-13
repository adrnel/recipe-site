import React, { useState, useEffect } from 'react';
import RecipeCard from '../../app/components/RecipeCard';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]); // Use an empty array as the initial state

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch('/data/recipes.json'); // Adjust the path as necessary
      const data = await response.json();
      setRecipes(data);
    };

    fetchRecipes();
  }, []);

  if (!recipes.length) {
    return <div>Loading...</div>; // Loading state while data is being fetched
  }

  return (
    <div className="container mx-auto px-8 py-8 max-w-6xl flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Recipes;
