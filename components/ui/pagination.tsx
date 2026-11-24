'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

interface PaginationProps {
  /** Current page, 1-based. */
  page: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  /** Build a URL for link-based pagination controls. */
  getPageHref?: (page: number) => string;
  /** Hide the "Showing X to Y of Z items" summary. */
  hideSummary?: boolean;
  className?: string;
}

/** Build a page list with single-gap ellipsis around the current page. */
function pageList(page: number, pageCount: number): (number | 'gap')[] {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  const pages = new Set([1, pageCount, page, page - 1, page + 1]);
  const sorted = [...pages]
    .filter(p => p >= 1 && p <= pageCount)
    .sort((a, b) => a - b);

  const result: (number | 'gap')[] = [];
  let prev = 0;
  for (const p of sorted) {
    if (p - prev > 1) result.push('gap');
    result.push(p);
    prev = p;
  }
  return result;
}

/**
 * Numbered pagination with a result summary and prev/next controls. The active
 * page is highlighted; out-of-range arrows are disabled.
 */
export function Pagination({
  page,
  pageSize,
  totalItems,
  onPageChange,
  getPageHref,
  hideSummary = false,
  className,
}: PaginationProps) {
  const pageCount = Math.max(1, Math.ceil(totalItems / pageSize));
  if (pageCount <= 1) return null;

  const from = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalItems);

  const go = (next: number) => {
    const clamped = Math.min(Math.max(next, 1), pageCount);
    if (clamped !== page) onPageChange(clamped);
  };

  const previousPage = page - 1;
  const nextPage = page + 1;
  const previousControl = (
    <>
      <ChevronLeft className='size-4' />
    </>
  );
  const nextControl = (
    <>
      <ChevronRight className='size-4' />
    </>
  );

  return (
    <div className={cn('flex items-center gap-4', className)}>
      {!hideSummary ? (
        <p className='text-sm font-medium text-[#707070]'>
          Showing {from} to {to} of {totalItems} items
        </p>
      ) : null}

      <div className='flex items-center gap-2'>
        {getPageHref && page > 1 ? (
          <Link
            href={getPageHref(previousPage)}
            scroll={false}
            aria-label='Previous page'
            className='flex size-8 items-center justify-center rounded-lg text-[#707070] transition-colors hover:text-white'
          >
            {previousControl}
          </Link>
        ) : (
          <button
            type='button'
            aria-label='Previous page'
            onClick={() => go(previousPage)}
            disabled={page <= 1}
            className='flex size-8 items-center justify-center rounded-lg text-[#707070] transition-colors hover:text-white disabled:pointer-events-none disabled:opacity-40'
          >
            {previousControl}
          </button>
        )}

        {pageList(page, pageCount).map((p, i) =>
          p === 'gap' ? (
            <span
              key={`gap-${i}`}
              className='flex size-8 items-center justify-center text-sm text-[#707070]'
            >
              &hellip;
            </span>
          ) : getPageHref ? (
            <Link
              key={p}
              href={getPageHref(p)}
              scroll={false}
              aria-label={`Page ${p}`}
              aria-current={p === page ? 'page' : undefined}
              className={cn(
                'flex size-8 items-center justify-center rounded-lg text-sm font-medium transition-colors',
                p === page
                  ? 'bg-primary-500 text-[#1a1a1a]'
                  : 'text-[#707070] hover:text-white'
              )}
            >
              {p}
            </Link>
          ) : (
            <button
              key={p}
              type='button'
              aria-label={`Page ${p}`}
              aria-current={p === page ? 'page' : undefined}
              onClick={() => go(p)}
              className={cn(
                'flex size-8 items-center justify-center rounded-lg text-sm font-medium transition-colors',
                p === page
                  ? 'bg-primary-500 text-[#1a1a1a]'
                  : 'text-[#707070] hover:text-white'
              )}
            >
              {p}
            </button>
          )
        )}

        {getPageHref && page < pageCount ? (
          <Link
            href={getPageHref(nextPage)}
            scroll={false}
            aria-label='Next page'
            className='flex size-8 items-center justify-center rounded-lg text-[#707070] transition-colors hover:text-white'
          >
            {nextControl}
          </Link>
        ) : (
          <button
            type='button'
            aria-label='Next page'
            onClick={() => go(nextPage)}
            disabled={page >= pageCount}
            className='flex size-8 items-center justify-center rounded-lg text-[#707070] transition-colors hover:text-white disabled:pointer-events-none disabled:opacity-40'
          >
            {nextControl}
          </button>
        )}
      </div>
    </div>
  );
}
