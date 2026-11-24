import type { Metadata } from 'next';
import Link from 'next/link';

import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { HeroBackground } from '@/components/marketing/hero-background';
import { Section } from '@/components/marketing/section';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroBackground fieldHeight={360} fadeBottom>
          <Section className='flex min-h-[520px] items-center justify-center py-24 text-center lg:min-h-[600px]'>
            <div className='mx-auto max-w-2xl'>
              <p className='font-heading text-8xl leading-none font-bold text-primary-500 sm:text-9xl'>
                404
              </p>
              <h1 className='mt-6 text-display-sm text-foreground'>
                Page not found
              </h1>
              <p className='mx-auto mt-5 max-w-lg text-body-lg text-muted-foreground'>
                We could not find the page you are looking for. It may have
                moved or the link may be incorrect.
              </p>
              <div className='mt-9 flex flex-col justify-center gap-3 sm:flex-row'>
                <Button asChild>
                  <Link href='/'>Back to home</Link>
                </Button>
                <Button intent='secondary' appearance='outline' asChild>
                  <Link href='/builders'>Explore builders</Link>
                </Button>
              </div>
            </div>
          </Section>
        </HeroBackground>
      </main>
      <SiteFooter />
    </>
  );
}
