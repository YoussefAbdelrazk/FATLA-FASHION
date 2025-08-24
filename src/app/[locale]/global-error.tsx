'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className='min-h-screen flex items-center justify-center bg-gray-50'>
          <div className='text-center'>
            <h1 className='text-6xl font-bold text-red-600 mb-4'>Error</h1>
            <h2 className='text-2xl font-semibold text-gray-700 mb-4'>Something went wrong!</h2>
            <p className='text-gray-600 mb-8'>An unexpected error occurred. Please try again.</p>
            <button
              onClick={reset}
              className='inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors'
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
