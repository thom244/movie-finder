'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white hover:text-blue-200 transition-colors">
          🎬 Movie Finder
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-6 items-center">
          <Link
            href="/"
            className={`font-medium transition-colors ${
              isActive('/')
                ? 'text-white border-b-2 border-white'
                : 'text-blue-100 hover:text-white'
            }`}
          >
            Search
          </Link>
          <Link
            href="/favorites"
            className={`font-medium transition-colors ${
              isActive('/favorites')
                ? 'text-white border-b-2 border-white'
                : 'text-blue-100 hover:text-white'
            }`}
          >
            ♥ Favorites
          </Link>
          <Link
            href="/top-rated"
            className={`font-medium transition-colors ${
              isActive('/top-rated')
                ? 'text-white border-b-2 border-white'
                : 'text-blue-100 hover:text-white'
            }`}
          >
            ⭐ Top Rated
          </Link>
          <Link
            href="/about"
            className={`font-medium transition-colors ${
              isActive('/about')
                ? 'text-white border-b-2 border-white'
                : 'text-blue-100 hover:text-white'
            }`}
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}
