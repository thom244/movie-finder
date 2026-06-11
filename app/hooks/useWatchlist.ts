'use client';

import { useState, useEffect } from 'react';

export interface WatchlistMovie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  status: 'want-to-watch' | 'watching' | 'watched';
  addedDate: number;
}

export const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState<WatchlistMovie[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('movie-watchlist');
    if (stored) {
      try {
        setWatchlist(JSON.parse(stored));
      } catch (err) {
        console.error('Failed to load watchlist:', err);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('movie-watchlist', JSON.stringify(watchlist));
    }
  }, [watchlist, isLoaded]);

  const addToWatchlist = (movie: Omit<WatchlistMovie, 'status' | 'addedDate'>) => {
    setWatchlist((prev) => {
      if (prev.find((m) => m.imdbID === movie.imdbID)) {
        return prev;
      }
      return [...prev, { ...movie, status: 'want-to-watch', addedDate: Date.now() }];
    });
  };

  const removeFromWatchlist = (imdbID: string) => {
    setWatchlist((prev) => prev.filter((m) => m.imdbID !== imdbID));
  };

  const updateStatus = (imdbID: string, status: 'want-to-watch' | 'watching' | 'watched') => {
    setWatchlist((prev) =>
      prev.map((m) => (m.imdbID === imdbID ? { ...m, status } : m))
    );
  };

  const isInWatchlist = (imdbID: string) => {
    return watchlist.some((m) => m.imdbID === imdbID);
  };

  const getByStatus = (status: 'want-to-watch' | 'watching' | 'watched') => {
    return watchlist.filter((m) => m.status === status);
  };

  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    updateStatus,
    isInWatchlist,
    getByStatus,
    isLoaded,
  };
};
