'use client';

import { useFavorites } from '@/app/hooks/useFavorites';
import { useWatchlist } from '@/app/hooks/useWatchlist';
import { useSearchHistory } from '@/app/hooks/useSearchHistory';
import Link from 'next/link';

export default function DashboardPage() {
  const { favorites, isLoaded: favLoaded } = useFavorites();
  const { watchlist, isLoaded: watchLoaded } = useWatchlist();
  const { history, isLoaded: historyLoaded } = useSearchHistory();

  const isLoaded = favLoaded && watchLoaded && historyLoaded;

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-50 dark:bg-black">
        <p className="text-zinc-600 dark:text-zinc-400">Loading...</p>
      </div>
    );
  }

  const wantToWatch = watchlist.filter((m) => m.status === 'want-to-watch').length;
  const watching = watchlist.filter((m) => m.status === 'watching').length;
  const watched = watchlist.filter((m) => m.status === 'watched').length;

  const stats = [
    { label: 'Favorites', value: favorites.length, icon: '♥', color: 'text-red-500' },
    { label: 'Want to Watch', value: wantToWatch, icon: '🎯', color: 'text-blue-500' },
    { label: 'Watching', value: watching, icon: '▶️', color: 'text-yellow-500' },
    { label: 'Watched', value: watched, icon: '✅', color: 'text-green-500' },
    { label: 'Recent Searches', value: history.length, icon: '⏱️', color: 'text-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-8 px-4">
      <main className="w-full max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-black dark:text-white mb-2">
          📊 Your Movie Dashboard
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
          Track your movie journey and discover what's next
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className={`text-4xl mb-2 ${stat.color}`}>{stat.icon}</div>
              <div className="text-3xl font-bold text-black dark:text-white mb-1">
                {stat.value}
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Link
            href="/"
            className="block p-6 rounded-lg bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white transition-all hover:shadow-lg hover:scale-105"
          >
            <div className="text-4xl mb-2">🔍</div>
            <h3 className="text-xl font-bold mb-1">Search</h3>
            <p className="text-green-100">Find new movies to watch</p>
          </Link>

          <Link
            href="/genres"
            className="block p-6 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white transition-all hover:shadow-lg hover:scale-105"
          >
            <div className="text-4xl mb-2">🎬</div>
            <h3 className="text-xl font-bold mb-1">Genres</h3>
            <p className="text-cyan-100">Browse by genre</p>
          </Link>

          <Link
            href="/favorites"
            className="block p-6 rounded-lg bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white transition-all hover:shadow-lg hover:scale-105"
          >
            <div className="text-4xl mb-2">♥</div>
            <h3 className="text-xl font-bold mb-1">Favorites</h3>
            <p className="text-red-100">View your {favorites.length} favorite movies</p>
          </Link>

          <Link
            href="/watchlist"
            className="block p-6 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all hover:shadow-lg hover:scale-105"
          >
            <div className="text-4xl mb-2">📋</div>
            <h3 className="text-xl font-bold mb-1">Watchlist</h3>
            <p className="text-blue-100">Manage your {watchlist.length} watchlist items</p>
          </Link>

          <Link
            href="/recommendations"
            className="block p-6 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white transition-all hover:shadow-lg hover:scale-105"
          >
            <div className="text-4xl mb-2">🎯</div>
            <h3 className="text-xl font-bold mb-1">Recommendations</h3>
            <p className="text-purple-100">Get personalized recommendations</p>
          </Link>

          <Link
            href="/top-rated"
            className="block p-6 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white transition-all hover:shadow-lg hover:scale-105"
          >
            <div className="text-4xl mb-2">⭐</div>
            <h3 className="text-xl font-bold mb-1">Top Rated</h3>
            <p className="text-yellow-100">Discover critically acclaimed films</p>
          </Link>

          <Link
            href="/history"
            className="block p-6 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white transition-all hover:shadow-lg hover:scale-105"
          >
            <div className="text-4xl mb-2">⏱️</div>
            <h3 className="text-xl font-bold mb-1">History</h3>
            <p className="text-orange-100">View your {history.length} recent searches</p>
          </Link>

          <Link
            href="/settings"
            className="block p-6 rounded-lg bg-gradient-to-br from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white transition-all hover:shadow-lg hover:scale-105"
          >
            <div className="text-4xl mb-2">⚙️</div>
            <h3 className="text-xl font-bold mb-1">Settings</h3>
            <p className="text-gray-100">Manage your data</p>
          </Link>
        </div>

        {/* Recent Searches */}
        {history.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
              🔍 Recent Searches
            </h2>
            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
              <div className="flex flex-wrap gap-2">
                {history.slice(0, 10).map((item) => (
                  <Link
                    key={item.timestamp}
                    href={`/?q=${encodeURIComponent(item.query)}`}
                    className="px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors text-sm font-medium"
                  >
                    {item.query}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
