import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import Link from 'next/link';

import {
  FeaturedProjects,
  featuredProjectsQueryKey,
  fetchFeaturedProjects,
  fetchTopBuilders,
  fetchTotal,
  LANDING_REVALIDATE_SECONDS,
  STATS,
  StatsStrip,
  TopBuilders,
  topBuildersQueryKey,
  WantToBuild,
} from '@/components/landing';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { HeroBackground } from '@/components/marketing/hero-background';
import { Section } from '@/components/marketing/section';
import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';

import { mainAppUrl } from '@/lib/main-app';
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

export default async function Home() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60_000,
      },
    },
  });

  await Promise.allSettled([
    ...STATS.map((stat) =>
      queryClient.prefetchQuery({
        queryKey: stat.queryKey,
        queryFn: () =>
          fetchTotal(stat.path, {
            next: { revalidate: LANDING_REVALIDATE_SECONDS },
            signal: AbortSignal.timeout(5000),
          }),
      })
    ),
    queryClient.prefetchQuery({
      queryKey: topBuildersQueryKey,
      queryFn: () =>
        fetchTopBuilders({
          next: { revalidate: LANDING_REVALIDATE_SECONDS },
          signal: AbortSignal.timeout(5000),
        }),
    }),
    queryClient.prefetchQuery({
      queryKey: featuredProjectsQueryKey,
      queryFn: () =>
        fetchFeaturedProjects({
          next: { revalidate: LANDING_REVALIDATE_SECONDS },
          signal: AbortSignal.timeout(5000),
        }),
    }),
  ]);

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
            Explore the projects and creators building across the Boundless
            ecosystem.
          </p>
          <div className='mt-10 flex flex-wrap items-center justify-center gap-4'>
            <Button asChild size='large'>
              <Link href='/builders'>Explore builders</Link>
            </Button>
            <Button intent='secondary' appearance='outline' size='large' asChild>
              <Link href={mainAppUrl('/projects')}>View projects</Link>
            </Button>
          </div>
        </Section>
      </HeroBackground>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <StatsStrip />
        <TopBuilders />
        <FeaturedProjects />
      </HydrationBoundary>
      <WantToBuild />

      <SiteFooter />
    </>
  );
}
