import type { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import path from 'path';

const getRecipes = async () => {
  const filePath = path.join(process.cwd(), 'public/data/recipes.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const recipes = await getRecipes();

  if (id) {
    const recipe = recipes.find((recipe: { id: string }) => recipe.id === id);
    if (!recipe) {
      res.status(404).json({ message: 'Recipe not found' });
      return;
    }
    res.status(200).json(recipe);
  } else {
    res.status(200).json(recipes);
  }
}
