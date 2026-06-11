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
                <span><strong>Search Movies:</strong> Find any movie by title with instant results</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 dark:text-blue-400 font-bold">❤️</span>
                <span><strong>Save Favorites:</strong> Build and manage your personal movie list</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 dark:text-blue-400 font-bold">⭐</span>
                <span><strong>Top Rated:</strong> Explore the most acclaimed movies of all time</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 dark:text-blue-400 font-bold">📊</span>
                <span><strong>Detailed Information:</strong> View ratings, plots, cast, and more</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 dark:text-blue-400 font-bold">💾</span>
                <span><strong>Persistent Storage:</strong> Your favorites are saved locally</span>
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

          {/* How to Use */}
          <section>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-3">
              📝 How to Use
            </h2>
            <ol className="space-y-3 text-zinc-600 dark:text-zinc-400 list-decimal list-inside">
              <li>
                <span className="font-semibold">Search for Movies:</span> Use the search bar on the home page
                to find movies by title
              </li>
              <li>
                <span className="font-semibold">View Details:</span> Click on any movie card to see full
                information including plot, cast, and ratings
              </li>
              <li>
                <span className="font-semibold">Add to Favorites:</span> Click the heart icon to save movies
                to your favorites list
              </li>
              <li>
                <span className="font-semibold">Manage Favorites:</span> Visit the Favorites page to view
                and manage your saved movies
              </li>
              <li>
                <span className="font-semibold">Discover Top Rated:</span> Explore the top-rated movies
                section for critically acclaimed films
              </li>
            </ol>
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
