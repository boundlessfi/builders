import { FeatureListSection } from '@/components/marketing/feature-list-section';

const ITEMS = [
  {
    title: 'Builders',
    description:
      "Developers, designers, and product leaders from across the network, each with a profile of what they've shipped.",
  },
  {
    title: 'Projects',
    description:
      'The products being built, launched, and funded on Boundless, with the teams behind them.',
  },
];

/**
 * About-page section introducing what you can explore. Uses the
 * two-column feature-list layout (purple eyebrow + heading on the left, a
 * dash-separated list on the right), mirroring the boundless-platform About
 * mission section.
 */
export function WhatYoullFind() {
  return (
    <FeatureListSection
      eyebrow="What you'll find"
      title='One place to explore the whole ecosystem.'
      items={ITEMS}
    />
  );
}
