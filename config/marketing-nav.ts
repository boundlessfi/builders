/**
 * Navigation data for the public marketing site (header dropdowns, footer
 * columns, social links). Kept here so the header, mobile menu, and footer all
 * read from one source. Product links point at routes that land as those
 * pillars ship; the marketing pages themselves live under `(public)`.
 */

import {
  Award,
  BookOpen,
  Briefcase,
  Building2,
  Coins,
  type LucideIcon,
  Newspaper,
  Palette,
  Target,
  Terminal,
  Trophy,
  Users,
} from 'lucide-react';

import { siteConfig } from '@/lib/seo/site';

/** Helper to create absolute URLs to the main Boundless app. */
function mainAppUrl(path: string): string {
  return `${siteConfig.parentUrl}${path}`;
}

/** Boundless on GitHub, shared by the header nav, footer, and SEO schemas. */
export const githubUrl = 'https://github.com/boundlessfi';

export interface NavItem {
  label: string;
  href: string;
  /** Short supporting line shown in the header mega-menu. */
  description?: string;
  /** Glyph shown beside the label in the header mega-menu. */
  icon?: LucideIcon;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

/** Center dropdown menus in the marketing header. */
export const headerMenus: NavGroup[] = [
  {
    label: 'Builders',
    items: [
      {
        label: 'Builders',
        href: '/builders',
        description: 'Explore the builder directory',
        icon: Users,
      },
      {
        label: 'Projects',
        href: '/projects',
        description: 'Browse projects and creators',
        icon: Trophy,
      },
      {
        label: 'About Builders',
        href: '/about',
        description: 'About this showcase',
        icon: Building2,
      },
    ],
  },
  {
    label: 'Company',
    items: [
      {
        label: 'About Us',
        href: mainAppUrl('/about'),
        description: 'Our mission and the team',
        icon: Building2,
      },
      {
        label: 'Blog',
        href: mainAppUrl('/blog'),
        description: 'Product news and updates',
        icon: Newspaper,
      },
      {
        label: 'Careers',
        href: mainAppUrl('/careers'),
        description: 'Open roles at Boundless',
        icon: Briefcase,
      },
      {
        label: 'Brand Kit',
        href: mainAppUrl('/brand-kit'),
        description: 'Logos, colors, and assets',
        icon: Palette,
      },
    ],
  },
  {
    label: 'Products',
    items: [
      {
        label: 'Hackathons',
        href: mainAppUrl('/hackathons'),
        description: 'Compete and ship projects',
        icon: Trophy,
      },
      {
        label: 'Bounties',
        href: mainAppUrl('/bounties'),
        description: 'Earn for completing tasks',
        icon: Target,
      },
      {
        label: 'Grants',
        href: mainAppUrl('/grants'),
        description: 'Funding for builders',
        icon: Award,
      },
      {
        label: 'Crowdfunding',
        href: mainAppUrl('/crowdfunding'),
        description: 'Raise from the community',
        icon: Coins,
      },
    ],
  },
  {
    label: 'Resources',
    items: [
      {
        label: 'Documentation',
        href: 'https://docs.boundlessfi.xyz',
        description: 'Guides and references',
        icon: BookOpen,
      },
      {
        label: 'GitHub',
        href: githubUrl,
        description: 'Explore our open source',
        icon: Terminal,
      },
    ],
  },
];

/** Footer link columns, mirroring the brand kit footer. */
export const footerColumns: NavGroup[] = [
  {
    label: 'Company',
    items: [
      { label: 'About Us', href: mainAppUrl('/about') },
      { label: 'About Builders', href: '/about' },
      { label: 'Careers', href: mainAppUrl('/careers') },
      { label: 'Brand Kit', href: mainAppUrl('/brand-kit') },
      { label: 'Blog', href: mainAppUrl('/blog') },
    ],
  },
  {
    label: 'Product',
    items: [
      { label: 'Builders', href: '/builders' },
      { label: 'Bounties', href: mainAppUrl('/bounties') },
      { label: 'Hackathons', href: mainAppUrl('/hackathons') },
      { label: 'Crowdfunding', href: mainAppUrl('/crowdfunding') },
      { label: 'Grants', href: mainAppUrl('/grants') },
    ],
  },
  {
    label: 'Resources',
    items: [
      { label: 'Documentation', href: 'https://docs.boundlessfi.xyz' },
      { label: 'FAQs', href: mainAppUrl('/faq') },
      { label: 'GitHub', href: githubUrl },
    ],
  },
  {
    label: 'Legal',
    items: [
      { label: 'Terms', href: mainAppUrl('/terms') },
      { label: 'Privacy', href: mainAppUrl('/privacy') },
      { label: 'Risk Disclosure', href: mainAppUrl('/risk') },
    ],
  },
];

export type SocialKey = 'discord' | 'linkedin' | 'telegram' | 'x' | 'support';

export interface SocialLink {
  key: SocialKey;
  label: string;
  href: string;
}

export const socialLinks: SocialLink[] = [
  { key: 'discord', label: 'Discord', href: 'https://discord.gg/7zJKnpCTKE' },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/boundlesshq',
  },
  { key: 'telegram', label: 'Telegram', href: 'https://t.me/boundlessfi' },
  {
    key: 'x',
    label: '(formerly twitter)',
    href: `https://x.com/${siteConfig.twitterHandle.replace(/^@/, '')}`,
  },
];
