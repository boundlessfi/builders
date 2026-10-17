'use client';

import { ChevronDownIcon, MenuIcon, SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { BoundlessLogo } from '@/components/layout/boundless-logo';
import { PillButton } from '@/components/layout/pill-button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { headerMenus } from '@/config/marketing-nav';
import { siteConfig } from '@/lib/seo/site';

/** The main Boundless app, where builders sign up and create. Opens in a new tab. */
const LAUNCH_APP_URL = siteConfig.parentUrl;

type HeaderVariant = 'site' | 'blog';

function NavDivider() {
  return <span aria-hidden className='h-6 w-px shrink-0 bg-white/10' />;
}

function CloseGlyph() {
  return (
    <svg
      viewBox='0 0 24 24'
      className='size-6'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      aria-hidden
    >
      <path d='M6 6l12 12M18 6L6 18' />
    </svg>
  );
}

/**
 * Search affordance for the blog header. A placeholder until blog search ships;
 * wire its handler then.
 */
function SearchButton() {
  return (
    <button
      type='button'
      aria-label='Search'
      className='inline-flex size-10 shrink-0 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white'
    >
      <SearchIcon className='size-6' />
    </button>
  );
}

/**
 * Center mega-menu nav. Opens on hover with a short close delay so the cursor
 * can travel from a trigger to its panel, and still opens on click and keyboard
 * through the underlying menu.
 */
function MegaMenu() {
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    []
  );

  const openMenu = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenLabel(label);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenLabel(null), 120);
  };

  return (
    <nav className='flex items-center gap-1' aria-label='Primary'>
      <Link
        href='/builders'
        className='inline-flex h-8 items-center px-4 text-sm font-medium text-[#8b8f97] transition-colors hover:text-white'
      >
        Builders
      </Link>
      {headerMenus.map(menu => (
        <DropdownMenu
          key={menu.label}
          open={openLabel === menu.label}
          onOpenChange={isOpen => setOpenLabel(isOpen ? menu.label : null)}
          modal={false}
        >
          <DropdownMenuTrigger
            onMouseEnter={() => openMenu(menu.label)}
            onMouseLeave={scheduleClose}
            className='group inline-flex h-8 items-center gap-1 px-5 text-sm font-medium text-[#8b8f97] transition-colors outline-none hover:text-white data-[state=open]:text-white'
          >
            {menu.label}
            <ChevronDownIcon className='size-3.5 transition-transform group-data-[state=open]:rotate-180' />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='start'
            sideOffset={12}
            onMouseEnter={() => openMenu(menu.label)}
            onMouseLeave={scheduleClose}
            className='w-[320px] overflow-hidden rounded-[12px] border-[0.5px] border-[#27292c] bg-ink/50 p-0 text-white shadow-xl backdrop-blur-[4px]'
          >
            {menu.items.map(item => {
              const Icon = item.icon;
              return (
                <DropdownMenuItem
                  key={item.href}
                  asChild
                  className='w-full gap-3 rounded-none p-2 focus:bg-white/[0.04] focus:text-white'
                >
                  <Link href={item.href}>
                    <span className='grid size-10 shrink-0 place-items-center rounded-lg bg-[#232324] text-brand'>
                      {Icon ? <Icon className='size-5 text-brand' /> : null}
                    </span>
                    <span className='flex flex-col gap-1'>
                      <span className='text-sm font-medium text-white'>
                        {item.label}
                      </span>
                      {item.description ? (
                        <span className='text-[11px] leading-[1.45] text-[#999da2]'>
                          {item.description}
                        </span>
                      ) : null}
                    </span>
                  </Link>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      ))}
    </nav>
  );
}

function MobileMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div
      id='site-mobile-menu'
      className='border-t border-[#27292c] bg-ink lg:hidden'
    >
      <div className='space-y-6 px-5 py-6'>
        <div>
          <Link
            href='/builders'
            onClick={onNavigate}
            className='flex items-center rounded-lg p-2 text-sm font-medium text-white transition-colors hover:bg-white/5'
          >
            Builders
          </Link>
        </div>
        {headerMenus.map(menu => (
          <div key={menu.label}>
            <p className='mb-2 text-xs font-medium tracking-wider text-[#8b8f97] uppercase'>
              {menu.label}
            </p>
            <div className='grid gap-1'>
              {menu.items.map(item => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    className='flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-white/5'
                  >
                    <span className='grid size-10 shrink-0 place-items-center rounded-lg bg-[#232324] text-brand'>
                      {Icon ? <Icon className='size-5 text-brand' /> : null}
                    </span>
                    <span className='flex flex-col gap-0.5'>
                      <span className='text-sm font-medium text-white'>
                        {item.label}
                      </span>
                      {item.description ? (
                        <span className='text-[11px] text-[#999da2]'>
                          {item.description}
                        </span>
                      ) : null}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
        <PillButton asChild className='w-full'>
          <a
            href={LAUNCH_APP_URL}
            target='_blank'
            rel='noopener noreferrer'
            onClick={onNavigate}
          >
            Launch App
          </a>
        </PillButton>
      </div>
    </div>
  );
}

/**
 * Sticky marketing header. Two variants keyed off the route: the default site
 * header carries the mega-menu plus a Launch App CTA; the blog header swaps in a
 * search affordance and a Subscribe action.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const variant: HeaderVariant = (pathname ?? '').startsWith('/blog')
    ? 'blog'
    : 'site';

  return (
    <header className='sticky top-0 z-50 border-b border-[#27292c] bg-ink/50 backdrop-blur-[4px]'>
      <div className='px-5 lg:px-[100px]'>
        <div className='mx-auto flex h-20 w-full max-w-page items-center justify-between gap-6'>
          <BoundlessLogo className='h-5' />

          {/* Desktop: mega-menu, divider, and the single CTA */}
          <div className='hidden items-center gap-6 lg:flex'>
            <MegaMenu />
            <NavDivider />
            {variant === 'blog' ? (
              // Newsletter subscribe; wire to the newsletter when it ships.
              <PillButton type='button'>Subscribe</PillButton>
            ) : (
              <PillButton asChild>
                <a href={LAUNCH_APP_URL} target='_blank' rel='noopener noreferrer'>
                  Launch App
                </a>
              </PillButton>
            )}
          </div>

          {/* Mobile actions */}
          <div className='flex items-center gap-5 lg:hidden'>
            {variant === 'blog' ? (
              <>
                <SearchButton />
                {/* Newsletter subscribe; wire to the newsletter when it ships. */}
                <PillButton type='button'>Subscribe</PillButton>
              </>
            ) : (
              <>
                <PillButton asChild>
                  <a
                    href={LAUNCH_APP_URL}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Launch App
                  </a>
                </PillButton>
                <button
                  type='button'
                  onClick={() => setOpen(value => !value)}
                  className='inline-flex size-10 items-center justify-center text-white'
                  aria-label='Toggle menu'
                  aria-expanded={open}
                  aria-controls='site-mobile-menu'
                >
                  {open ? <CloseGlyph /> : <MenuIcon className='size-6' />}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {variant === 'site' && open ? (
        <MobileMenu onNavigate={() => setOpen(false)} />
      ) : null}
    </header>
  );
}
