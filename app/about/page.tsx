export default function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-black py-8 px-4">
      <main className="w-full max-w-3xl">
        <h1 className="text-4xl font-bold text-center text-black dark:text-white mb-8">
          About Movie Finder
        </h1>

        <div className="space-y-6 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-8">
          {/* Overview */}
          <section>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-3">
              🎬 What is Movie Finder?
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Movie Finder is a simple and intuitive application that helps you search for movies,
              discover top-rated films, and build your personal favorites list. Powered by the OMDb API,
              you can find detailed information about millions of movies including ratings, plots,
              directors, and cast members.
            </p>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-3">
              ✨ Key Features
            </h2>
            <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 dark:text-blue-400 font-bold">🔍</span>
                <span><strong>Smart Search:</strong> Find any movie by title with instant results</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 dark:text-blue-400 font-bold">♥</span>
                <span><strong>Favorites:</strong> Build and manage your personal movie collection</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 dark:text-blue-400 font-bold">📋</span>
                <span><strong>Watchlist Manager:</strong> Track movies you want to watch, are watching, and have watched</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 dark:text-blue-400 font-bold">⭐</span>
                <span><strong>Top Rated:</strong> Explore the most acclaimed movies of all time</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 dark:text-blue-400 font-bold">🎯</span>
                <span><strong>Personalized Recommendations:</strong> Get genre-based movie suggestions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 dark:text-blue-400 font-bold">⏱️</span>
                <span><strong>Search History:</strong> Track and revisit your previous searches</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 dark:text-blue-400 font-bold">📊</span>
                <span><strong>Dashboard:</strong> View statistics and quick access to all features</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 dark:text-blue-400 font-bold">📱</span>
                <span><strong>Responsive Design:</strong> Works seamlessly on desktop, tablet, and mobile</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 dark:text-blue-400 font-bold">💾</span>
                <span><strong>Persistent Storage:</strong> All your data is saved locally in your browser</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 dark:text-blue-400 font-bold">🔔</span>
                <span><strong>Toast Notifications:</strong> Get real-time feedback on your actions</span>
              </li>
            </ul>
          </section>

          {/* Technology */}
          <section>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-3">
              🛠️ Built With
            </h2>
            <div className="grid grid-cols-2 gap-4 text-zinc-600 dark:text-zinc-400">
              <div>
                <p className="font-semibold text-black dark:text-white">Frontend</p>
                <ul className="text-sm space-y-1">
                  <li>• Next.js 16</li>
                  <li>• React 19</li>
                  <li>• TypeScript</li>
                  <li>• Tailwind CSS</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-black dark:text-white">API & Storage</p>
                <ul className="text-sm space-y-1">
                  <li>• OMDb API</li>
                  <li>• localStorage</li>
                  <li>• Fetch API</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Pages & Features */}
          <section>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-3">
              🗂️ Pages & Features
            </h2>
            <div className="space-y-4 text-zinc-600 dark:text-zinc-400">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-black dark:text-white mb-1">🔍 Search</h3>
                  <p className="text-sm">Find movies by title. Search history is tracked automatically.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-black dark:text-white mb-1">📊 Dashboard</h3>
                  <p className="text-sm">View your stats, recent searches, and quick access to all features.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-black dark:text-white mb-1">🎬 Genres</h3>
                  <p className="text-sm">Browse movies by genre or explore trending categories.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-black dark:text-white mb-1">♥ Favorites</h3>
                  <p className="text-sm">Manage your collection of favorite movies.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-black dark:text-white mb-1">📋 Watchlist</h3>
                  <p className="text-sm">Track movies with three statuses: Want to Watch, Watching, Watched.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-black dark:text-white mb-1">⭐ Top Rated</h3>
                  <p className="text-sm">Discover the world's most critically acclaimed films.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-black dark:text-white mb-1">🎯 Recommendations</h3>
                  <p className="text-sm">Get personalized recommendations based on genres you select.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-black dark:text-white mb-1">⏱️ History</h3>
                  <p className="text-sm">View and manage your search history.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-black dark:text-white mb-1">⚙️ Settings</h3>
                  <p className="text-sm">Export your data or clear all information from your browser.</p>
                </div>
              </div>
            </div>
          </section>

          {/* API Info */}
          <section>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-3">
              🔗 Data Source
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Movie data is provided by the{' '}
              <a
                href="https://www.omdbapi.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
              >
                OMDb (Open Movie Database) API
              </a>
              , a free web service to obtain movie information. Movie Finder is a fan-made application
              and is not affiliated with OMDb.
            </p>
          </section>

          {/* Footer */}
          <section className="border-t border-zinc-200 dark:border-zinc-800 pt-6">
            <p className="text-center text-sm text-zinc-500 dark:text-zinc-500">
              Made with ❤️ for movie enthusiasts • Version 1.0.0
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
