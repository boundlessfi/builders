"use client";

import { X } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export interface ActiveChip {
  group: string;
  value: string;
  label: string;
}

export interface ActiveFilterChipsProps {
  /** Total matching builders from pagination metadata. */
  total?: number;
  /** True while the directory results are loading. */
  isPending?: boolean;
  /** True if the directory fetch threw an error. */
  isError?: boolean;
  /** List of currently applied filter chips. */
  chips: ActiveChip[];
  /** Callback invoked when a user clicks the remove button on a chip. */
  onRemove: (group: string, value: string) => void;
  className?: string;
}

/**
 * Renders the total result count alongside interactive active filter chips.
 * Positioned between the discover toolbar and the builders grid.
 */
export function ActiveFilterChips({
  total,
  isPending,
  isError,
  chips,
  onRemove,
  className,
}: ActiveFilterChipsProps) {
  // Hide count entirely on fetch errors
  const showCount = !isError;

  // If there is an error and no chips, render nothing
  if (!showCount && chips.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-3 text-body-sm",
        className
      )}
    >
      {/* Result count */}
      {showCount && (
        <div className="flex items-center">
          {isPending && total === undefined ? (
            <Skeleton className="h-5 w-24 rounded" />
          ) : total !== undefined ? (
            <span className="text-sm font-medium text-muted-foreground">
              {total} {total === 1 ? "builder" : "builders"}
            </span>
          ) : null}
        </div>
      )}

      {/* Active filter chips */}
      {chips.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {chips.map((chip) => (
            <span
              key={`${chip.group}-${chip.value}`}
              className="inline-flex items-center gap-1.5 rounded-[12px] bg-[rgba(234,253,247,0.08)] py-0.5 pl-2.5 pr-1 text-xs font-medium text-primary-700"
            >
              <span>{chip.label}</span>
              <button
                type="button"
                aria-label={`Remove filter: ${chip.label}`}
                onClick={() => onRemove(chip.group, chip.value)}
                className="inline-flex size-4 items-center justify-center rounded-full text-primary-700/70 transition-colors hover:bg-primary-500/20 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-500"
              >
                <X className="size-3" aria-hidden="true" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
