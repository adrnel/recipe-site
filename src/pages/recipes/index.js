import React from 'react';
import RecipeCard from './RecipeCard';
import recipes from './recipes';

const Recipes = () => {
  return (
    <div className="container mx-auto px-8 py-8 max-w-6xl flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
        {recipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Recipes;