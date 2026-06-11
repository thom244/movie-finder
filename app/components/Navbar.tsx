'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const navItems = [
    { href: '/dashboard', label: '📊 Dashboard', icon: 'dashboard' },
    { href: '/', label: '🔍 Search', icon: 'search' },
    { href: '/genres', label: '🎬 Genres', icon: 'genres' },
    { href: '/favorites', label: '♥ Favorites', icon: 'favorites' },
    { href: '/watchlist', label: '📋 Watchlist', icon: 'watchlist' },
    { href: '/top-rated', label: '⭐ Top Rated', icon: 'top-rated' },
    { href: '/recommendations', label: '🎯 Recommendations', icon: 'recommendations' },
    { href: '/history', label: '⏱️ History', icon: 'history' },
    { href: '/settings', label: '⚙️ Settings', icon: 'settings' },
    { href: '/about', label: 'ℹ️ About', icon: 'about' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 dark:from-blue-900 dark:via-blue-950 dark:to-blue-950 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Top bar with logo and title */}
        <div className="flex items-center justify-between mb-3">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-white hover:text-blue-200 transition-colors">
            <span className="text-3xl">🎬</span>
            <span>Movie Finder</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap px-3 py-2 rounded-lg font-medium transition-all text-sm ${
                isActive(item.href)
                  ? 'bg-white text-blue-700 shadow-md'
                  : 'text-blue-100 hover:bg-white/20'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
