import './globals.css';

import type { Metadata, Viewport } from 'next';
import { Bebas_Neue, Plus_Jakarta_Sans } from 'next/font/google';

import { JsonLd } from '@/components/seo/json-ld';
import { sharedOpenGraph, sharedTwitter } from '@/lib/seo/metadata';
import { organizationSchema, webSiteSchema } from '@/lib/seo/schema';
import { siteConfig } from '@/lib/seo/site';
import { Providers } from '@/providers';

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
});

const bebasNeue = Bebas_Neue({
  variable: '--font-bebas',
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  // Throws on a malformed NEXT_PUBLIC_SITE_URL so a bad value fails the build
  // instead of silently resolving every canonical to localhost.
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  keywords: [
    'Stellar',
    'builders',
    'web3 projects',
    'Boundless',
    'developers',
  ],
  openGraph: {
    ...sharedOpenGraph,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    ...sharedTwitter,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0d1111' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
      className={`${jakarta.variable} ${bebasNeue.variable} h-full antialiased`}
    >
      <body className='flex min-h-full flex-col'>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={webSiteSchema()} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
