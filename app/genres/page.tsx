'use client';

import Link from 'next/link';

const GENRES = [
  { name: 'Action', emoji: '💥', color: 'from-red-500 to-red-600' },
  { name: 'Comedy', emoji: '😂', color: 'from-yellow-500 to-yellow-600' },
  { name: 'Drama', emoji: '🎭', color: 'from-purple-500 to-purple-600' },
  { name: 'Horror', emoji: '👻', color: 'from-gray-700 to-gray-900' },
  { name: 'Romance', emoji: '💕', color: 'from-pink-500 to-pink-600' },
  { name: 'Sci-Fi', emoji: '🚀', color: 'from-blue-500 to-blue-600' },
  { name: 'Thriller', emoji: '😱', color: 'from-orange-600 to-red-700' },
  { name: 'Fantasy', emoji: '🧙', color: 'from-indigo-500 to-indigo-600' },
  { name: 'Animation', emoji: '🎨', color: 'from-cyan-500 to-cyan-600' },
  { name: 'Adventure', emoji: '🗺️', color: 'from-green-500 to-green-600' },
  { name: 'Crime', emoji: '🔍', color: 'from-slate-600 to-slate-800' },
  { name: 'War', emoji: '⚔️', color: 'from-amber-700 to-amber-900' },
];

export default function GenresPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-8 px-4">
      <main className="w-full max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-black dark:text-white mb-2">
          🎬 Browse by Genre
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
          Explore movies by your favorite genres
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {GENRES.map((genre) => (
            <Link
              key={genre.name}
              href={`/?q=${encodeURIComponent(genre.name)}`}
              className={`bg-gradient-to-br ${genre.color} rounded-lg p-6 text-white hover:shadow-xl transition-all hover:scale-105 cursor-pointer`}
            >
              <div className="text-5xl mb-3">{genre.emoji}</div>
              <h3 className="text-xl font-bold">{genre.name}</h3>
              <p className="text-sm opacity-90">Explore {genre.name.toLowerCase()} movies</p>
            </Link>
          ))}
        </div>

        {/* Featured Genres Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-black dark:text-white mb-6">
            ⭐ Popular Right Now
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { genre: 'Trending Action', description: 'Latest action blockbusters', query: 'action' },
              { genre: 'Indie Gems', description: 'Hidden indie masterpieces', query: 'indie' },
              { genre: 'Classics', description: 'Timeless cinema favorites', query: 'classic' },
            ].map((item) => (
              <Link
                key={item.genre}
                href={`/?q=${encodeURIComponent(item.query)}`}
                className="p-6 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <h3 className="text-lg font-bold text-black dark:text-white mb-2">
                  {item.genre}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
