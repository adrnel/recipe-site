import RecipeCard from '@/app/components/RecipeCard';
import {
  getCategoryList,
  getRecipeCategory,
} from '@/app/components/recipeMeta';
import SearchRecipes from '@/app/components/SearchRecipes';
import { Recipe } from '@/types';
import { ArrowRight, Filter, Sparkles, Star } from 'lucide-react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface HomePageProps {
  recipes: Recipe[];
}

const HomePage = ({ recipes }: HomePageProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(() => getCategoryList(recipes), [recipes]);

  const featuredRecipes = useMemo(
    () =>
      recipes
        .slice()
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 6),
    [recipes]
  );

  const filteredRecipes = useMemo(() => {
    return featuredRecipes.filter((recipe) => {
      const category = getRecipeCategory(recipe);
      const matchesCategory =
        activeCategory === 'All' || category === activeCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        query.length === 0 ||
        recipe.name.toLowerCase().includes(query) ||
        recipe.summary.toLowerCase().includes(query) ||
        category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, featuredRecipes, searchQuery]);

  const heroRecipe = featuredRecipes[0] ?? recipes[0];

  return (
    <>
      <Head>
        <title>Recipeasy | Master the Art of Home Cooking</title>
        <meta
          name="description"
          content="Explore standout recipes, filter by cuisine, and cook with a refined new Recipeasy experience."
        />
      </Head>
      <main className="pb-24">
        <section className="relative overflow-hidden px-4 pb-16 pt-10 md:px-8 md:pb-24 md:pt-14">
          <div className="hero-glow left-0 top-16 h-56 w-56 bg-emerald-200/70" />
          <div className="hero-glow right-4 top-48 h-48 w-48 bg-amber-200/70" />

          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
            <div className="slide-up">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-emerald-800">
                <Star size={14} className="fill-current" />
                Fresh ideas for everyday cooking
              </div>
              <h1 className="mt-6 font-display text-5xl font-black leading-none text-stone-950 md:text-7xl xl:text-[5.5rem]">
                Master the art of home cooking
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600 md:text-xl">
                Explore tested recipes, sharp technique notes, and the kind of
                weeknight inspiration that makes dinner feel intentional.
              </p>

              <div className="mt-10 max-w-2xl rounded-[2rem] border border-white/70 bg-white/90 p-3 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
                <SearchRecipes
                  buttonClassName="inline-flex items-center justify-center rounded-[1.5rem] bg-emerald-600 px-6 py-4 text-sm font-semibold text-white hover:bg-emerald-700"
                  buttonLabel={
                    searchQuery.trim().length > 0
                      ? 'Search recipes'
                      : 'Browse recipes'
                  }
                  containerClassName="relative"
                  defaultQuery={searchQuery}
                  dropdownClassName="absolute left-0 right-0 top-[calc(100%+0.75rem)] z-20 overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.12)]"
                  formClassName="flex flex-col gap-3 md:flex-row md:items-center"
                  inputClassName="w-full bg-transparent text-base text-stone-900 placeholder:text-stone-400 focus:outline-none"
                  inputId="homepage-search"
                  onQueryChange={setSearchQuery}
                  placeholder="Search recipes, ingredients, or cuisines..."
                  recipes={recipes}
                />
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-3 text-sm text-stone-600">
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
                  <Sparkles size={16} className="text-emerald-700" />
                  {recipes.length} tested recipes
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
                  <Filter size={16} className="text-emerald-700" />
                  Search and filter instantly
                </span>
              </div>
            </div>

            {heroRecipe && (
              <div className="fade-in relative">
                <div className="relative overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/75 p-4 shadow-[0_30px_90px_rgba(15,23,42,0.12)] backdrop-blur-xl">
                  <div className="relative h-[420px] overflow-hidden rounded-[2rem]">
                    <Image
                      src={heroRecipe.image}
                      alt={heroRecipe.name}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/10 to-transparent" />
                    <div className="absolute left-6 top-6 rounded-full bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-stone-700 shadow-sm">
                      Editor&apos;s Pick
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <div className="flex items-center gap-2 text-sm font-semibold text-amber-300">
                        <Star size={16} className="fill-current" />
                        {heroRecipe.rating} rating
                      </div>
                      <h2 className="mt-3 font-display text-4xl font-bold">
                        {heroRecipe.name}
                      </h2>
                      <p className="mt-3 max-w-lg text-sm leading-7 text-white/80">
                        {heroRecipe.summary}
                      </p>
                      <Link
                        href={`/recipes/${heroRecipe.id}`}
                        className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-stone-900"
                      >
                        View recipe
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="px-4 md:px-8">
          <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-white/70 bg-white/70 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl md:p-8">
            <div className="flex flex-col gap-6 border-b border-stone-200/80 pb-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">
                  Featured collection
                </p>
                <h2 className="mt-3 font-display text-4xl font-bold text-stone-950">
                  Top Recipes
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-7 text-stone-600">
                  Refined comfort food, bold flavors, and reliable
                  crowd-pleasers.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 overflow-x-auto pb-1 no-scrollbar">
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
            </div>

            <div className="mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {filteredRecipes.length > 0 ? (
                filteredRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))
              ) : (
                <div className="col-span-full rounded-[2rem] border border-dashed border-stone-300 bg-stone-50 px-6 py-16 text-center">
                  <h3 className="font-display text-3xl font-bold text-stone-900">
                    No recipes found
                  </h3>
                  <p className="mt-3 text-stone-600">
                    Try a different search term or switch category filters.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export async function getServerSideProps(_context: GetServerSidePropsContext) {
  const res = await fetch(`${API_URL}/api/recipes`);
  const recipes: Recipe[] = await res.json();

  return {
    props: {
      recipes,
    },
  };
}

export default HomePage;
