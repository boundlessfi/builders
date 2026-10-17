import Link from 'next/link';

import {
  FeaturedProjects,
  StatsStrip,
  TopBuilders,
  WantToBuild,
} from '@/components/landing';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { HeroBackground } from '@/components/marketing/hero-background';
import { Section } from '@/components/marketing/section';
import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';

import { indexableRobots, sharedOpenGraph } from '@/lib/seo/metadata';
import { siteConfig } from '@/lib/seo/site';

export const metadata: Metadata = {
  robots: indexableRobots,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    ...sharedOpenGraph,
    url: '/',
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function Home() {
  return (
    <>
      <SiteHeader />

      <HeroBackground fieldHeight={640} fadeBottom>
        <Section className='py-24 text-center lg:py-32'>
          <div className='inline-flex items-center rounded-full border border-white/10 bg-white/5 p-1 text-body-xs text-white/70'>
            <span className='rounded-full bg-white/10 px-3 py-1 font-medium text-white'>
              Boundless Builders
            </span>
          </div>
          <h1 className='mt-6 text-display-sm text-foreground lg:text-display-lg'>
            Discover the builders shipping on{' '}
            <span className='text-primary-500'>Stellar</span>
          </h1>
          <p className='mx-auto mt-6 max-w-2xl text-body-lg text-muted-foreground'>
            Explore the builders, projects, and creators shipping across the
            Boundless ecosystem.
          </p>
          <div className='mt-10 flex flex-wrap items-center justify-center gap-4'>
            <Button size='large'>Explore builders</Button>
            <Button intent='secondary' appearance='outline' size='large' asChild>
              <Link href='/projects'>View projects</Link>
            </Button>
          </div>
        </Section>
      </HeroBackground>

      <StatsStrip />
      <TopBuilders />
      <FeaturedProjects />
      <WantToBuild />

      <SiteFooter />
    </>
  );
}
