'use client';

import { useState } from 'react';

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

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [detailsLoading, setDetailsLoading] = useState<boolean>(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setError('Please enter a movie title');
      return;
    }

    setIsLoading(true);
    setError(null);
    setMovies([]);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${encodeURIComponent(searchQuery)}&type=movie&apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();
      
      if (data.Response === 'False') {
        setError(data.Error || 'No movies found');
        setMovies([]);
      } else {
        setMovies(data.Search || []);
      }
    } catch (err) {
      setError('Error searching movies. Make sure your OMDb API key is set.');
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
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
      setError('Error loading movie details');
    } finally {
      setDetailsLoading(false);
    }
  };

  // Show movie details modal
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
                {/* Poster */}
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

                {/* Details */}
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
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }

  // Show search results
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-black py-8 px-4">
      <main className="w-full max-w-4xl">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-black dark:text-white mb-8">
          Movie Finder
        </h1>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-8">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a movie..."
            className="flex-1 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700">
            <p className="text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <p className="text-zinc-600 dark:text-zinc-400 text-lg">Loading...</p>
          </div>
        )}

        {/* Results Area */}
        {!isLoading && movies.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map((movie) => (
              <button
                key={movie.imdbID}
                onClick={() => handleMovieClick(movie.imdbID)}
                className="rounded-lg overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow text-left cursor-pointer"
              >
                {movie.Poster !== 'N/A' ? (
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="w-full h-64 object-cover"
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
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && movies.length === 0 && !error && (
          <div className="text-center py-12">
            <p className="text-zinc-500 dark:text-zinc-400 text-lg">
              Search for a movie to get started
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
