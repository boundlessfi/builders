'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function GlobalError({
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang='en' className='dark'>
      <body className='flex min-h-screen items-center justify-center bg-background px-5 text-center text-foreground'>
        <main className='w-full max-w-lg'>
          <p className='text-sm font-semibold tracking-[0.16em] text-primary-500 uppercase'>
            Boundless Builders
          </p>
          <h1 className='mt-5 text-4xl font-bold'>Something went wrong</h1>
          <p className='mt-4 text-base text-muted-foreground'>
            The site could not load. Please try again.
          </p>
          <div className='mt-8 flex flex-col justify-center gap-3 sm:flex-row'>
            <Button onClick={() => unstable_retry()}>Try again</Button>
            <Button intent='secondary' appearance='outline' asChild>
              <Link href='/'>Back to home</Link>
            </Button>
          </div>
        </main>
      </body>
    </html>
  );
}
