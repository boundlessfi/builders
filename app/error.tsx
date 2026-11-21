'use client';

import Link from 'next/link';
import { useEffect } from 'react';

import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { HeroBackground } from '@/components/marketing/hero-background';
import { Eyebrow, Section } from '@/components/marketing/section';
import { Button } from '@/components/ui/button';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled route error:', error);
  }, [error]);

  return (
    <>
      <SiteHeader />

      <HeroBackground fieldHeight={640} fadeBottom>
        <Section className='flex min-h-[60vh] flex-col items-center justify-center py-24 text-center lg:py-32'>
          <Eyebrow className='border-error-500/20 bg-error-500/10 text-error-400'>
            Error
          </Eyebrow>
          <h1 className='mt-6 text-display-sm text-foreground lg:text-display-lg'>
            Something went <span className='text-primary-500'>wrong</span>
          </h1>
          <p className='mx-auto mt-6 max-w-xl text-body-lg text-muted-foreground'>
            An unexpected error occurred while loading this page. Please try again or return home.
          </p>
          <div className='mt-10 flex flex-wrap items-center justify-center gap-4'>
            <Button size='large' onClick={() => reset()}>
              Try again
            </Button>
            <Button intent='secondary' appearance='outline' size='large' asChild>
              <Link href='/'>Back to home</Link>
            </Button>
          </div>
        </Section>
      </HeroBackground>

      <SiteFooter />
    </>
  );
}
