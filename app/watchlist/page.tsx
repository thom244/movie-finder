'use client';

import { useWatchlist } from '@/app/hooks/useWatchlist';
import { useState } from 'react';
import { useToast, ToastContainer } from '@/app/components/Toast';

interface MovieDetails {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Plot: string;
  Actors: string;
  Director: string;
  imdbRating: string;
  Runtime: string;
  Genre: string;
}

export default function WatchlistPage() {
  const { watchlist, removeFromWatchlist, updateStatus, getByStatus, isLoaded } = useWatchlist();
  const { toasts, showToast } = useToast();
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const wantToWatch = getByStatus('want-to-watch');
  const watching = getByStatus('watching');
  const watched = getByStatus('watched');

  const handleMovieClick = async (movieId: string) => {
    setDetailsLoading(true);
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?i=${movieId}&apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch movie details');
      }

      const data = await response.json();
      setSelectedMovie(data);
    } catch (err) {
      showToast('Error loading movie details', 'error');
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleStatusChange = (imdbID: string, newStatus: 'want-to-watch' | 'watching' | 'watched') => {
    updateStatus(imdbID, newStatus);
    const statusLabels = { 'want-to-watch': 'Want to Watch', watching: 'Watching', watched: 'Watched' };
    showToast(`Status changed to ${statusLabels[newStatus]}`, 'success');
  };

  const handleRemove = (title: string, imdbID: string) => {
    removeFromWatchlist(imdbID);
    showToast(`${title} removed from watchlist`, 'success');
  };

  if (selectedMovie) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-black py-8 px-4">
        <ToastContainer toasts={toasts} />
        <main className="w-full max-w-2xl">
          <button
            onClick={() => setSelectedMovie(null)}
            className="mb-4 px-4 py-2 rounded-lg bg-gray-400 text-white font-medium hover:bg-gray-500 transition-colors"
          >
            ← Back
          </button>

          {detailsLoading ? (
            <div className="text-center py-12">
              <p className="text-zinc-600 dark:text-zinc-400 text-lg">Loading details...</p>
            </div>
          ) : (
            <div className="bg-white dark:bg-zinc-900 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
              <div className="flex flex-col sm:flex-row gap-6 p-6">
                {selectedMovie.Poster !== 'N/A' ? (
                  <img
                    src={selectedMovie.Poster}
                    alt={selectedMovie.Title}
                    className="w-full sm:w-48 h-auto rounded-lg"
                  />
                ) : (
                  <div className="w-full sm:w-48 h-72 bg-zinc-200 dark:bg-zinc-800 rounded-lg flex items-center justify-center">
                    <p className="text-zinc-500">No poster</p>
                  </div>
                )}

                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-black dark:text-white mb-4">
                    {selectedMovie.Title}
                  </h1>

                  <div className="space-y-3 text-sm mb-6">
                    <p className="text-zinc-600 dark:text-zinc-400">
                      <span className="font-semibold text-black dark:text-white">Year:</span> {selectedMovie.Year}
                    </p>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      <span className="font-semibold text-black dark:text-white">Genre:</span> {selectedMovie.Genre}
                    </p>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      <span className="font-semibold text-black dark:text-white">Runtime:</span> {selectedMovie.Runtime}
                    </p>
                    <p className="text-yellow-600 dark:text-yellow-400 font-semibold">
                      ⭐ {selectedMovie.imdbRating}/10
                    </p>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-black dark:text-white mb-2">Plot</h2>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                      {selectedMovie.Plot}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      removeFromWatchlist(selectedMovie.imdbID);
                      setSelectedMovie(null);
                      showToast('Removed from watchlist', 'success');
                    }}
                    className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
                  >
                    Remove from Watchlist
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-black py-8 px-4">
        <p className="text-zinc-600 dark:text-zinc-400 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-8 px-4">
      <ToastContainer toasts={toasts} />
      <main className="w-full max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-black dark:text-white mb-10">
          📋 My Watchlist
        </h1>

        {watchlist.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <p className="text-zinc-500 dark:text-zinc-400 text-lg">Your watchlist is empty!</p>
            <p className="text-zinc-400 dark:text-zinc-500">Start adding movies from search.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Want to Watch */}
            {wantToWatch.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
                  🎯 Want to Watch ({wantToWatch.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {wantToWatch.map((movie) => (
                    <div
                      key={movie.imdbID}
                      className="rounded-lg overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow"
                    >
                      <button
                        onClick={() => handleMovieClick(movie.imdbID)}
                        className="w-full text-left cursor-pointer"
                      >
                        {movie.Poster !== 'N/A' ? (
                          <img
                            src={movie.Poster}
                            alt={movie.Title}
                            className="w-full h-48 object-cover hover:opacity-80 transition-opacity"
                          />
                        ) : (
                          <div className="w-full h-48 bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                            <p className="text-zinc-500 text-sm">No poster</p>
                          </div>
                        )}
                        <div className="p-3">
                          <h3 className="font-semibold text-black dark:text-white mb-1 line-clamp-2 text-sm">
                            {movie.Title}
                          </h3>
                          <p className="text-xs text-zinc-600 dark:text-zinc-400">
                            {movie.Year}
                          </p>
                        </div>
                      </button>
                      <div className="px-3 pb-3 space-y-2">
                        <select
                          value="want-to-watch"
                          onChange={(e) =>
                            handleStatusChange(movie.imdbID, e.target.value as any)
                          }
                          className="w-full px-2 py-1 rounded text-xs bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                        >
                          <option value="want-to-watch">Want to Watch</option>
                          <option value="watching">Watching</option>
                          <option value="watched">Watched</option>
                        </select>
                        <button
                          onClick={() => handleRemove(movie.Title, movie.imdbID)}
                          className="w-full py-1 rounded text-xs bg-red-500 text-white hover:bg-red-600 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Currently Watching */}
            {watching.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
                  ▶️ Currently Watching ({watching.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {watching.map((movie) => (
                    <div
                      key={movie.imdbID}
                      className="rounded-lg overflow-hidden bg-white dark:bg-zinc-900 border-2 border-yellow-400 dark:border-yellow-600 hover:shadow-lg transition-shadow"
                    >
                      <button
                        onClick={() => handleMovieClick(movie.imdbID)}
                        className="w-full text-left cursor-pointer"
                      >
                        {movie.Poster !== 'N/A' ? (
                          <img
                            src={movie.Poster}
                            alt={movie.Title}
                            className="w-full h-48 object-cover hover:opacity-80 transition-opacity"
                          />
                        ) : (
                          <div className="w-full h-48 bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                            <p className="text-zinc-500 text-sm">No poster</p>
                          </div>
                        )}
                        <div className="p-3">
                          <h3 className="font-semibold text-black dark:text-white mb-1 line-clamp-2 text-sm">
                            {movie.Title}
                          </h3>
                          <p className="text-xs text-zinc-600 dark:text-zinc-400">
                            {movie.Year}
                          </p>
                        </div>
                      </button>
                      <div className="px-3 pb-3 space-y-2">
                        <select
                          value="watching"
                          onChange={(e) =>
                            handleStatusChange(movie.imdbID, e.target.value as any)
                          }
                          className="w-full px-2 py-1 rounded text-xs bg-yellow-200 dark:bg-yellow-700 text-black dark:text-white"
                        >
                          <option value="want-to-watch">Want to Watch</option>
                          <option value="watching">Watching</option>
                          <option value="watched">Watched</option>
                        </select>
                        <button
                          onClick={() => handleRemove(movie.Title, movie.imdbID)}
                          className="w-full py-1 rounded text-xs bg-red-500 text-white hover:bg-red-600 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Watched */}
            {watched.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
                  ✅ Watched ({watched.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {watched.map((movie) => (
                    <div
                      key={movie.imdbID}
                      className="rounded-lg overflow-hidden bg-white dark:bg-zinc-900 border-2 border-green-400 dark:border-green-600 hover:shadow-lg transition-shadow opacity-75"
                    >
                      <button
                        onClick={() => handleMovieClick(movie.imdbID)}
                        className="w-full text-left cursor-pointer"
                      >
                        {movie.Poster !== 'N/A' ? (
                          <img
                            src={movie.Poster}
                            alt={movie.Title}
                            className="w-full h-48 object-cover hover:opacity-80 transition-opacity"
                          />
                        ) : (
                          <div className="w-full h-48 bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                            <p className="text-zinc-500 text-sm">No poster</p>
                          </div>
                        )}
                        <div className="p-3">
                          <h3 className="font-semibold text-black dark:text-white mb-1 line-clamp-2 text-sm">
                            {movie.Title}
                          </h3>
                          <p className="text-xs text-zinc-600 dark:text-zinc-400">
                            {movie.Year}
                          </p>
                        </div>
                      </button>
                      <div className="px-3 pb-3 space-y-2">
                        <select
                          value="watched"
                          onChange={(e) =>
                            handleStatusChange(movie.imdbID, e.target.value as any)
                          }
                          className="w-full px-2 py-1 rounded text-xs bg-green-200 dark:bg-green-700 text-black dark:text-white"
                        >
                          <option value="want-to-watch">Want to Watch</option>
                          <option value="watching">Watching</option>
                          <option value="watched">Watched</option>
                        </select>
                        <button
                          onClick={() => handleRemove(movie.Title, movie.imdbID)}
                          className="w-full py-1 rounded text-xs bg-red-500 text-white hover:bg-red-600 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
