import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const RecipePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  interface Recipe {
    id: string;
    name: string;
    image: string;
    prepTime: string;
    cookingTime: string;
    difficulty: string;
    serves: string;
    ingredients: string[];
    method: string[];
  }

  useEffect(() => {
    async function fetchRecipe(recipeId: string) {
      const response = await fetch(`/data/recipes.json`);
      const recipes = await response.json();
      const foundRecipe = recipes.find((r: Recipe) => r.id === recipeId);
      setRecipe(foundRecipe);
    }

    if (typeof id === 'string') {
      fetchRecipe(id);
    }
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-4xl p-5 bg-white shadow-lg">
        <h1 className="text-2xl font-bold my-2 text-center">{recipe.name}</h1>
        <div className="flex justify-center mb-8">
          <Image
            src={recipe.image}
            alt={recipe.name}
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>
        <div className="my-4 hidden sm:block">
          <div className="overflow-x-auto">
            <table className="table-auto w-full bg-gray-200 rounded-lg">
              <thead>
                <tr>
                  <th className="px-4 py-2">Prep Time</th>
                  <th className="px-4 py-2">Cooking Time</th>
                  <th className="px-4 py-2">Difficulty</th>
                  <th className="px-4 py-2">Serves</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 text-center">{recipe.prepTime}</td>
                  <td className="px-4 py-2 text-center">
                    {recipe.cookingTime}
                  </td>
                  <td className="px-4 py-2 text-center">{recipe.difficulty}</td>
                  <td className="px-4 py-2 text-center">{recipe.serves}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="block sm:hidden mb-8">
          <div className="mb-2">
            <div className="font-medium p-2">Prep Time</div>
            <div className="p-2 bg-gray-100 rounded">{recipe.prepTime}</div>
          </div>
          <div className="mb-2">
            <div className="font-medium p-2">Cooking Time</div>
            <div className="p-2 bg-gray-100 rounded">{recipe.cookingTime}</div>
          </div>
          <div className="mb-2">
            <div className="font-medium p-2">Difficulty</div>
            <div className="p-2 bg-gray-100 rounded">{recipe.difficulty}</div>
          </div>
          <div className="mb-2">
            <div className="font-medium p-2">Serves</div>
            <div className="p-2 bg-gray-100 rounded">{recipe.serves}</div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-1">
            <h2 className="text-xl font-bold">Ingredients</h2>
            <ul className="list-disc pl-5">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold">Method</h2>
            <ul className="list-disc pl-5">
              {recipe.method.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
