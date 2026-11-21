'use client';

import {
  ArrowDownUp,
  Funnel,
  ListFilter,
  MoveLeft,
  RotateCcw,
  Search,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { type ReactNode, useRef } from 'react';

import { Button } from '@/components/ui/button';
import { transitions } from '@/lib/motion';

/**
 * Filter wiring is all or nothing. A page either owns filter state and passes
 * every handler, or it passes none and the toolbar shows search alone. Making
 * this a union means a half-wired caller is a type error rather than a toolbar
 * that quietly drops its filter controls.
 */
type FilterProps =
  | {
      filtersOpen: boolean;
      onToggleFilters: () => void;
      onOpenMobileFilters: () => void;
      filtersActive: boolean;
      onReset: () => void;
    }
  | {
      filtersOpen?: never;
      onToggleFilters?: never;
      onOpenMobileFilters?: never;
      filtersActive?: never;
      onReset?: never;
    };

export function DiscoverToolbar({
  filtersOpen = false,
  onToggleFilters,
  onOpenMobileFilters,
  filtersActive = false,
  onReset,
  showSort = true,
  sort,
  query,
  onQueryChange,
  placeholder = 'Search',
  ariaLabel,
}: FilterProps & {
  /** Hide the dummy Newest pill on pages that do not wire sorting. */
  showSort?: boolean;
  /**
   * Optional sort control. When passed, it replaces the dummy Newest pill.
   * Pages that omit it keep the existing non-interactive pill, unless they
   * also pass `showSort={false}`.
   */
  sort?: ReactNode;
  query: string;
  onQueryChange: (value: string) => void;
  placeholder?: string;
  /**
   * Accessible name for the search input. Defaults to `placeholder` when omitted.
   */
  ariaLabel?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  // Pages that omit filter handlers skip the Filters button rather than
  // rendering one that does nothing. `FilterProps` guarantees the handlers
  // arrive together, so one check covers all three.
  const showFilters = onToggleFilters !== undefined;
  const searchAriaLabel = ariaLabel ?? placeholder;

  return (
    <div className='flex items-center gap-3'>
      {showFilters && (
        <Button
          appearance='outline'
          intent='secondary'
          shape='pill'
          size='small'
          onClick={onToggleFilters}
          className='hidden shrink-0 lg:inline-flex'
        >
          {filtersOpen ? (
            <MoveLeft className='size-4' strokeWidth={1.75} aria-hidden />
          ) : (
            <Funnel className='size-4' strokeWidth={1.75} aria-hidden />
          )}
          {filtersOpen ? 'Hide Filters' : 'Filters'}
        </Button>
      )}

      <AnimatePresence initial={false}>
        {showFilters && filtersActive ? (
          <motion.div
            key='reset-desktop'
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={transitions.fast}
            className='hidden shrink-0 lg:block'
          >
            <Button
              appearance='outline'
              intent='primary'
              shape='pill'
              size='small'
              onClick={onReset}
            >
              <RotateCcw className='size-4' strokeWidth={1.75} aria-hidden />
              Reset
            </Button>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* `min-w-0` so the box can shrink below its content width. Without it a
          flex item refuses to shrink, and the row overflows once the sort pill
          joins it on a narrow screen. */}
      <div
        role='search'
        className='flex min-w-0 flex-1 items-center gap-2 rounded-full border border-[#1f2a28] px-4 py-2.5'
      >
        <Search
          className='size-4 shrink-0 text-muted-foreground'
          strokeWidth={1.75}
          aria-hidden
        />
        <input
          ref={inputRef}
          type='search'
          enterKeyHint='search'
          aria-label={searchAriaLabel}
          value={query}
          onChange={event => onQueryChange(event.target.value)}
          placeholder={placeholder}
          className='w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden'
        />
        {query.length > 0 && (
          <button
            type='button'
            aria-label='Clear search'
            onClick={() => {
              onQueryChange('');
              inputRef.current?.focus();
            }}
            className='inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500'
          >
            <X className='size-3.5' strokeWidth={2} aria-hidden />
          </button>
        )}
      </div>

      {showFilters && (
        <Button
          appearance='outline'
          intent='secondary'
          shape='pill'
          size='small'
          iconOnly
          onClick={onOpenMobileFilters}
          aria-label='Filters'
          className='shrink-0 lg:hidden'
        >
          <ListFilter className='size-5' strokeWidth={1.75} aria-hidden />
        </Button>
      )}

      <AnimatePresence initial={false}>
        {showFilters && filtersActive ? (
          <motion.div
            key='reset-mobile'
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={transitions.fast}
            className='shrink-0 lg:hidden'
          >
            <Button
              appearance='outline'
              intent='secondary'
              shape='pill'
              size='small'
              iconOnly
              onClick={onReset}
              aria-label='Reset filters'
            >
              <RotateCcw className='size-5' strokeWidth={1.75} aria-hidden />
            </Button>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {sort ??
        (showSort ? (
          <Button
            appearance='outline'
            intent='secondary'
            shape='pill'
            size='small'
            className='hidden shrink-0 lg:inline-flex'
          >
            <ArrowDownUp className='size-4' strokeWidth={1.75} aria-hidden />
            Newest
          </Button>
        ) : null)}
    </div>
  );
}
