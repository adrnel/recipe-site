import {
  getRecipeCategory,
  getTotalMinutes,
} from '@/app/components/recipeMeta';
import { Recipe } from '@/types';
import { ArrowLeft, ChefHat, Clock, Flame, Star, Users } from 'lucide-react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface RecipePageProps {
  recipe?: Recipe;
}

interface Params extends ParsedUrlQuery {
  id: string;
}

const RecipePage = ({ recipe }: RecipePageProps) => {
  if (!recipe) {
    return <div>Loading...</div>;
  }

  const category = getRecipeCategory(recipe);
  const totalMinutes = getTotalMinutes(recipe);

  return (
    <>
      <Head>
        <title>{recipe.name} | Recipeasy</title>
        <meta
          name="description"
          content={`Learn how to make ${recipe.name} with ingredients, timing, and step-by-step instructions.`}
        />
      </Head>
      <main className="px-4 pb-24 pt-10 md:px-8 md:pt-14">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/recipes"
            className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-700 shadow-sm hover:border-emerald-200 hover:text-emerald-800"
          >
            <ArrowLeft size={16} />
            Back to recipes
          </Link>

          <section className="mt-6 grid gap-8 lg:grid-cols-[0.85fr,1.15fr]">
            <div className="overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/80 p-4 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <div className="relative h-[320px] overflow-hidden rounded-[2rem] md:h-[420px]">
                <Image
                  src={recipe.image}
                  alt={recipe.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-stone-700 shadow-sm">
                  {category}
                </div>
                <div className="absolute bottom-5 left-5 rounded-2xl bg-white/15 px-4 py-3 text-white backdrop-blur-md">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Star size={16} className="fill-amber-400 text-amber-400" />
                    {recipe.rating}
                    <span className="text-white/70">
                      ({recipe.ratingsCount})
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
                <div className="rounded-[1.5rem] bg-stone-50 px-4 py-5 text-center">
                  <Clock size={18} className="mx-auto mb-2 text-emerald-700" />
                  <div className="text-sm font-semibold text-stone-900">
                    {recipe.prepTime}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-[0.2em] text-stone-500">
                    Prep
                  </div>
                </div>
                <div className="rounded-[1.5rem] bg-stone-50 px-4 py-5 text-center">
                  <Flame size={18} className="mx-auto mb-2 text-emerald-700" />
                  <div className="text-sm font-semibold text-stone-900">
                    {recipe.cookingTime}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-[0.2em] text-stone-500">
                    Cook
                  </div>
                </div>
                <div className="rounded-[1.5rem] bg-stone-50 px-4 py-5 text-center">
                  <ChefHat
                    size={18}
                    className="mx-auto mb-2 text-emerald-700"
                  />
                  <div className="text-sm font-semibold text-stone-900">
                    {recipe.difficulty}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-[0.2em] text-stone-500">
                    Skill
                  </div>
                </div>
                <div className="rounded-[1.5rem] bg-stone-50 px-4 py-5 text-center">
                  <Users size={18} className="mx-auto mb-2 text-emerald-700" />
                  <div className="text-sm font-semibold text-stone-900">
                    {recipe.serves}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-[0.2em] text-stone-500">
                    Serves
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-[2rem] bg-stone-950 px-6 py-5 text-white">
                <div className="text-xs uppercase tracking-[0.25em] text-white/60">
                  Total cook window
                </div>
                <div className="mt-2 font-display text-4xl font-bold">
                  {totalMinutes} mins
                </div>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  From prep through plating, this recipe fits into a focused
                  home cooking session.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-8 rounded-[2.5rem] border border-white/70 bg-white/80 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl md:p-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">
                {category}
              </p>
              <h1 className="mt-4 font-display text-5xl font-black leading-none text-stone-950 md:text-6xl">
                {recipe.name}
              </h1>
              <p className="mt-6 border-l-4 border-emerald-200 pl-4 text-lg leading-8 text-stone-600">
                {recipe.summary}
              </p>
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr,1.1fr]">
              <div className="rounded-[2rem] bg-stone-50 p-6">
                <h2 className="font-display text-3xl font-bold text-stone-950">
                  Ingredients
                </h2>
                <ul className="mt-6 space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm leading-6 text-stone-700"
                    >
                      <span className="mt-2 h-2.5 w-2.5 flex-none rounded-full bg-emerald-500" />
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-display text-3xl font-bold text-stone-950">
                  Method
                </h2>
                <div className="mt-6 space-y-5">
                  {recipe.method.map((step, index) => (
                    <div
                      key={index}
                      className="flex gap-4 rounded-[2rem] border border-stone-200 bg-white px-5 py-5 shadow-sm"
                    >
                      <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-800">
                        {index + 1}
                      </span>
                      <p className="pt-1 text-sm leading-7 text-stone-700">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as Params;
  const res = await fetch(`${API_URL}/api/recipes?id=${id}`);
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
