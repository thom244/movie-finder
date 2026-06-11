'use client';

import { useState } from 'react';
import { useFavorites } from '@/app/hooks/useFavorites';

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
}

interface MovieDetails extends Movie {
  Plot: string;
  Actors: string;
  Director: string;
  imdbRating: string;
  Runtime: string;
  Genre: string;
}

const TOP_MOVIES = [
  'The Shawshank Redemption',
  'The Godfather',
  'Inception',
  'Pulp Fiction',
  'Forrest Gump',
  'The Dark Knight',
  'Interstellar',
  'Gladiator',
  'Titanic',
  'Avatar',
];

export default function TopRatedPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const { addFavorite, removeFavorite, isFavorite, isLoaded } = useFavorites();

  const handleLoadTopRated = async () => {
    setIsLoading(true);
    const allMovies: Movie[] = [];

    for (const title of TOP_MOVIES) {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?s=${encodeURIComponent(title)}&type=movie&apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}`
        );

        if (response.ok) {
          const data = await response.json();
          if (data.Search && data.Search.length > 0) {
            allMovies.push(data.Search[0]);
          }
        }
      } catch (err) {
        console.error('Error fetching:', title);
      }
    }

    setMovies(allMovies);
    setIsLoading(false);
  };

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

  const handleToggleFavorite = (movie: Movie) => {
    if (isFavorite(movie.imdbID)) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite({
        imdbID: movie.imdbID,
        Title: movie.Title,
        Year: movie.Year,
        Poster: movie.Poster,
      });
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
                  <div className="flex items-start justify-between mb-2">
                    <h1 className="text-3xl font-bold text-black dark:text-white">
                      {selectedMovie.Title}
                    </h1>
                  </div>

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
                    <p className="text-yellow-600 dark:text-yellow-400 text-lg font-semibold">
                      ⭐ Rating: {selectedMovie.imdbRating}/10
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
                    onClick={() => handleToggleFavorite(selectedMovie)}
                    className={`mt-4 px-4 py-2 rounded-lg font-medium transition-colors ${
                      isFavorite(selectedMovie.imdbID)
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-gray-400 text-white hover:bg-gray-500'
                    }`}
                  >
                    {isFavorite(selectedMovie.imdbID) ? '♥ Favorited' : '♡ Add to Favorites'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-black py-8 px-4">
      <main className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-center text-black dark:text-white mb-2">
          ⭐ Top Rated Movies
        </h1>
        <p className="text-center text-zinc-600 dark:text-zinc-400 mb-8">
          Discover some of the most highly-rated films of all time
        </p>

        {movies.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <button
              onClick={handleLoadTopRated}
              className="px-8 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors text-lg"
            >
              Load Top Rated Movies
            </button>
          </div>
        )}

        {isLoading && (
          <div className="text-center py-12">
            <p className="text-zinc-600 dark:text-zinc-400 text-lg">Loading top rated movies...</p>
          </div>
        )}

        {movies.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map((movie) => (
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
                    onClick={() => handleToggleFavorite(movie)}
                    disabled={!isLoaded}
                    className={`w-full py-2 rounded-lg font-medium transition-colors text-sm ${
                      isFavorite(movie.imdbID)
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-gray-200 text-black hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
                    }`}
                  >
                    {isFavorite(movie.imdbID) ? '♥' : '♡'} Add to Favorites
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
