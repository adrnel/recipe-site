import { Recipe } from '@/types';
import { promises as fs } from 'fs';
import path from 'path';

export const getRecipes = async (): Promise<Recipe[]> => {
  const filePath = path.join(process.cwd(), 'public/data/recipes.json');
  const fileContents = await fs.readFile(filePath, 'utf8');

  return JSON.parse(fileContents) as Recipe[];
};

export const getRecipeById = async (
  id: string
): Promise<Recipe | undefined> => {
  const recipes = await getRecipes();

  return recipes.find((recipe) => recipe.id === id);
};
