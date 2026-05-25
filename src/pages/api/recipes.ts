import type { NextApiRequest, NextApiResponse } from 'next';
import { getRecipeById, getRecipes } from '../../lib/recipes';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (id) {
    const recipe = await getRecipeById(String(id));
    if (!recipe) {
      res.status(404).json({ message: 'Recipe not found' });
      return;
    }
    res.status(200).json(recipe);
  } else {
    const recipes = await getRecipes();
    res.status(200).json(recipes);
  }
}
