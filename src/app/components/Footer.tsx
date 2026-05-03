import { ArrowRight, Mail, Soup } from 'lucide-react';
import Link from 'next/link';

const Footer = () => (
  <footer className="px-4 pb-6 pt-16 md:px-8 md:pt-24">
    <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-stone-950 px-6 py-12 text-stone-50 shadow-[0_30px_80px_rgba(28,25,23,0.24)] md:px-12 md:py-16">
      <div className="grid gap-12 md:grid-cols-[1.5fr,1fr,1fr]">
        <div>
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white">
              <Soup size={24} />
            </span>
            <span className="font-display text-3xl font-black tracking-tight">
              Recipeasy
            </span>
          </div>
          <p className="max-w-md text-base leading-7 text-stone-300 md:text-lg">
            Tested home cooking recipes, clear techniques, and practical ideas
            for weeknight dinners and slow weekend projects.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm text-stone-300">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
              <Mail size={16} />
              contact@recipeasy.online
            </span>
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold text-white">
            Explore
          </h2>
          <div className="mt-6 flex flex-col gap-3 text-stone-300">
            <Link href="/" className="transition-colors hover:text-emerald-400">
              Home
            </Link>
            <Link
              href="/recipes"
              className="transition-colors hover:text-emerald-400"
            >
              Recipe Index
            </Link>
            <Link
              href="/about"
              className="transition-colors hover:text-emerald-400"
            >
              About Us
            </Link>
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-emerald-400"
            >
              Privacy Policy
            </Link>
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold text-white">
            Newsletter
          </h2>
          <p className="mt-6 text-sm leading-6 text-stone-300">
            Get a weekly edit of standout recipes and practical kitchen notes.
          </p>
          <form className="mt-6 space-y-3">
            <label htmlFor="email-signup" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              id="email-signup"
              placeholder="Your email address"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-stone-400 focus:border-emerald-500 focus:outline-none"
              disabled
            />
            <button
              type="submit"
              disabled
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-80"
            >
              Subscribe
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-stone-400 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-5">
          <Link
            href="/terms-and-conditions"
            className="transition-colors hover:text-white"
          >
            Terms &amp; Conditions
          </Link>
          <Link
            href="/privacy-policy"
            className="transition-colors hover:text-white"
          >
            Privacy Policy
          </Link>
        </div>
        <p>© 2026 Recipeasy Online. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
