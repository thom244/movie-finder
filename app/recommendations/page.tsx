'use client';

import { useState } from 'react';
import { useFavorites } from '@/app/hooks/useFavorites';
import { useWatchlist } from '@/app/hooks/useWatchlist';
import { useToast, ToastContainer } from '@/app/components/Toast';

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

const RECOMMENDATION_KEYWORDS = {
  action: ['The Dark Knight', 'John Wick', 'Mission Impossible', 'Fast Five', 'Atomic Blonde'],
  comedy: ['Superbad', 'Bridesmaids', 'The Grand Budapest Hotel', 'Knives Out', 'Rush Hour'],
  drama: ['The Shawshank Redemption', 'Moonlight', 'Parasite', 'Babel', 'Birdman'],
  horror: ['The Conjuring', 'Hereditary', 'Get Out', 'A Quiet Place', 'The Ring'],
  scifi: ['Inception', 'Interstellar', 'Blade Runner 2049', 'The Matrix', 'Dune'],
  romance: ['The Notebook', 'La La Land', 'Eternal Sunshine', 'Pride and Prejudice', 'Titanic'],
};

export default function RecommendationsPage() {
  const { addFavorite, isFavorite } = useFavorites();
  const { addToWatchlist, isInWatchlist } = useWatchlist();
  const { toasts, showToast } = useToast();
  const [selectedGenre, setSelectedGenre] = useState<keyof typeof RECOMMENDATION_KEYWORDS>('action');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const handleLoadRecommendations = async () => {
    setIsLoading(true);
    const allMovies: Movie[] = [];

    for (const title of RECOMMENDATION_KEYWORDS[selectedGenre]) {
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
      showToast('Error loading movie details', 'error');
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleAddToFavorites = (movie: Movie) => {
    if (!isFavorite(movie.imdbID)) {
      addFavorite({
        imdbID: movie.imdbID,
        Title: movie.Title,
        Year: movie.Year,
        Poster: movie.Poster,
      });
      showToast(`${movie.Title} added to favorites`, 'success');
    }
  };

  const handleAddToWatchlist = (movie: Movie) => {
    if (!isInWatchlist(movie.imdbID)) {
      addToWatchlist({
        imdbID: movie.imdbID,
        Title: movie.Title,
        Year: movie.Year,
        Poster: movie.Poster,
      });
      showToast(`${movie.Title} added to watchlist`, 'success');
    }
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
                    <p className="text-yellow-600 dark:text-yellow-400 font-semibold">
                      ⭐ {selectedMovie.imdbRating}/10
                    </p>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      <span className="font-semibold text-black dark:text-white">Director:</span> {selectedMovie.Director}
                    </p>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-black dark:text-white mb-2">Plot</h2>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                      {selectedMovie.Plot}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        handleAddToFavorites(selectedMovie);
                      }}
                      className="w-full px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
                    >
                      ♥ Add to Favorites
                    </button>
                    <button
                      onClick={() => {
                        handleAddToWatchlist(selectedMovie);
                      }}
                      className="w-full px-4 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors"
                    >
                      📋 Add to Watchlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-8 px-4">
      <ToastContainer toasts={toasts} />
      <main className="w-full max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-black dark:text-white mb-8">
          🎯 Personalized Recommendations
        </h1>

        {/* Genre Selection */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-8">
          {Object.keys(RECOMMENDATION_KEYWORDS).map((genre) => (
            <button
              key={genre}
              onClick={() => {
                setSelectedGenre(genre as keyof typeof RECOMMENDATION_KEYWORDS);
                setMovies([]);
              }}
              className={`px-4 py-3 rounded-lg font-medium transition-all capitalize ${
                selectedGenre === genre
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white dark:bg-zinc-900 text-black dark:text-white border border-zinc-200 dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-800'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {movies.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-zinc-600 dark:text-zinc-400 text-lg mb-4">
              Select a genre and discover movies tailored to your taste
            </p>
            <button
              onClick={handleLoadRecommendations}
              className="px-8 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors text-lg"
            >
              Get Recommendations
            </button>
          </div>
        )}

        {isLoading && (
          <div className="text-center py-12">
            <p className="text-zinc-600 dark:text-zinc-400 text-lg">Finding recommendations...</p>
          </div>
        )}

        {movies.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <div className="px-4 pb-4 space-y-2">
                  <button
                    onClick={() => handleAddToFavorites(movie)}
                    className="w-full py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors text-sm"
                  >
                    ♥ Add to Favorites
                  </button>
                  <button
                    onClick={() => handleAddToWatchlist(movie)}
                    className="w-full py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors text-sm"
                  >
                    📋 Add to Watchlist
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
