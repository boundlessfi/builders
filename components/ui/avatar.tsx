'use client';

import { useState } from 'react';
import { Camera, Check, User } from 'lucide-react';
import Image from 'next/image';

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
export type AvatarStatus = 'none' | 'online' | 'offline' | 'verified' | 'edit';

export interface AvatarProps {
  /** Avatar diameter. xs=24 sm=32 md=40 lg=48 xl=56 2xl=64 3xl=80 */
  size?: AvatarSize;
  /** Status badge shown at the bottom-right corner. */
  status?: AvatarStatus;
  /** Photo URL — renders as an image avatar. */
  src?: string;
  /** Alt text for the photo. */
  alt?: string;
  /** 1-2 character initials rendered when no `src` is provided. */
  initials?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Size tokens
// ---------------------------------------------------------------------------

const sizeClass: Record<AvatarSize, string> = {
  xs: 'size-6',
  sm: 'size-8',
  md: 'size-10',
  lg: 'size-12',
  xl: 'size-14',
  '2xl': 'size-16',
  '3xl': 'size-20',
};

const initialsText: Record<AvatarSize, string> = {
  xs: 'text-[9px]',
  sm: 'text-[10px]',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-lg',
  '2xl': 'text-xl',
  '3xl': 'text-2xl',
};

const iconSize: Record<AvatarSize, number> = {
  xs: 10,
  sm: 14,
  md: 18,
  lg: 22,
  xl: 26,
  '2xl': 30,
  '3xl': 38,
};

// ---------------------------------------------------------------------------
// Status badges
// ---------------------------------------------------------------------------

/**
 * Online/offline dot.
 * Position is percentage-based so it scales with any avatar size.
 * Figma: top-3/4 bottom-0 left-[66.67%] right-[8.33%] → 25% × 25% square
 */
function OnlineDot({ online }: { online: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        'absolute top-3/4 right-[8.33%] bottom-0 left-[66.67%] rounded-full',
        'border-2 border-[#0d1111]',
        online ? 'bg-success-600' : 'bg-neutral-200'
      )}
    />
  );
}

/**
 * Verified tick badge (blue circle + white check).
 * Figma: inset-[66.67%_0_-8.33%_58.33%] → ~41% × 41% of avatar, bottom-right
 */
function VerifiedBadge() {
  return (
    <span
      aria-label='Verified'
      className='absolute inset-[66.67%_0_-8.33%_58.33%] flex items-center justify-center overflow-hidden rounded-full bg-info-600'
    >
      <Check
        className='size-full p-[15%] text-white'
        strokeWidth={3}
        aria-hidden
      />
    </span>
  );
}

/**
 * Camera/edit badge — circular grey button with camera icon.
 * Same positioning as the verified badge.
 */
function EditBadge() {
  return (
    <span
      aria-label='Edit avatar'
      className='absolute inset-[66.67%_0_-8.33%_58.33%] flex cursor-pointer items-center justify-center overflow-hidden rounded-full border border-white bg-neutral-500'
    >
      <Camera
        className='size-full p-[15%] text-white'
        strokeWidth={2}
        aria-hidden
      />
    </span>
  );
}

// ---------------------------------------------------------------------------
// Avatar
// ---------------------------------------------------------------------------

export function Avatar({
  size = 'md',
  status = 'none',
  src,
  alt = '',
  initials,
  className,
}: AvatarProps) {
  const hasStatus = status !== 'none';
  const [hasError, setHasError] = useState(false);
  const [prevSrc, setPrevSrc] = useState(src);

  if (prevSrc !== src) {
    setPrevSrc(src);
    setHasError(false);
  }

  const showImage = Boolean(src && !hasError);

  return (
    <div className={cn('relative shrink-0', sizeClass[size], className)}>
      {/* Circle frame */}
      <span
        className={cn(
          'absolute inset-0 overflow-hidden rounded-full bg-primary-50',
          hasStatus && 'border-[1.5px] border-white'
        )}
      >
        {showImage && src ? (
          <Image
            src={src}
            alt={alt}
            fill
            className='object-cover'
            sizes={`${({ xs: 24, sm: 32, md: 40, lg: 48, xl: 56, '2xl': 64, '3xl': 80 } as const)[size]}px`}
            onError={() => setHasError(true)}
          />
        ) : initials ? (
          <span
            className={cn(
              'flex h-full w-full items-center justify-center font-semibold text-neutral-900',
              initialsText[size]
            )}
          >
            {initials.slice(0, 2).toUpperCase()}
          </span>
        ) : (
          <span className='flex h-full w-full items-center justify-center text-neutral-500'>
            <User size={iconSize[size]} strokeWidth={1.5} aria-hidden />
          </span>
        )}
      </span>

      {/* Status badge */}
      {status === 'online' && <OnlineDot online />}
      {status === 'offline' && <OnlineDot online={false} />}
      {status === 'verified' && <VerifiedBadge />}
      {status === 'edit' && <EditBadge />}
    </div>
  );
}
