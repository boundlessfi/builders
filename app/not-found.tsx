import type { Metadata } from 'next';
import Link from 'next/link';

import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { HeroBackground } from '@/components/marketing/hero-background';
import { Eyebrow, Section } from '@/components/marketing/section';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'The page you requested could not be found.',
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />

      <HeroBackground fieldHeight={640} fadeBottom>
        <Section className='flex min-h-[60vh] flex-col items-center justify-center py-24 text-center lg:py-32'>
          <Eyebrow>404</Eyebrow>
          <h1 className='mt-6 text-display-sm text-foreground lg:text-display-lg'>
            Page not <span className='text-primary-500'>found</span>
          </h1>
          <p className='mx-auto mt-6 max-w-xl text-body-lg text-muted-foreground'>
            The page you requested could not be found. It may have been moved, renamed, or deleted.
          </p>
          <div className='mt-10 flex flex-wrap items-center justify-center gap-4'>
            <Button asChild size='large'>
              <Link href='/'>Back to home</Link>
            </Button>
            <Button intent='secondary' appearance='outline' size='large' asChild>
              <Link href='/builders'>Explore builders</Link>
            </Button>
          </div>
        </Section>
      </HeroBackground>

      <SiteFooter />
    </>
  );
}
