import {
  getCategoryList,
  getRecipeCategory,
} from '@/app/components/recipeMeta';
import { Recipe } from '@/types';
import { ArrowRight, Filter, Search } from 'lucide-react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import RecipeCard from '../../app/components/RecipeCard';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface RecipesProps {
  recipes: Recipe[];
}

const Recipes = ({ recipes }: RecipesProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(() => getCategoryList(recipes), [recipes]);

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const category = getRecipeCategory(recipe);
      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        query.length === 0 ||
        recipe.name.toLowerCase().includes(query) ||
        recipe.summary.toLowerCase().includes(query) ||
        category.toLowerCase().includes(query);
      const matchesCategory =
        activeCategory === 'All' || category === activeCategory;

      return matchesQuery && matchesCategory;
    });
  }, [activeCategory, recipes, searchQuery]);

  return (
    <>
      <Head>
        <title>Recipe Index | Recipeasy</title>
        <meta
          name="description"
          content="Browse the full Recipeasy collection with the updated recipe index design."
        />
      </Head>
      <main className="px-4 pb-24 pt-10 md:px-8 md:pt-14">
        <div className="mx-auto max-w-7xl">
          <section className="grid gap-10 lg:grid-cols-[1fr,0.72fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">
                Recipe index
              </p>
              <h1 className="mt-4 font-display text-5xl font-black leading-none text-stone-950 md:text-6xl">
                Every dish, one polished catalog.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-600">
                Filter by cuisine, search by name, and jump straight into the
                detailed recipe pages.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/70 bg-white/85 p-5 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <label htmlFor="recipes-search" className="sr-only">
                Search recipes
              </label>
              <div className="flex items-center gap-3 rounded-[1.5rem] bg-stone-50 px-4 py-4">
                <Search size={20} className="text-stone-400" />
                <input
                  id="recipes-search"
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search recipes or cuisines..."
                  className="w-full bg-transparent text-base text-stone-900 placeholder:text-stone-400 focus:outline-none"
                />
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm font-medium text-stone-500">
                <Filter size={16} className="text-emerald-700" />
                {filteredRecipes.length} recipes currently visible
              </div>
            </div>
          </section>

          <section className="mt-10 rounded-[2.5rem] border border-white/70 bg-white/75 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl md:p-8">
            <div className="flex flex-wrap gap-3 overflow-x-auto pb-2 no-scrollbar">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold whitespace-nowrap ${
                    activeCategory === category
                      ? 'bg-stone-950 text-white shadow-lg'
                      : 'border border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {filteredRecipes.length > 0 ? (
                filteredRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))
              ) : (
                <div className="col-span-full rounded-[2rem] border border-dashed border-stone-300 bg-stone-50 px-6 py-16 text-center">
                  <h2 className="font-display text-3xl font-bold text-stone-950">
                    No matches right now
                  </h2>
                  <p className="mt-3 text-stone-600">
                    Reset your filters or go back to the featured collection.
                  </p>
                  <Link
                    href="/"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white"
                  >
                    Return home
                    <ArrowRight size={16} />
                  </Link>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  _context: GetServerSidePropsContext
) => {
  const res = await fetch(`${API_URL}/api/recipes`);
  const recipes: Recipe[] = await res.json();

  return {
    props: {
      recipes,
    },
  };
};

export default Recipes;
