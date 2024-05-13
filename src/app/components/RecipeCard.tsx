import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

type RecipeType = {
  id: number;
  name: string;
  summary: string;
  rating: number;
  ratingsCount: number;
  time: string;
  difficulty: string;
  serves: number;
  image: string;
};

const RecipeCard = ({ recipe }: { recipe: RecipeType }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-2 flex flex-col justify-between h-full">
      <div>
        <Image
          src={recipe.image}
          alt={recipe.name}
          width={400}
          height={400}
          className="w-full"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{recipe.name}</div>
          <p className="text-gray-700 text-base">{recipe.summary}</p>
          <p className="text-yellow-400 text-base flex items-center">
            <svg
              className="w-4 h-4 mr-2 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.5 3 1.5-6.6L1 7h6.4L10 1l2.6 6H19l-4.5 4.4 1.5 6.6z" />
            </svg>
            {recipe.rating} ({recipe.ratingsCount} ratings)
          </p>
          <p className="text-gray-600 text-base flex items-center">
            <svg
              className="w-4 h-4 mr-2 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v6l5.25 3.15.75-1.23-4.5-2.67z" />
            </svg>
            {recipe.time}
          </p>
          <p className="text-gray-600 text-base">Serves {recipe.serves}</p>
        </div>
      </div>
      <div className="px-6 pt-4 pb-2 mb-4">
        <Link
          href={`/recipes/${recipe.id}`}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full text-center block"
        >
          View Recipe
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
