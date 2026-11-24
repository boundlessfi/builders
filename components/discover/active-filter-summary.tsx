'use client';

import { XIcon } from 'lucide-react';
import { useRef, type ReactNode } from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export interface ActiveFilterChip {
  group: string;
  value: string;
  label: string;
}

export interface ActiveFilterSummaryProps {
  total?: number;
  isPending: boolean;
  isError: boolean;
  chips: ActiveFilterChip[];
  onRemove: (group: string, value: string) => void;
  className?: string;
}

export function ActiveFilterSummary({
  total,
  isPending,
  isError,
  chips,
  onRemove,
  className,
}: ActiveFilterSummaryProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  // Removing a chip unmounts the button that had focus. Move focus to the
  // neighbouring chip, or to the row when no chip is left, so keyboard users
  // do not get sent back to the top of the page.
  const removeChip = (index: number) => {
    const chip = chips[index];
    const buttons = rowRef.current?.querySelectorAll<HTMLButtonElement>(
      'button[data-chip-remove]'
    );
    const next = buttons?.[index + 1] ?? buttons?.[index - 1];
    (next ?? rowRef.current)?.focus();
    onRemove(chip.group, chip.value);
  };

  let count: ReactNode = null;
  if (!isError) {
    if (isPending && total === undefined) {
      count = <Skeleton className='h-4 w-20 shrink-0' />;
    } else if (total !== undefined) {
      count = (
        <span role='status' aria-live='polite' className='text-muted-foreground'>
          {total} {total === 1 ? 'builder' : 'builders'}
        </span>
      );
    }
  }

  // Nothing to show, for example a failed request with no active filter.
  if (count === null && chips.length === 0) return null;

  return (
    <div
      ref={rowRef}
      tabIndex={-1}
      className={cn(
        'flex flex-wrap items-center gap-x-4 gap-y-2 text-body-sm outline-none',
        className
      )}
    >
      {count}

      {chips.map((chip, index) => (
        <span
          key={`${chip.group}:${chip.value}`}
          className='inline-flex items-center gap-1 rounded-[12px] bg-[rgba(234,253,247,0.08)] py-0.5 pl-2 pr-1 text-xs font-medium text-primary-700'
        >
          <span>{chip.label}</span>
          <button
            type='button'
            data-chip-remove
            aria-label={`Remove filter: ${chip.label}`}
            onClick={() => removeChip(index)}
            className='inline-flex size-4 shrink-0 items-center justify-center rounded-full outline-none transition-colors hover:bg-primary-500/10 hover:text-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500/50'
          >
            <XIcon className='size-3' aria-hidden />
          </button>
        </span>
      ))}
    </div>
  );
}
