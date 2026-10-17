import { buildPageMetadata } from '@/lib/seo/metadata';
import { AboutHero } from '@/components/about/about-hero';
import { WhatYoullFind } from '@/components/about/what-youll-find';
import { WhyWeBuiltThis } from '@/components/about/why-we-built-this';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { CtaBand } from '@/components/marketing/cta-band';
import { JsonLd } from '@/components/seo/json-ld';
import {
  aboutPageSchema,
  breadcrumbSchema,
  homeBreadcrumb,
} from '@/lib/seo/schema';
import { siteConfig } from '@/lib/seo/site';

const ABOUT_DESCRIPTION =
  'Learn why Boundless Builders exists and what you will find here: the builders and projects shipping on Stellar through Boundless.';

export const metadata = buildPageMetadata({
  title: 'About',
  description: ABOUT_DESCRIPTION,
  path: '/about',
});

const aboutSchema = aboutPageSchema({ description: ABOUT_DESCRIPTION });
const aboutBreadcrumbs = breadcrumbSchema([
  homeBreadcrumb,
  { name: 'About', path: '/about' },
]);

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutSchema} />
      <JsonLd data={aboutBreadcrumbs} />

      <SiteHeader />
      <AboutHero />
      <WhyWeBuiltThis />
      <WhatYoullFind />
      <CtaBand
        heading='Want to be a builder?'
        description='Create your profile, join a team, and start shipping on Boundless. Your work belongs in the showcase.'
        action={{
          label: 'Get started on Boundless',
          href: siteConfig.parentUrl,
          external: true,
        }}
      />
      <SiteFooter />
    </>
  );
}
