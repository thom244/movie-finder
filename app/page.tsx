'use client';

import { Suspense } from 'react';
import { SearchContent } from './SearchContent';

export default function Home() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-zinc-50 dark:bg-black"><p className="text-zinc-600 dark:text-zinc-400">Loading...</p></div>}>
      <SearchContent />
    </Suspense>
  );
}

}
