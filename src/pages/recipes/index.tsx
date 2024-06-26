import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import RecipeCard from '../../app/components/RecipeCard';
import { Recipe } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface RecipesProps {
  recipes: Recipe[];
}

const Recipes = ({ recipes }: RecipesProps) => {
  return (
    <>
      <Head>
        <title>Top Recipes | Discover Delicious Dishes</title>
        <meta
          name="description"
          content="Browse our top recipes and discover delicious dishes to try at home."
        />
      </Head>
      <div className="container mx-auto px-8 py-8 max-w-6xl flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${API_URL}/api/recipes`);
  const recipes: Recipe[] = await res.json();

  return {
    props: {
      recipes,
    },
  };
};

export default Recipes;
