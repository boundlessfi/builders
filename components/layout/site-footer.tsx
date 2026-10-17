import { siteConfig } from '@/lib/seo/site';
import Image from 'next/image';
import Link from 'next/link';

import { SocialGlyph } from '@/components/layout/brand-icons';
import { FooterGlow } from '@/components/layout/footer-glow';
import { Button } from '@/components/ui/button';
import { footerColumns, socialLinks } from '@/config/marketing-nav';

function externalLinkProps(href: string) {
  return href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {};
}

export function SiteFooter() {
  return (
    <footer className='bg-background px-4 pt-24 pb-10 sm:px-6 lg:px-10 lg:pt-28 lg:pb-12'>
      <div className='mx-auto flex w-full max-w-page flex-col gap-4 lg:flex-row lg:gap-2'>
        {/* Main card */}
        <div className='relative flex-1 rounded-2xl border border-white/8 bg-card/80'>
          <FooterGlow />
          <div className='relative flex flex-col'>
            {/* Raw Image so the wordmark scales to the full card width. */}
            <div className='px-6 py-6 sm:px-8 lg:px-10 lg:py-5'>
              <Image
                src='/brand/boundless-logo-dark.svg'
                alt='Boundless'
                width={437}
                height={69}
                priority
                unoptimized
                className='block h-auto w-full max-w-[895px]'
              />
            </div>

            <div className='border-t border-dotted border-white/10' />

            <div className='flex flex-col gap-8 px-6 py-8 min-[1440px]:flex-row min-[1440px]:items-start min-[1440px]:justify-between sm:px-8 lg:px-10'>
              <div className='min-[1440px]:w-[172px]'>
                <p className='text-body-sm font-medium text-foreground'>
                  Subscribe to The boundless newsletter
                </p>
                <Button
                  intent='white'
                  shape='pill'
                  className='mt-5 w-full font-semibold lg:w-auto'
                  asChild
                >
                  <a
                    href={`${siteConfig.parentUrl}/#newsletter`}
                    target='_blank'
                    rel='noreferrer'
                  >
                    Get Updates
                  </a>
                </Button>
              </div>

              <div className='grid grid-cols-2 gap-x-8 gap-y-8 min-[1440px]:flex min-[1440px]:gap-20 sm:grid-cols-4'>
                {footerColumns.map(column => (
                  <div key={column.label} className='min-[1440px]:w-[108px]'>
                    <p className='mb-2 text-caption-xs text-foreground uppercase'>
                      {column.label}
                    </p>
                    <ul className='space-y-1'>
                      {column.items.map(item => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            {...externalLinkProps(item.href)}
                            className='text-body-xs text-neutral-300 transition-colors hover:text-foreground'
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className='border-t border-dotted border-white/10' />

            <div className='flex items-center justify-between gap-4 px-6 py-5 text-body-sm text-neutral-300 sm:px-8 lg:px-10'>
              <p>
                Built on Stellar
                <span className='hidden lg:inline'>
                  {' '}
                  • Powered by Trustless Execution • Designed for Global
                  Contributors
                </span>
              </p>
              <p className='whitespace-nowrap'>© 2026 Boundless</p>
            </div>
          </div>
        </div>

        {/* Social card */}
        <div className='flex flex-col gap-4 rounded-2xl border border-white/8 bg-card/80 p-5 lg:w-[325px] lg:shrink-0 lg:justify-center'>
          <h2 className='hidden text-center font-heading text-h5 font-semibold text-foreground lg:block'>
            Social links
          </h2>
          <div className='flex flex-row justify-between gap-2 lg:flex-col lg:gap-4'>
            {socialLinks.map(social => (
              <Link
                key={social.key}
                href={social.href}
                {...externalLinkProps(social.href)}
                aria-label={social.label}
                className='flex size-12 items-center justify-center gap-2 rounded-full bg-secondary text-foreground transition-colors hover:bg-neutral-700 lg:size-auto lg:w-full lg:px-4 lg:py-3'
              >
                <SocialGlyph name={social.key} className='size-5 shrink-0' />
                <span className='hidden text-base lg:inline'>
                  {social.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
