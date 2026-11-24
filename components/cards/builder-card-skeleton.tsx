import { Skeleton } from '@/components/ui/skeleton';

/**
 * Loading placeholder that mirrors the BuilderCard layout. `showStats` must
 * match the card it stands in for: the directory omits follower and project
 * counts, so reserving room for them here makes the grid jump on load.
 */
export function BuilderCardSkeleton({
  showStats = true,
}: {
  showStats?: boolean;
} = {}) {
  return (
    <div className='flex flex-col gap-5 rounded-2xl border border-border bg-ink p-4'>
      <div className='flex items-center gap-3'>
        <Skeleton className='size-10 rounded-full' />
        <div className='flex flex-1 flex-col gap-1.5'>
          <Skeleton className='h-4 w-32' />
          <Skeleton className='h-3.5 w-20' />
        </div>
      </div>

      <Skeleton className='h-4 w-48' />

      <Skeleton className='h-4 w-28' />

      <div className='flex flex-wrap gap-1.5'>
        <Skeleton className='h-5 w-16 rounded-full' />
        <Skeleton className='h-5 w-20 rounded-full' />
        <Skeleton className='h-5 w-14 rounded-full' />
      </div>

      {showStats && (
        <>
          <span aria-hidden className='h-px w-full bg-border' />

          <div className='flex items-center gap-4'>
            <Skeleton className='h-4 w-24' />
            <Skeleton className='h-4 w-20' />
          </div>
        </>
      )}
    </div>
  );
}
