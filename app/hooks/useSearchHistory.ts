'use client';

import { useState, useEffect } from 'react';

export interface SearchHistoryItem {
  query: string;
  timestamp: number;
}

export const useSearchHistory = () => {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('search-history');
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch (err) {
        console.error('Failed to load search history:', err);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('search-history', JSON.stringify(history));
    }
  }, [history, isLoaded]);

  const addSearch = (query: string) => {
    setHistory((prev) => {
      const filtered = prev.filter((item) => item.query.toLowerCase() !== query.toLowerCase());
      return [{ query, timestamp: Date.now() }, ...filtered].slice(0, 20);
    });
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return {
    history,
    addSearch,
    clearHistory,
    isLoaded,
  };
};
