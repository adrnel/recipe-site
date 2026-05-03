import { Recipe } from '@/types';

const recipeCategories: Record<string, string> = {
  '1': 'Indian',
  '2': 'British',
  '3': 'Russian',
  '4': 'Tex-Mex',
  '5': 'Italian',
  '6': 'Italian-American',
};

export const getRecipeCategory = (recipe: Recipe) =>
  recipeCategories[recipe.id] || 'Chef Special';

export const getTotalMinutes = (recipe: Recipe) => {
  const prepMinutes = Number.parseInt(recipe.prepTime, 10) || 0;
  const cookingMinutes = Number.parseInt(recipe.cookingTime, 10) || 0;

  return prepMinutes + cookingMinutes;
};

export const getCategoryList = (recipes: Recipe[]) => [
  'All',
  ...Array.from(new Set(recipes.map((recipe) => getRecipeCategory(recipe)))),
];
