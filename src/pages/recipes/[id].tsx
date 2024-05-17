import React from 'react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { Recipe } from '@/types';
import { ParsedUrlQuery } from 'querystring';

interface RecipePageProps {
  recipe: Recipe;
}

interface Params extends ParsedUrlQuery {
  id: string;
}

const RecipePage = ({ recipe }: RecipePageProps) => {
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

        <div className="block sm:hidden mb-8 rounded-lg border-solid border-2 overflow-hidden">
          <div>
            <div className="font-medium p-2">Prep Time</div>
            <div className="p-2 bg-gray-100">{recipe.prepTime}</div>
          </div>
          <div>
            <div className="font-medium p-2">Cooking Time</div>
            <div className="p-2 bg-gray-100">{recipe.cookingTime}</div>
          </div>
          <div>
            <div className="font-medium p-2">Difficulty</div>
            <div className="p-2 bg-gray-100">{recipe.difficulty}</div>
          </div>
          <div>
            <div className="font-medium p-2">Serves</div>
            <div className="p-2 bg-gray-100 rounded-b-lg">{recipe.serves}</div>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as Params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/recipes?id=${id}`
  );
  const recipe = await res.json();

  if (!recipe) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      recipe,
    },
  };
};

export default RecipePage;
