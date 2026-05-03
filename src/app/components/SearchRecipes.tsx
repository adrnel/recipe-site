import { Recipe } from '@/types';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FormEvent, useEffect, useRef, useState } from 'react';

interface SearchRecipesProps {
  buttonLabel?: string;
  buttonClassName?: string;
  containerClassName?: string;
  defaultQuery?: string;
  dropdownClassName?: string;
  formClassName?: string;
  iconClassName?: string;
  inputClassName?: string;
  inputId?: string;
  onQueryChange?: (query: string) => void;
  placeholder?: string;
  recipes?: Recipe[];
  submitEmptyToRecipes?: boolean;
}

const SearchRecipes = ({
  buttonLabel = 'Search',
  buttonClassName = 'rounded-[1rem] bg-stone-950 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-800',
  containerClassName,
  defaultQuery = '',
  dropdownClassName = 'absolute left-0 right-0 top-[calc(100%+0.5rem)] z-20 overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.12)]',
  formClassName = 'flex items-center gap-2 rounded-[1.5rem] border border-stone-200 bg-white p-2 shadow-sm',
  iconClassName = 'ml-2 text-stone-400',
  inputClassName = 'w-full bg-transparent px-1 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none',
  inputId,
  onQueryChange,
  placeholder = 'Search for recipe',
  recipes: recipesProp,
  submitEmptyToRecipes = true,
}: SearchRecipesProps) => {
  const [recipes, setRecipes] = useState<Recipe[]>(recipesProp ?? []);
  const [searchQuery, setSearchQuery] = useState(defaultQuery);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    setSearchQuery(defaultQuery);
  }, [defaultQuery]);

  useEffect(() => {
    if (recipesProp) {
      setRecipes(recipesProp);
    }
  }, [recipesProp]);

  useEffect(() => {
    if (recipesProp) {
      return;
    }

    const fetchRecipes = async () => {
      try {
        const response = await fetch('/data/recipes.json');
        const data: Recipe[] = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error('Failed to fetch recipes:', error);
      }
    };

    fetchRecipes();
  }, [recipesProp]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      setSearchQuery('');
      setIsOpen(false);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextQuery = event.target.value;
    setSearchQuery(nextQuery);
    onQueryChange?.(nextQuery);
    if (nextQuery.trim() !== '') {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = searchQuery.trim();

    setIsOpen(false);

    if (query.length > 0) {
      void router.push({ pathname: '/recipes', query: { q: query } });
      return;
    }

    if (submitEmptyToRecipes) {
      void router.push('/recipes');
    }
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div ref={containerRef} className={containerClassName ?? 'relative'}>
      <form
        onSubmit={handleSearchSubmit}
        className={formClassName}
        role="search"
      >
        <label htmlFor={inputId} className="sr-only">
          Search recipes
        </label>
        <Search size={16} className={iconClassName} />
        <input
          id={inputId}
          type="text"
          placeholder={placeholder}
          className={inputClassName}
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => searchQuery.trim() !== '' && setIsOpen(true)}
        />
        <button type="submit" className={buttonClassName}>
          {buttonLabel}
        </button>
      </form>
      {isOpen && searchQuery && (
        <div className={dropdownClassName}>
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <Link
                key={recipe.id}
                href={`/recipes/${recipe.id}`}
                className="block border-b border-stone-100 px-4 py-3 text-sm text-stone-700 transition-colors last:border-b-0 hover:bg-stone-50"
                onClick={() => setIsOpen(false)}
              >
                <span className="font-semibold text-stone-900">
                  {recipe.name}
                </span>
              </Link>
            ))
          ) : (
            <div className="px-4 py-3 text-sm text-stone-500">
              No results found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchRecipes;
