'use client';

import { useState, useEffect } from 'react';

export interface FavoriteMovie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('movie-favorites');
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (err) {
        console.error('Failed to load favorites:', err);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever favorites change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('movie-favorites', JSON.stringify(favorites));
    }
  }, [favorites, isLoaded]);

  const addFavorite = (movie: FavoriteMovie) => {
    setFavorites((prev) => {
      if (prev.find((m) => m.imdbID === movie.imdbID)) {
        return prev;
      }
      return [...prev, movie];
    });
  };

  const removeFavorite = (imdbID: string) => {
    setFavorites((prev) => prev.filter((m) => m.imdbID !== imdbID));
  };

  const isFavorite = (imdbID: string) => {
    return favorites.some((m) => m.imdbID === imdbID);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    isLoaded,
  };
};
