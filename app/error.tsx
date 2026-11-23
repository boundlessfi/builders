'use client';

import Link from 'next/link';

import { HeroBackground } from '@/components/marketing/hero-background';
import { Section } from '@/components/marketing/section';
import { Button } from '@/components/ui/button';

export default function Error({
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <main>
      <HeroBackground fieldHeight={320} fadeBottom>
        <Section className='flex min-h-[70vh] items-center justify-center py-24 text-center'>
          <div className='mx-auto max-w-xl'>
            <p className='text-caption-sm text-primary-500'>Something went wrong</p>
            <h1 className='mt-4 text-display-sm text-foreground'>
              We hit a problem
            </h1>
            <p className='mt-5 text-body-lg text-muted-foreground'>
              This page could not load. Please try again.
            </p>
            <div className='mt-9 flex flex-col justify-center gap-3 sm:flex-row'>
              <Button onClick={() => unstable_retry()}>Try again</Button>
              <Button intent='secondary' appearance='outline' asChild>
                <Link href='/'>Back to home</Link>
              </Button>
            </div>
          </div>
        </Section>
      </HeroBackground>
    </main>
  );
}
