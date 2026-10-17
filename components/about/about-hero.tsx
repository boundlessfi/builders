import { HeroSection } from '@/components/marketing/hero-section';
import { PartnerLogos } from '@/components/marketing/partner-logos';

/**
 * About page hero: a brand statement over the starfield with the partner row,
 * mirroring the boundless-platform About hero (left-aligned two-color headline,
 * subheading, partners), adapted for the Builders showcase.
 */
export function AboutHero() {
  return (
    <HeroSection partners={<PartnerLogos />} className='pt-16 lg:pt-36'>
      <h1 className='font-heading text-5xl leading-none font-semibold tracking-tight sm:text-6xl lg:text-[72px] lg:tracking-[-4px]'>
        <span className='text-white'>Meet the People </span>
        <span className='text-primary'>Building the Future</span>
      </h1>
      <p className='mt-4 text-lg leading-[1.2] tracking-[-0.48px] text-text-muted-brand lg:text-2xl'>
        Boundless Builders is a living showcase of the developers, designers, and
        creators shipping across the ecosystem. See who is building, follow their
        work, and watch ideas become real.
      </p>
    </HeroSection>
  );
}
