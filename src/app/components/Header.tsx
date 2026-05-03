import { BookOpen, Menu, Search, Soup, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const navItems = [
    { href: '/', label: 'Inspiration' },
    { href: '/recipes', label: 'Recipe Index' },
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

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/recipes"
              aria-label="Search recipes"
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-stone-200 bg-white text-stone-600 transition-colors hover:border-emerald-200 hover:text-emerald-700"
            >
              <Search size={18} />
            </Link>
            <Link
              href="/recipes"
              className="inline-flex items-center gap-2 rounded-2xl bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-800"
            >
              <BookOpen size={18} />
              Browse Recipes
            </Link>
          </div>

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
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={linkClasses(item.href)}
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => router.push('/recipes')}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-stone-950 px-5 py-3 text-sm font-semibold text-white"
            >
              <Search size={18} />
              Search Recipes
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
