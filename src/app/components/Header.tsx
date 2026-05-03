import { Menu, Soup, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import SearchRecipes from './SearchRecipes';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/recipes', label: 'Recipes' },
    { href: '/about', label: 'About' },
  ];

  useEffect(() => {
    if (menuRef.current) {
      menuRef.current.style.maxHeight = isMenuOpen
        ? `${menuRef.current.scrollHeight}px`
        : '0';
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [router.pathname]);

  useEffect(() => {
    const query = router.query.q;

    if (typeof query === 'string') {
      setSearchQuery(query);
      return;
    }

    if (router.pathname !== '/recipes') {
      setSearchQuery('');
    }
  }, [router.pathname, router.query.q]);

  const brandName =
    process.env.NEXT_PUBLIC_ENVIRONMENT === 'stage'
      ? 'Recipeasy Staging'
      : 'Recipeasy';

  const linkClasses = (href: string) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
      router.pathname === href
        ? 'bg-emerald-100 text-emerald-900'
        : 'text-stone-600 hover:text-emerald-800'
    }`;

  return (
    <header className="sticky top-0 z-40 px-4 pt-4 md:px-8">
      <nav
        className={`mx-auto max-w-7xl rounded-[2rem] border px-5 py-4 transition-all duration-300 md:px-8 ${
          isScrolled
            ? 'border-white/70 bg-white/85 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl'
            : 'border-white/50 bg-white/70 backdrop-blur-lg'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-[0_12px_24px_rgba(5,150,105,0.25)]">
              <Soup size={22} />
            </span>
            <span className="font-display text-2xl font-black tracking-tight text-stone-900">
              {brandName}
            </span>
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={linkClasses(item.href)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <SearchRecipes
            buttonLabel="Search"
            containerClassName="relative hidden md:block"
            defaultQuery={searchQuery}
            dropdownClassName="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-20 overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.12)]"
            formClassName="flex items-center gap-2 rounded-[1.5rem] border border-stone-200 bg-white p-2 shadow-sm"
            iconClassName="ml-2 text-stone-400"
            inputClassName="w-44 bg-transparent px-1 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none"
            inputId="header-recipe-search"
            onQueryChange={setSearchQuery}
            placeholder="Search recipes"
          />

          <button
            type="button"
            aria-label={
              isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-stone-200 bg-white text-stone-700 md:hidden"
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div
          ref={menuRef}
          className="overflow-hidden transition-[max-height] duration-300 ease-in-out md:hidden"
          style={{ maxHeight: '0' }}
        >
          <div className="flex flex-col gap-2 border-t border-stone-200/80 pt-4">
            <SearchRecipes
              buttonLabel="Go"
              containerClassName="relative mb-2"
              defaultQuery={searchQuery}
              dropdownClassName="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-20 overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.12)]"
              formClassName="rounded-[1.5rem] border border-stone-200 bg-white p-2 shadow-sm"
              iconClassName="ml-2 text-stone-400"
              inputClassName="w-full bg-transparent px-1 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none"
              inputId="header-recipe-search-mobile"
              onQueryChange={setSearchQuery}
              placeholder="Search recipes"
            />
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={linkClasses(item.href)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
