/**
 * Navigation data for the public marketing site (header dropdowns, footer
 * columns, social links). Kept here so the header, mobile menu, and footer all
 * read from one source.
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
} from 'lucide-react';

import { siteConfig } from '@/lib/seo/site';

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
    label: 'Company',
    items: [
      {
        label: 'About Us',
        href: `${siteConfig.parentUrl}/about`,
        description: 'Our mission and the team',
        icon: Building2,
      },
      {
        label: 'Blog',
        href: `${siteConfig.parentUrl}/blog`,
        description: 'Product news and updates',
        icon: Newspaper,
      },
      {
        label: 'Careers',
        href: `${siteConfig.parentUrl}/careers`,
        description: 'Open roles at Boundless',
        icon: Briefcase,
      },
      {
        label: 'Brand Kit',
        href: `${siteConfig.parentUrl}/brand-kit`,
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
        href: `${siteConfig.parentUrl}/hackathons`,
        description: 'Compete and ship projects',
        icon: Trophy,
      },
      {
        label: 'Bounties',
        href: `${siteConfig.parentUrl}/bounties`,
        description: 'Earn for completing tasks',
        icon: Target,
      },
      {
        label: 'Grants',
        href: `${siteConfig.parentUrl}/grants`,
        description: 'Funding for builders',
        icon: Award,
      },
      {
        label: 'Crowdfunding',
        href: `${siteConfig.parentUrl}/crowdfunding`,
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
      { label: 'About Us', href: `${siteConfig.parentUrl}/about` },
      { label: 'About Builders', href: '/about' },
      { label: 'Careers', href: `${siteConfig.parentUrl}/careers` },
      { label: 'Brand Kit', href: `${siteConfig.parentUrl}/brand-kit` },
      { label: 'Blog', href: `${siteConfig.parentUrl}/blog` },
    ],
  },
  {
    label: 'Product',
    items: [
      { label: 'Bounties', href: `${siteConfig.parentUrl}/bounties` },
      { label: 'Hackathons', href: `${siteConfig.parentUrl}/hackathons` },
      { label: 'Crowdfunding', href: `${siteConfig.parentUrl}/crowdfunding` },
      { label: 'Grants', href: `${siteConfig.parentUrl}/grants` },
    ],
  },
  {
    label: 'Resources',
    items: [
      { label: 'Documentation', href: 'https://docs.boundlessfi.xyz' },
      { label: 'FAQs', href: `${siteConfig.parentUrl}/faq` },
      { label: 'GitHub', href: githubUrl },
    ],
  },
  {
    label: 'Legal',
    items: [
      { label: 'Terms', href: `${siteConfig.parentUrl}/terms` },
      { label: 'Privacy', href: `${siteConfig.parentUrl}/privacy` },
      { label: 'Risk Disclosure', href: `${siteConfig.parentUrl}/risk` },
    ],
  },
];

export type SocialKey = 'discord' | 'linkedin' | 'telegram' | 'x';

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
