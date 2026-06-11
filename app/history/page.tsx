'use client';

import { useSearchHistory } from '@/app/hooks/useSearchHistory';
import { useRouter } from 'next/navigation';
import { useToast, ToastContainer } from '@/app/components/Toast';

export default function HistoryPage() {
  const { history, clearHistory, isLoaded } = useSearchHistory();
  const router = useRouter();
  const { toasts, showToast } = useToast();

  const handleSearch = (query: string) => {
    router.push(`/?q=${encodeURIComponent(query)}`);
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to clear your search history?')) {
      clearHistory();
      showToast('Search history cleared', 'success');
    }
  };

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
      <main className="w-full max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-black dark:text-white">
            ⏱️ Search History
          </h1>
          {history.length > 0 && (
            <button
              onClick={handleClear}
              className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors text-sm"
            >
              Clear History
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <p className="text-zinc-500 dark:text-zinc-400 text-lg">No search history yet</p>
            <p className="text-zinc-400 dark:text-zinc-500">Your searches will appear here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((item) => {
              const date = new Date(item.timestamp);
              const timeAgo = getTimeAgo(date);
              return (
                <div
                  key={item.timestamp}
                  className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-shadow group"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-black dark:text-white mb-1">
                      {item.query}
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      {timeAgo}
                    </p>
                  </div>
                  <button
                    onClick={() => handleSearch(item.query)}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    Search again
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
}
