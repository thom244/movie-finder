'use client';

import { useState } from 'react';
import { useFavorites } from '@/app/hooks/useFavorites';
import { useWatchlist } from '@/app/hooks/useWatchlist';
import { useSearchHistory } from '@/app/hooks/useSearchHistory';
import { useToast, ToastContainer } from '@/app/components/Toast';

export default function SettingsPage() {
  const { favorites, isLoaded: favLoaded } = useFavorites();
  const { watchlist, isLoaded: watchLoaded } = useWatchlist();
  const { history, isLoaded: historyLoaded } = useSearchHistory();
  const { toasts, showToast } = useToast();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const isLoaded = favLoaded && watchLoaded && historyLoaded;

  const handleExportData = () => {
    const data = {
      favorites,
      watchlist,
      history,
      exportDate: new Date().toISOString(),
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `movie-finder-backup-${Date.now()}.json`;
    link.click();

    showToast('Data exported successfully', 'success');
  };

  const handleClearAllData = () => {
    localStorage.clear();
    showToast('All data cleared', 'success');
    setShowDeleteConfirm(false);
    setTimeout(() => window.location.reload(), 1500);
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-50 dark:bg-black">
        <p className="text-zinc-600 dark:text-zinc-400">Loading...</p>
      </div>
    );
  }

  const totalData = favorites.length + watchlist.length + history.length;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-8 px-4">
      <ToastContainer toasts={toasts} />
      <main className="w-full max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-black dark:text-white mb-8">
          ⚙️ Settings
        </h1>

        {/* Data Management */}
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 mb-6">
          <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
            💾 Data Management
          </h2>

          <div className="space-y-4">
            <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                You have {totalData} items stored locally:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span className="text-zinc-700 dark:text-zinc-300">Favorites:</span>
                  <span className="font-semibold text-black dark:text-white">{favorites.length}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-zinc-700 dark:text-zinc-300">Watchlist items:</span>
                  <span className="font-semibold text-black dark:text-white">{watchlist.length}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-zinc-700 dark:text-zinc-300">Search history:</span>
                  <span className="font-semibold text-black dark:text-white">{history.length}</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleExportData}
              className="w-full px-4 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
            >
              📥 Export Data as JSON
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-red-200 dark:border-red-900 p-6 mb-6">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            ⚠️ Danger Zone
          </h2>

          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            These actions are permanent and cannot be undone.
          </p>

          {showDeleteConfirm ? (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-800 dark:text-red-200 font-semibold mb-4">
                Are you sure? This will delete all your favorites, watchlist, and search history.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleClearAllData}
                  className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
                >
                  Yes, Delete Everything
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-400 text-white font-medium hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full px-4 py-3 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
            >
              🗑️ Clear All Data
            </button>
          )}
        </div>

        {/* About Storage */}
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
          <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
            ℹ️ About Storage
          </h2>

          <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
            <p>
              Movie Finder stores all your data locally on your device using browser localStorage.
              This means:
            </p>

            <ul className="space-y-2 list-disc list-inside">
              <li>Your data is never sent to any server</li>
              <li>Your data is private and stays on your device</li>
              <li>Clearing browser cache will delete your data</li>
              <li>Each browser and device has separate data</li>
              <li>You can export your data at any time</li>
            </ul>

            <p className="pt-4 border-t border-zinc-200 dark:border-zinc-700">
              <span className="font-semibold text-black dark:text-white">Browser localStorage limit:</span> Usually 5-10 MB per domain
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
