import { describe, expect, it } from 'vitest';

import {
  BUILDERS_PAGE_SIZE,
  DEFAULT_BUILDER_SORT,
  parseBuildersQueryParams,
  readBuilderPage,
  readBuilderSort,
} from '@/components/discover/use-builders';

describe('use-builders URL query parameter helpers', () => {
  describe('readBuilderPage', () => {
    it('returns 1 when page parameter is missing', () => {
      const params = new URLSearchParams();
      expect(readBuilderPage(params)).toBe(1);
    });

    it('returns the integer page when valid and greater than 0', () => {
      expect(readBuilderPage(new URLSearchParams('page=2'))).toBe(2);
      expect(readBuilderPage(new URLSearchParams('page=10'))).toBe(10);
    });

    it('falls back to 1 for negative or zero page values', () => {
      expect(readBuilderPage(new URLSearchParams('page=-1'))).toBe(1);
      expect(readBuilderPage(new URLSearchParams('page=0'))).toBe(1);
      expect(readBuilderPage(new URLSearchParams('page=-99'))).toBe(1);
    });

    it('falls back to 1 for non-integer or malformed page values', () => {
      expect(readBuilderPage(new URLSearchParams('page=invalid'))).toBe(1);
      expect(readBuilderPage(new URLSearchParams('page=1.5'))).toBe(1);
      expect(readBuilderPage(new URLSearchParams('page='))).toBe(1);
    });
  });

  describe('readBuilderSort', () => {
    it('returns DEFAULT_BUILDER_SORT when sort parameter is missing', () => {
      const params = new URLSearchParams();
      expect(readBuilderSort(params)).toBe(DEFAULT_BUILDER_SORT);
      expect(readBuilderSort(params)).toBe('newest');
    });

    it('returns the requested sort when valid', () => {
      expect(readBuilderSort(new URLSearchParams('sort=oldest'))).toBe('oldest');
      expect(readBuilderSort(new URLSearchParams('sort=name_asc'))).toBe('name_asc');
      expect(readBuilderSort(new URLSearchParams('sort=name_desc'))).toBe('name_desc');
      expect(readBuilderSort(new URLSearchParams('sort=newest'))).toBe('newest');
    });

    it('falls back to DEFAULT_BUILDER_SORT for invalid sort values', () => {
      expect(readBuilderSort(new URLSearchParams('sort=wrong'))).toBe(DEFAULT_BUILDER_SORT);
      expect(readBuilderSort(new URLSearchParams('sort=random_sort'))).toBe(DEFAULT_BUILDER_SORT);
      expect(readBuilderSort(new URLSearchParams('sort='))).toBe(DEFAULT_BUILDER_SORT);
    });
  });

  describe('parseBuildersQueryParams', () => {
    it('returns defaults when no query parameters are present', () => {
      const parsed = parseBuildersQueryParams(new URLSearchParams());
      expect(parsed).toEqual({
        page: 1,
        limit: BUILDERS_PAGE_SIZE,
        search: undefined,
        skills: undefined,
        country: undefined,
        status: undefined,
        sort: DEFAULT_BUILDER_SORT,
      });
    });

    it('parses search keyword from param "q"', () => {
      const parsed = parseBuildersQueryParams(new URLSearchParams('q=Soroban'));
      expect(parsed.search).toBe('Soroban');
    });

    it('parses single and repeated skills params', () => {
      const single = parseBuildersQueryParams(new URLSearchParams('skills=Rust'));
      expect(single.skills).toEqual(['Rust']);

      const repeated = parseBuildersQueryParams(
        new URLSearchParams('skills=Rust&skills=TypeScript&skills=Solidity')
      );
      expect(repeated.skills).toEqual(['Rust', 'TypeScript', 'Solidity']);
    });

    it('parses country and status filters', () => {
      const parsed = parseBuildersQueryParams(
        new URLSearchParams('country=US&status=active')
      );
      expect(parsed.country).toBe('US');
      expect(parsed.status).toBe('active');
    });

    it('falls back gracefully on bad page and sort values', () => {
      const parsed = parseBuildersQueryParams(
        new URLSearchParams('page=-1&sort=wrong&q=Dev')
      );
      expect(parsed.page).toBe(1);
      expect(parsed.sort).toBe(DEFAULT_BUILDER_SORT);
      expect(parsed.search).toBe('Dev');
    });

    it('supports plain Record object input in addition to URLSearchParams', () => {
      const parsed = parseBuildersQueryParams({
        page: '3',
        sort: 'oldest',
        skills: ['Python', 'Rust'],
        country: 'NG',
        q: 'Web3',
      });
      expect(parsed.page).toBe(3);
      expect(parsed.sort).toBe('oldest');
      expect(parsed.skills).toEqual(['Python', 'Rust']);
      expect(parsed.country).toBe('NG');
      expect(parsed.search).toBe('Web3');
    });
  });
});
