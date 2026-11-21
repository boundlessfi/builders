'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global application error:', error);
  }, [error]);

  return (
    <html lang='en' className='h-full antialiased'>
      <body className='flex min-h-full flex-col items-center justify-center bg-[#0d1111] px-5 text-center text-white'>
        <div className='max-w-md space-y-6'>
          <div className='inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70'>
            Critical Error
          </div>
          <h1 className='text-3xl font-bold tracking-tight sm:text-4xl'>
            Application error
          </h1>
          <p className='text-sm text-neutral-400'>
            A critical error interrupted the application. Please try reloading the page.
          </p>
          <div className='flex items-center justify-center gap-4 pt-2'>
            <button
              type='button'
              onClick={() => reset()}
              className='cursor-pointer rounded-lg bg-[#2eedaa] px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[#2ad89b]'
            >
              Try again
            </button>
            <Link
              href='/'
              className='cursor-pointer rounded-lg border border-white/20 bg-transparent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5'
            >
              Back to home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
