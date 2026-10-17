'use client';

import { siteConfig } from '@/lib/seo/site';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { OpportunityCardSkeleton } from '@/components/cards/opportunity-card-skeleton';
import { OpportunityCard } from '@/components/cards/opportunity-card';
import { ArrowRightIcon } from '@/components/icons';
import { Section, SectionHeading } from '@/components/marketing/section';
import { Button } from '@/components/ui/button';
import { apiFetch } from '@/lib/api/client';
import type { Schemas } from '@/lib/api/types';

import { toProjectCard } from '@/components/discover/to-project-card';

const FEATURED_PROJECTS_SKELETON_COUNT = 3;

function useFeaturedProjects() {
  return useQuery({
    queryKey: ['projects', 'featured'],
    queryFn: () =>
      apiFetch<Schemas['PublicProjectListDto']>('/projects/featured'),
  });
}

function FeaturedProjectsSkeleton() {
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'>
      {Array.from(
        { length: FEATURED_PROJECTS_SKELETON_COUNT },
        (_, index) => (
          <OpportunityCardSkeleton key={index} />
        )
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <p className='text-center text-body-sm text-muted-foreground'>
      No featured projects to show yet.
    </p>
  );
}

export function FeaturedProjects() {
  const { data, isError, isPending } = useFeaturedProjects();
  const projects = data?.data.map(toProjectCard) ?? [];

  return (
    <Section
      reveal
      className='bg-[linear-gradient(180deg,rgba(13,17,17,0)_50%,rgba(46,237,170,0.08)_100%)]'
      innerClassName='flex flex-col gap-8'
    >
      <SectionHeading
        align='left'
        title='Featured projects'
        description='Explore standout projects being built across the Boundless ecosystem.'
        titleClassName='leading-none font-semibold lg:text-5xl lg:tracking-[-1.92px]'
      />

      {isPending ? (
        <FeaturedProjectsSkeleton />
      ) : isError ? (
        <p className='text-center text-body-sm text-muted-foreground'>
          Featured projects could not be loaded right now.
        </p>
      ) : projects.length === 0 ? (
        <EmptyState />
      ) : (
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'>
          {projects.map((project) => (
            <OpportunityCard key={project.id} opportunity={project} />
          ))}
        </div>
      )}

      <div className='flex justify-center'>
        <Button
          intent='secondary'
          appearance='outline'
          size='large'
          asChild
        >
          <Link href={`${siteConfig.parentUrl}/projects`}>
            Browse all projects
            <ArrowRightIcon aria-hidden />
          </Link>
        </Button>
      </div>
    </Section>
  );
}
