import {
  Calendar,
  Layers,
  type LucideIcon,
  MessageCircleMore,
  Tag,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { Avatar } from '@/components/ui/avatar';
import { deriveInitials } from '@/lib/initials';
import { cn } from '@/lib/utils';

import type { OpportunityCardStatus, OpportunityCardView } from './types';

const STATUS_LABEL: Record<OpportunityCardStatus, string> = {
  open: 'Open',
  applications: 'Applications',
  in_progress: 'In Progress',
  review: 'In Review',
  completed: 'Completed',
};

const STATUS_COLOR: Record<OpportunityCardStatus, string> = {
  open: 'text-[#21a879]',
  applications: 'text-[#3ba7ff]',
  in_progress: 'text-[#21a879]',
  review: 'text-[#ae7f01]',
  completed: 'text-muted-foreground',
};

function StatusBadge({ status }: { status: OpportunityCardStatus }) {
  return (
    <span
      className={cn(
        'flex shrink-0 items-center gap-1 rounded-[12px] bg-[rgba(234,253,247,0.08)] px-2 py-0.5',
        STATUS_COLOR[status]
      )}
    >
      <span className='size-1.5 rounded-full bg-current' />
      <span className='text-xs font-medium'>{STATUS_LABEL[status]}</span>
    </span>
  );
}

function Meta({
  icon: Icon,
  children,
  className,
}: {
  icon: LucideIcon;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'flex items-center gap-1 text-xs font-medium text-muted-foreground',
        className
      )}
    >
      <Icon className='size-4 shrink-0' strokeWidth={1.75} aria-hidden />
      <span className='truncate'>{children}</span>
    </span>
  );
}

/** A single opportunity (or project) in the discovery grid. */
export function OpportunityCard({
  opportunity,
}: {
  opportunity: OpportunityCardView;
}) {
  const {
    org,
    index,
    status,
    title,
    category,
    participants,
    mode,
    comments,
    logo,
    endsIn,
    reward,
    detailUrl,
  } = opportunity;

  const card = (
    <article
      className={cn(
        'flex min-w-0 flex-col gap-5 rounded-2xl border border-[#1f2a28] bg-ink p-4',
        detailUrl &&
          'transition-[transform,border-color] duration-200 group-hover:border-[#2a3a37] motion-reduce:transition-none'
      )}
    >
      <div className='flex items-center gap-2'>
        <div className='flex min-w-0 flex-1 items-center gap-2'>
          <Avatar
            src={logo}
            initials={deriveInitials(title)}
            alt={title}
            size='xs'
            className='shrink-0'
          />
          <span className='truncate text-sm font-medium text-muted-foreground'>
            {org}
          </span>
          <span className='shrink-0 text-sm font-medium text-muted-foreground'>
            #{index}
          </span>
        </div>
        <StatusBadge status={status} />
      </div>

      <h3 className='line-clamp-2 min-h-[52px] text-base font-semibold text-foreground'>
        {title}
      </h3>

      {/* Single row: short items hold their size, the mode label truncates. */}
      <div className='flex min-w-0 items-center gap-3'>
        <span className='flex shrink-0 items-center gap-1'>
          <Tag
            className='size-4 shrink-0 text-muted-foreground'
            strokeWidth={1.75}
            aria-hidden
          />
          <span className='rounded-[12px] bg-[rgba(234,253,247,0.08)] px-2 py-0.5 text-xs font-medium text-primary-700'>
            {category}
          </span>
        </span>
        <Meta icon={Users} className='shrink-0'>
          {participants}
        </Meta>
        {mode ? (
          <Meta icon={Layers} className='min-w-0'>
            {mode}
          </Meta>
        ) : null}
        <Meta icon={MessageCircleMore} className='shrink-0'>
          {comments}
        </Meta>
      </div>

      {endsIn || reward ? (
        <>
          <span aria-hidden className='h-px w-full bg-[#1f2a28]' />

          <div className='flex items-center gap-3'>
            {endsIn ? (
              <span className='flex min-w-0 flex-1 items-center gap-1 text-xs font-medium text-info-500'>
                <Calendar
                  className='size-4 shrink-0'
                  strokeWidth={1.75}
                  aria-hidden
                />
                <span className='truncate'>Ends in {endsIn}</span>
              </span>
            ) : null}
            {reward ? (
              <span className='ml-auto flex shrink-0 items-center gap-2'>
                <Image
                  src='/currency/usdc.png'
                  alt='Token'
                  width={20}
                  height={20}
                />
                <span className='text-xl font-bold tracking-tight whitespace-nowrap text-primary-600'>
                  {reward.amount.toLocaleString()} {reward.currency}
                </span>
              </span>
            ) : null}
          </div>
        </>
      ) : null}
    </article>
  );

  if (!detailUrl) return card;

  return (
    <Link
      href={detailUrl}
      aria-label={title}
      className='group block min-w-0 rounded-2xl focus-visible:ring-2 focus-visible:ring-primary-500/50 focus-visible:outline-none'
    >
      {card}
    </Link>
  );
}
