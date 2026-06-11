'use client';

import { useFavorites } from '@/app/hooks/useFavorites';
import { useState } from 'react';

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

export default function FavoritesPage() {
  const { favorites, removeFavorite, isLoaded } = useFavorites();
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

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
      console.error('Error loading movie details:', err);
    } finally {
      setDetailsLoading(false);
    }
  };

  if (selectedMovie) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-black py-8 px-4">
        <main className="w-full max-w-2xl">
          <button
            onClick={() => setSelectedMovie(null)}
            className="mb-4 px-4 py-2 rounded-lg bg-gray-400 text-white font-medium hover:bg-gray-500 transition-colors"
          >
            ← Back to Favorites
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
                  <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
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
                    <p className="text-zinc-600 dark:text-zinc-400">
                      <span className="font-semibold text-black dark:text-white">Rating:</span> {selectedMovie.imdbRating}/10
                    </p>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      <span className="font-semibold text-black dark:text-white">Director:</span> {selectedMovie.Director}
                    </p>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      <span className="font-semibold text-black dark:text-white">Actors:</span> {selectedMovie.Actors}
                    </p>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-black dark:text-white mb-2">Plot</h2>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {selectedMovie.Plot}
                    </p>
                  </div>

                  <button
                    onClick={() => removeFavorite(selectedMovie.imdbID)}
                    className="mt-4 px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
                  >
                    ♥ Remove from Favorites
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-black py-8 px-4">
      <main className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-center text-black dark:text-white mb-8">
          ♥ Your Favorite Movies
        </h1>

        {favorites.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <p className="text-zinc-500 dark:text-zinc-400 text-lg mb-4">
              You haven't added any favorites yet!
            </p>
            <p className="text-zinc-400 dark:text-zinc-500">
              Search for movies and click the heart icon to add them here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((movie) => (
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
                      className="w-full h-64 object-cover hover:opacity-80 transition-opacity"
                    />
                  ) : (
                    <div className="w-full h-64 bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                      <p className="text-zinc-500">No poster</p>
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-black dark:text-white mb-2 line-clamp-2">
                      {movie.Title}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {movie.Year}
                    </p>
                  </div>
                </button>
                <div className="px-4 pb-4">
                  <button
                    onClick={() => removeFavorite(movie.imdbID)}
                    className="w-full py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors text-sm"
                  >
                    ♥ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
