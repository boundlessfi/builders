import { describe, expect, it } from 'vitest';

import {
  DEFAULT_BUILDER_SORT,
  parseBuildersQueryParams,
  readBuilderPage,
  readBuilderSort,
} from '@/components/discover/use-builders';

describe('readBuilderPage', () => {
  it('returns 1 when page param is missing', () => {
    const params = new URLSearchParams();
    expect(readBuilderPage(params)).toBe(1);
  });

  it('returns parsed positive integer when valid', () => {
    const params = new URLSearchParams('page=4');
    expect(readBuilderPage(params)).toBe(4);
  });

  it('falls back to 1 for non-positive or invalid integer inputs', () => {
    expect(readBuilderPage(new URLSearchParams('page=-1'))).toBe(1);
    expect(readBuilderPage(new URLSearchParams('page=0'))).toBe(1);
    expect(readBuilderPage(new URLSearchParams('page=not-a-number'))).toBe(1);
    expect(readBuilderPage(new URLSearchParams('page=2.5'))).toBe(1);
  });
});

describe('readBuilderSort', () => {
  it('returns default sort when sort param is missing', () => {
    const params = new URLSearchParams();
    expect(readBuilderSort(params)).toBe(DEFAULT_BUILDER_SORT);
    expect(readBuilderSort(params)).toBe('newest');
  });

  it('returns valid sort option when provided', () => {
    expect(readBuilderSort(new URLSearchParams('sort=oldest'))).toBe('oldest');
    expect(readBuilderSort(new URLSearchParams('sort=name_asc'))).toBe('name_asc');
    expect(readBuilderSort(new URLSearchParams('sort=name_desc'))).toBe('name_desc');
  });

  it('falls back to default sort for invalid sort options', () => {
    expect(readBuilderSort(new URLSearchParams('sort=wrong'))).toBe(DEFAULT_BUILDER_SORT);
    expect(readBuilderSort(new URLSearchParams('sort='))).toBe(DEFAULT_BUILDER_SORT);
    expect(readBuilderSort(new URLSearchParams('sort=unknown_sort'))).toBe(DEFAULT_BUILDER_SORT);
  });
});

describe('parseBuildersQueryParams', () => {
  it('returns default query params when no search params are provided', () => {
    const result = parseBuildersQueryParams(new URLSearchParams());
    expect(result).toEqual({
      page: 1,
      limit: 12,
      search: undefined,
      skills: undefined,
      country: undefined,
      status: undefined,
      sort: 'newest',
    });
  });

  it('correctly handles repeated skills query parameters', () => {
    const params = new URLSearchParams();
    params.append('skills', 'Rust');
    params.append('skills', 'TypeScript');
    params.append('skills', 'Next.js');

    const result = parseBuildersQueryParams(params);
    expect(result.skills).toEqual(['Rust', 'TypeScript', 'Next.js']);
  });

  it('handles search query and falls back on bad page and sort values', () => {
    const params = new URLSearchParams('q=stellar&page=-1&sort=wrong&country=US&status=active');
    const result = parseBuildersQueryParams(params);

    expect(result).toEqual({
      page: 1,
      limit: 12,
      search: 'stellar',
      skills: undefined,
      country: 'US',
      status: 'active',
      sort: 'newest',
    });
  });

  it('accepts raw record objects as well as URLSearchParams', () => {
    const result = parseBuildersQueryParams({
      q: 'builder',
      skills: ['React', 'CSS'],
      page: '3',
      sort: 'oldest',
    });

    expect(result).toEqual({
      page: 3,
      limit: 12,
      search: 'builder',
      skills: ['React', 'CSS'],
      country: undefined,
      status: undefined,
      sort: 'oldest',
    });
  });
});
