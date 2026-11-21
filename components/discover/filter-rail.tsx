'use client';

import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  type ComponentType,
  type ReactNode,
  type SVGProps,
  useState,
} from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Skeleton } from '@/components/ui/skeleton';
import { transitions } from '@/lib/motion';
import { cn } from '@/lib/utils';

/**
 * Any selection state shaped as named groups of strings (skills, country,
 * status, ...). The parent decides which groups exist, so the rail itself
 * stays generic.
 */
export type FilterValue = Record<string, string[]>;

/** True once the visitor has narrowed the results with any control. */
export function hasActiveFilters(value: FilterValue): boolean {
  return Object.values(value).some(group => group.length > 0);
}

/** `IN_DEVELOPMENT` -> `In Development`. */
export function formatLabel(value: string): string {
  return value
    .toLowerCase()
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/** Accepts both lucide icons and our generated SVG icon components. */
type FilterSectionIcon = ComponentType<SVGProps<SVGSVGElement>>;

/** A facet row item. `label` lets a raw value render a friendlier display name. */
export interface FacetCount {
  value: string;
  count: number;
  label?: string;
}

/** One collapsible group rendered by the rail. */
export interface FilterSectionConfig {
  /** Key into `FilterValue` this section reads and writes. */
  group: string;
  title: string;
  icon: FilterSectionIcon;
  /** Facet rows show `value (count)`; enum rows format SCREAMING_SNAKE labels. */
  kind: 'facet' | 'enum';
  /**
   * `single` renders radios and sends one value, matching endpoints that accept
   * only one. `multi` renders checkboxes for genuinely repeatable params.
   */
  selection: 'single' | 'multi';
  defaultOpen?: boolean;
  items: FacetCount[] | string[];
}

function FilterSection({
  icon: Icon,
  title,
  defaultOpen = true,
  children,
}: {
  icon: FilterSectionIcon;
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className='py-4 first:pt-0 last:border-b-0'>
      <button
        type='button'
        onClick={() => setOpen(value => !value)}
        aria-expanded={open}
        className='flex w-full items-center gap-2 text-sm font-medium text-foreground'
      >
        <Icon
          className='size-4 text-muted-foreground'
          strokeWidth={1.75}
          aria-hidden
        />
        <span className='flex-1 text-left'>{title}</span>
        <ChevronDown
          className={cn(
            'size-4 text-muted-foreground transition-transform',
            open && 'rotate-180'
          )}
          aria-hidden
        />
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key='content'
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={transitions.base}
            className='overflow-hidden'
          >
            <div className='mt-3 flex flex-col gap-3'>{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function CheckRow({
  id,
  label,
  checked,
  onToggle,
}: {
  id: string;
  label: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <label htmlFor={id} className='flex cursor-pointer items-center gap-2'>
      <Checkbox id={id} checked={checked} onCheckedChange={() => onToggle()} />
      <span className='text-sm text-muted-foreground'>{label}</span>
    </label>
  );
}

function RadioRow({
  id,
  value,
  label,
  checked,
  onClear,
}: {
  id: string;
  value: string;
  label: string;
  checked: boolean;
  onClear: () => void;
}) {
  return (
    // Clearing lives on the label, not the radio, so the circle and its text
    // behave the same. Radix already no-ops a click on a checked radio, and
    // preventDefault stops the label forwarding a second click to it, so one
    // handler covers both targets and fires `onClear` exactly once. Space and
    // Enter get the same treatment, since a checked radio ignores them and
    // keyboard users would otherwise have no way to clear the filter.
    <label
      htmlFor={id}
      className='flex cursor-pointer items-center gap-2'
      onClick={event => {
        if (!checked) return;
        event.preventDefault();
        onClear();
      }}
      onKeyDown={event => {
        if (!checked || (event.key !== ' ' && event.key !== 'Enter')) return;
        event.preventDefault();
        onClear();
      }}
    >
      <RadioGroupItem id={id} value={value} />
      <span className='text-sm text-muted-foreground'>{label}</span>
    </label>
  );
}

/** Keep at most one selected value. Clicking the current value clears it. */
function nextExclusiveValue(current: string[], item: string): string[] {
  return current[0] === item ? [] : [item];
}

/** Rows a section renders, normalised so both kinds share one shape. */
function sectionRows(
  section: FilterSectionConfig
): { value: string; label: string }[] {
  if (section.kind === 'enum') {
    return (section.items as string[]).map(item => ({
      value: item,
      label: formatLabel(item),
    }));
  }
  return (section.items as FacetCount[]).map(item => ({
    value: item.value,
    label: `${item.label ?? item.value} (${item.count})`,
  }));
}

/**
 * Discovery filter controls, shared by the desktop sidebar and the mobile
 * sheet. Controlled: the parent owns `value` so it can show a Reset affordance
 * and run the query. Sections are configured by the parent (the builders
 * directory passes skills/country/status). `idPrefix` keeps the two instances
 * from sharing input ids.
 */
export function FilterRail({
  sections,
  value,
  onChange,
  idPrefix = 'rail',
  isPending = false,
  isError = false,
  className,
}: {
  sections: FilterSectionConfig[];
  value: FilterValue;
  onChange: (value: FilterValue) => void;
  idPrefix?: string;
  isPending?: boolean;
  isError?: boolean;
  className?: string;
}) {
  const selectExclusive = (group: string, item: string) => {
    onChange({ ...value, [group]: nextExclusiveValue(value[group] ?? [], item) });
  };

  const toggle = (group: string, item: string) => {
    const current = value[group] ?? [];
    const next = current.includes(item)
      ? current.filter(entry => entry !== item)
      : [...current, item];
    onChange({ ...value, [group]: next });
  };

  const renderSection = (section: FilterSectionConfig) => {
    const rows = sectionRows(section);
    const selected = value[section.group] ?? [];

    if (section.selection === 'single') {
      return (
        <RadioGroup
          value={selected[0] ?? ''}
          onValueChange={item => selectExclusive(section.group, item)}
          name={`${idPrefix}-${section.group}`}
          aria-label={section.title}
        >
          {rows.map(row => (
            <RadioRow
              key={row.value}
              id={`${idPrefix}-${section.group}-${row.value}`}
              value={row.value}
              label={row.label}
              checked={selected[0] === row.value}
              onClear={() => selectExclusive(section.group, row.value)}
            />
          ))}
        </RadioGroup>
      );
    }

    return rows.map(row => (
      <CheckRow
        key={row.value}
        id={`${idPrefix}-${section.group}-${row.value}`}
        label={row.label}
        checked={selected.includes(row.value)}
        onToggle={() => toggle(section.group, row.value)}
      />
    ));
  };

  if (isPending) {
    return (
      <div className={cn('flex flex-col gap-3 py-4', className)}>
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton key={index} className='h-4 w-full' />
        ))}
      </div>
    );
  }

  if (isError || sections.length === 0) {
    return (
      <p className={cn('py-4 text-sm text-muted-foreground', className)}>
        Filters could not be loaded right now.
      </p>
    );
  }

  return (
    <div className={cn('flex flex-col', className)}>
      {sections.map(section => (
        <FilterSection
          key={section.group}
          icon={section.icon}
          title={section.title}
          defaultOpen={section.defaultOpen}
        >
          {renderSection(section)}
        </FilterSection>
      ))}
    </div>
  );
}
