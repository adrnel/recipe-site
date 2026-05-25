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
import { getRecipeById } from '../../lib/recipes';

interface RecipePageProps {
  recipe?: Recipe;
}

interface Params extends ParsedUrlQuery {
  id: string;
}

const StatCard = ({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof Clock;
  value: string | number;
  label: string;
}) => (
  <div className="rounded-[1.4rem] border border-stone-200/70 bg-white px-4 py-4 shadow-sm">
    <Icon size={17} className="text-emerald-700" />
    <div className="mt-3 text-sm font-bold text-stone-950">{value}</div>
    <div className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-stone-400">
      {label}
    </div>
  </div>
);

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

      <main className="px-4 pb-24 pt-8 md:px-8 md:pt-12">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/recipes"
            className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/85 px-4 py-2 text-sm font-semibold text-stone-700 shadow-sm backdrop-blur transition hover:border-emerald-200 hover:text-emerald-800"
          >
            <ArrowLeft size={16} />
            Back to recipes
          </Link>

          <section className="mt-6 overflow-hidden rounded-[2rem] border border-white/70 bg-white/82 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl md:rounded-[2.75rem]">
            <div className="grid gap-0 lg:grid-cols-[0.95fr,1.05fr]">
              <div className="flex flex-col justify-between p-6 md:p-9 lg:p-11">
                <div>
                  <div className="inline-flex rounded-full bg-emerald-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-emerald-800 ring-1 ring-emerald-100">
                    {category}
                  </div>

                  <h1 className="mt-6 max-w-2xl font-display text-5xl font-black leading-[0.92] tracking-[-0.04em] text-stone-950 md:text-7xl">
                    {recipe.name}
                  </h1>

                  <p className="mt-6 max-w-xl border-l-4 border-emerald-200 pl-5 text-base leading-8 text-stone-600 md:text-lg">
                    {recipe.summary}
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                  <StatCard icon={Clock} value={recipe.prepTime} label="Prep" />
                  <StatCard
                    icon={Flame}
                    value={recipe.cookingTime}
                    label="Cook"
                  />
                  <StatCard
                    icon={ChefHat}
                    value={recipe.difficulty}
                    label="Skill"
                  />
                  <StatCard icon={Users} value={recipe.serves} label="Serves" />
                </div>
              </div>

              <div className="p-4 md:p-5 lg:p-6 lg:pl-0">
                <div className="relative min-h-[360px] overflow-hidden rounded-[1.6rem] bg-stone-100 md:min-h-[520px] lg:h-full lg:min-h-[620px] lg:rounded-[2.25rem]">
                  <Image
                    src={recipe.image}
                    alt={recipe.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 680px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-stone-950/10 to-transparent" />

                  <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-end justify-between gap-3">
                    <div className="rounded-2xl bg-white/15 px-4 py-3 text-white shadow-sm backdrop-blur-md ring-1 ring-white/15">
                      <div className="flex items-center gap-2 text-sm font-bold">
                        <Star
                          size={16}
                          className="fill-amber-400 text-amber-400"
                        />
                        {recipe.rating}
                        <span className="font-semibold text-white/70">
                          ({recipe.ratingsCount})
                        </span>
                      </div>
                    </div>

                    <div className="rounded-[1.6rem] bg-stone-950/92 px-6 py-5 text-right text-white shadow-2xl backdrop-blur">
                      <div className="text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-white/55">
                        Total window
                      </div>
                      <div className="mt-1 font-display text-4xl font-bold leading-none">
                        {totalMinutes} mins
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-8 grid gap-8 lg:grid-cols-[380px,1fr]">
            <aside className="lg:sticky lg:top-8 lg:self-start">
              <div className="rounded-[2rem] border border-white/70 bg-white/82 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.07)] backdrop-blur-xl md:rounded-[2.5rem] md:p-8">
                <div className="flex items-end justify-between gap-4">
                  <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-stone-950">
                    Ingredients
                  </h2>
                  <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-bold text-stone-500">
                    {recipe.ingredients.length} items
                  </span>
                </div>

                <ul className="mt-6 space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 rounded-2xl border border-stone-200/75 bg-white px-4 py-3 text-sm leading-6 text-stone-700 shadow-sm"
                    >
                      <span className="mt-2 h-2.5 w-2.5 flex-none rounded-full bg-emerald-500" />
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <div className="rounded-[2rem] border border-white/70 bg-white/82 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.07)] backdrop-blur-xl md:rounded-[2.5rem] md:p-8 lg:p-10">
              <div className="flex flex-col gap-3 border-b border-stone-200 pb-7 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">
                    Cook along
                  </p>
                  <h2 className="mt-3 font-display text-4xl font-bold tracking-[-0.04em] text-stone-950 md:text-5xl">
                    Method
                  </h2>
                </div>
                <p className="max-w-sm text-sm leading-6 text-stone-500">
                  Work through each step in order. Keep the sauce at a gentle
                  simmer so it thickens without splitting.
                </p>
              </div>

              <div className="mt-8 space-y-5">
                {recipe.method.map((step, index) => (
                  <div key={index} className="group relative pl-14 md:pl-20">
                    {index !== recipe.method.length - 1 && (
                      <div className="absolute left-5 top-12 h-[calc(100%+1.25rem)] w-px bg-stone-200 md:left-7" />
                    )}

                    <span className="absolute left-0 top-0 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-900 ring-8 ring-white md:h-14 md:w-14">
                      {index + 1}
                    </span>

                    <div className="rounded-[1.75rem] border border-stone-200/80 bg-white px-5 py-5 shadow-sm transition group-hover:-translate-y-0.5 group-hover:shadow-md md:px-7 md:py-6">
                      <p className="text-sm leading-7 text-stone-700 md:text-base md:leading-8">
                        {step}
                      </p>
                    </div>
                  </div>
                ))}
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
  const recipe = await getRecipeById(id);

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
