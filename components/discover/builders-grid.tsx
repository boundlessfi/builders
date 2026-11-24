"use client";

import { BuilderCard } from "@/components/cards/builder-card";
import { BuilderCardSkeleton } from "@/components/cards/builder-card-skeleton";
import { Pagination } from "@/components/ui/pagination";

import { toDirectoryBuilderCard } from "./to-builder-directory-card";
import type { BuildersDirectoryResponse } from "./use-builders";

const GRID_CLASS = "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4";

export function BuildersGrid({
  data,
  isPending,
  isPlaceholderData = false,
  isError,
  isNarrowed,
  page,
  pageSize,
  onPageChange,
  getPageHref,
  onHelpClick,
}: {
  data?: BuildersDirectoryResponse;
  isPending: boolean;
  isPlaceholderData?: boolean;
  isError: boolean;
  /** A search or filter is applied, so an empty result is a miss, not an empty directory. */
  isNarrowed: boolean;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  getPageHref?: (page: number) => string;
  /** Called when the user clicks "How to get listed" in the empty state. */
  onHelpClick?: () => void;
}) {
  if (isPending) {
    return (
      <div className={GRID_CLASS}>
        {Array.from({ length: pageSize }, (_, index) => (
          <BuilderCardSkeleton key={index} showStats={false} />
        ))}
      </div>
    );
  }

  if (isError || !data) {
    return (
      <p className="py-12 text-center text-body-sm text-muted-foreground">
        Builders could not be loaded right now.
      </p>
    );
  }

  if (data.data.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-12 text-center">
        <p className="text-body-sm text-muted-foreground">
          {isNarrowed
            ? "No builders match these filters."
            : "Builders appear here once their profile is complete and they have shipped work on Boundless."}
        </p>
        {!isNarrowed && onHelpClick && (
          <button
            onClick={onHelpClick}
            className="text-primary-500 hover:text-primary-400 text-sm underline transition-colors"
          >
            How to get listed
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      aria-busy={isPlaceholderData}
      className={`flex flex-col gap-8 transition-opacity ${isPlaceholderData ? "opacity-60" : ""}`}
    >
      <div className={GRID_CLASS}>
        {data.data.map((builder) => (
          <BuilderCard
            key={builder.id}
            builder={toDirectoryBuilderCard(builder)}
          />
        ))}
      </div>

      {data.pagination.total > 0 && (
        <Pagination
          page={page}
          pageSize={pageSize}
          totalItems={data.pagination.total}
          onPageChange={onPageChange}
          getPageHref={getPageHref}
          className="justify-between"
        />
      )}
    </div>
  );
}
