# Movie Finder - Project Specification

## App Goal
Build a simple movie search application that allows users to search for movies by title using the OMDb API and display search results with basic movie information (title, year, poster, plot).

## Main React States

```typescript
// Search state
const [searchQuery, setSearchQuery] = useState<string>('');

// Movies list
const [movies, setMovies] = useState<Movie[]>([]);

// Loading state
const [isLoading, setIsLoading] = useState<boolean>(false);

// Error handling
const [error, setError] = useState<string | null>(null);

// Currently selected movie details
const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
```

## Page Structure

```
┌─────────────────────────────────────┐
│         Movie Finder App            │
├─────────────────────────────────────┤
│  [Search Box] [Search Button]       │
│                                     │
├─────────────────────────────────────┤
│         Search Results              │
│  ┌──────────────┬──────────────┐   │
│  │ Movie Card   │ Movie Card   │   │
│  │ [Poster]     │ [Poster]     │   │
│  │ Title        │ Title        │   │
│  │ Year         │ Year         │   │
│  └──────────────┴──────────────┘   │
│                                     │
│  ┌──────────────┬──────────────┐   │
│  │ Movie Card   │ Movie Card   │   │
│  └──────────────┴──────────────┘   │
└─────────────────────────────────────┘
```

## OMDb API Response Fields (Used)

From a search response:
- `Title` - Movie title
- `Year` - Release year
- `imdbID` - Unique OMDb identifier
- `Type` - Type of result (movie, series, episode)
- `Poster` - URL to movie poster image

From a details response:
- `Plot` - Full plot description
- `Actors` - Cast members
- `Director` - Director name
- `imdbRating` - IMDb rating (0-10)
- `Runtime` - Movie duration

## Main User Actions

1. **Enter Search Query**
   - User types movie title in search box
   - State updates: `setSearchQuery(value)`

2. **Submit Search**
   - User clicks "Search" button or presses Enter
   - Triggers API call to OMDb with query
   - Loading state set to `true`
   - Results populate `movies` state

3. **View Results**
   - Movies render as cards in a grid layout
   - Each card shows poster, title, and year
   - Loading indicator shown while fetching

4. **Handle Errors**
   - Invalid API response → `setError()` with message
   - No results found → Display "No movies found"
   - Network error → Display error message

5. **Clear Results**
   - User can clear search and start over
   - State resets: `setMovies([])`, `setSearchQuery('')`

## Setup Requirements

- **API Key**: Get free OMDb API key from https://www.omdbapi.com/
- **Environment Variable**: `NEXT_PUBLIC_OMDB_API_KEY` in `.env.local`
- **API Endpoint**: `https://www.omdbapi.com/?apikey=YOUR_KEY&s=QUERY&type=movie`

## Tech Stack

- **Framework**: Next.js 16 with TypeScript
- **Styling**: Tailwind CSS
- **API Client**: Fetch API
- **State Management**: React Hooks (useState)
