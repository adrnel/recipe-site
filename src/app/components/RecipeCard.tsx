import { Recipe } from '@/types';
import { ArrowRight, ChefHat, Clock, Star, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getRecipeCategory, getTotalMinutes } from './recipeMeta';

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const category = getRecipeCategory(recipe);
  const totalMinutes = getTotalMinutes(recipe);

  return (
    <article
      className="group h-full overflow-hidden rounded-[2rem] border border-stone-200/70 bg-white/90 shadow-[0_24px_60px_rgba(15,23,42,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(15,23,42,0.14)]"
      data-testid="recipe-card"
    >
      <Link href={`/recipes/${recipe.id}`} className="flex h-full flex-col">
        <div className="relative h-72 overflow-hidden">
          <Image
            src={recipe.image}
            alt={recipe.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/5 to-transparent" />
          <div className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-stone-700 shadow-sm backdrop-blur">
            {category}
          </div>
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
            <div className="rounded-2xl bg-white/12 px-4 py-3 text-white backdrop-blur-md">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Star size={15} className="fill-amber-400 text-amber-400" />
                {recipe.rating}
                <span className="text-xs font-medium text-white/70">
                  ({recipe.ratingsCount})
                </span>
              </div>
            </div>
            <div className="rounded-full bg-white text-stone-900 p-3 shadow-lg transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight size={18} />
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h2 className="font-display text-3xl font-bold leading-tight text-stone-900 transition-colors group-hover:text-emerald-800">
            {recipe.name}
          </h2>
          <p className="mt-3 text-sm leading-7 text-stone-600">
            {recipe.summary}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3 border-t border-stone-100 pt-5 text-center text-xs text-stone-500">
            <div className="rounded-2xl bg-stone-50 px-3 py-3">
              <Clock size={16} className="mx-auto mb-2 text-emerald-700" />
              <div className="font-semibold text-stone-900">
                {totalMinutes} mins
              </div>
              <div>Total</div>
            </div>
            <div className="rounded-2xl bg-stone-50 px-3 py-3">
              <ChefHat size={16} className="mx-auto mb-2 text-emerald-700" />
              <div className="font-semibold text-stone-900">
                {recipe.difficulty}
              </div>
              <div>Level</div>
            </div>
            <div className="rounded-2xl bg-stone-50 px-3 py-3">
              <Users size={16} className="mx-auto mb-2 text-emerald-700" />
              <div className="font-semibold text-stone-900">
                {recipe.serves}
              </div>
              <div>Serves</div>
            </div>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-800">
            View Recipe
            <ArrowRight size={16} />
          </div>
        </div>
      </Link>
    </article>
  );
};

export default RecipeCard;
