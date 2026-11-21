'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang='en'>
      <body className='flex min-h-screen items-center justify-center bg-[#0d1111] px-5 text-center text-[#f1fff1]'>
        <main className='w-full max-w-lg'>
          <p className='text-sm font-semibold tracking-[0.16em] text-[#2eedaa] uppercase'>
            Boundless Builders
          </p>
          <h1 className='mt-5 text-4xl font-bold'>Something went wrong</h1>
          <p className='mt-4 text-base text-[#999da2]'>
            The site could not load. Please try again.
          </p>
          <div className='mt-8 flex flex-col justify-center gap-3 sm:flex-row'>
            <Button onClick={() => reset()}>Try again</Button>
            <Button intent='secondary' appearance='outline' asChild>
              <Link href='/'>Back to home</Link>
            </Button>
          </div>
        </main>
      </body>
    </html>
  );
}
