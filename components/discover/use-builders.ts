import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { apiFetch } from '@/lib/api/client';
import type { Schemas, paths } from '@/lib/api/types';

/**
 * `/users/directory` list item. The DTO has no `followers` or `projects`
 * fields, so the directory card renders without those counts.
 */
export type BuilderListItemDto = Schemas['BuilderListItemDto'];

/** One page of `/users/directory`. */
export type BuildersDirectoryResponse = Schemas['BuildersDirectoryResponseDto'];

/** Facets backing the builders filter rail. */
export type BuilderFilters = Schemas['BuilderFiltersDto'];

/**
 * The order matters here (it drives the menu), so the list stays hand written,
 * but it is checked against the generated schema below. A backend enum change
 * then fails the build instead of shipping a `sort` the API rejects.
 */
export const BUILDER_SORT_VALUES = [
  'newest',
  'oldest',
  'name_asc',
  'name_desc',
] as const;

export type BuilderSort = (typeof BUILDER_SORT_VALUES)[number];

type SchemaSort = NonNullable<
  NonNullable<
    paths['/api/users/directory']['get']['parameters']['query']
  >['sort']
>;

/** Compile error if `BUILDER_SORT_VALUES` and the OpenAPI enum drift apart. */
type AssertExhaustive<T extends true> = T;
// The alias is the assertion: it exists to be type checked, not to be used.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type _SortMatchesSchema = AssertExhaustive<
  [SchemaSort] extends [BuilderSort]
    ? [BuilderSort] extends [SchemaSort]
      ? true
      : false
    : false
>;

export function isBuilderSort(value: string): value is BuilderSort {
  return (BUILDER_SORT_VALUES as readonly string[]).includes(value);
}

/**
 * Default to newest rather than the OpenAPI default (name_asc). The directory
 * is a discovery surface, the existing toolbar chip already reads Newest, and
 * sending sort explicitly avoids silently depending on the schema default.
 */
export const DEFAULT_BUILDER_SORT: BuilderSort = 'newest';

/** Query params `GET /users/directory` accepts from the directory page. */
export interface BuildersQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  country?: string;
  skills?: string[];
  status?: string;
  sort?: BuilderSort;
}

export const buildersKeys = {
  all: ['builders'] as const,
  list: (params: BuildersQueryParams) =>
    ['builders', 'list', params] as const,
  filters: ['builders', 'filters'] as const,
};

function toQueryString(params: BuildersQueryParams): string {
  const search = new URLSearchParams();

  if (params.page) search.set('page', String(params.page));
  if (params.limit) search.set('limit', String(params.limit));
  if (params.search) search.set('search', params.search);
  if (params.country) search.set('country', params.country);
  if (params.skills?.length) {
    for (const skill of params.skills) {
      search.append('skills', skill);
    }
  }
  if (params.status) search.set('status', params.status);
  if (params.sort) search.set('sort', params.sort);

  const query = search.toString();
  return query ? `?${query}` : '';
}

export const BUILDERS_REVALIDATE_SECONDS = 60;
export const BUILDERS_PAGE_SIZE = 12;
export const BUILDERS_SEARCH_PARAM = 'q';

export type BuilderFilterValue = Record<string, string[]> & {
  skills: string[];
  country: string[];
  status: string[];
};

export function readBuilderFilters(params: URLSearchParams): BuilderFilterValue {
  const country = params.get('country');
  const status = params.get('status');
  return {
    skills: params.getAll('skills'),
    country: country ? [country] : [],
    status: status ? [status] : [],
  };
}

export function readBuilderPage(params: URLSearchParams): number {
  const raw = Number(params.get('page'));
  return Number.isInteger(raw) && raw > 0 ? raw : 1;
}

export function readBuilderSort(params: URLSearchParams): BuilderSort {
  const raw = params.get('sort');
  return raw && isBuilderSort(raw) ? raw : DEFAULT_BUILDER_SORT;
}

export function toUrlSearchParams(
  raw: Record<string, string | string[] | undefined>
): URLSearchParams {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(raw)) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      for (const item of value) {
        params.append(key, item);
      }
    } else {
      params.set(key, value);
    }
  }
  return params;
}

export function parseBuildersQueryParams(
  searchParams:
    | URLSearchParams
    | Record<string, string | string[] | undefined>
): BuildersQueryParams {
  const params =
    searchParams instanceof URLSearchParams
      ? searchParams
      : toUrlSearchParams(searchParams);

  const search = params.get(BUILDERS_SEARCH_PARAM) ?? '';
  const filters = readBuilderFilters(params);
  const page = readBuilderPage(params);
  const sort = readBuilderSort(params);

  return {
    page,
    limit: BUILDERS_PAGE_SIZE,
    search: search || undefined,
    skills: filters.skills?.length ? filters.skills : undefined,
    country: filters.country?.[0],
    status: filters.status?.[0],
    sort,
  };
}

export function fetchBuilders(
  params: BuildersQueryParams = {},
  init?: RequestInit
): Promise<BuildersDirectoryResponse> {
  return apiFetch<BuildersDirectoryResponse>(
    `/users/directory${toQueryString(params)}`,
    init
  );
}

export function fetchBuilderFilters(
  init?: RequestInit
): Promise<BuilderFilters> {
  return apiFetch<BuilderFilters>('/users/filters', init);
}

/** Paginated `/users/directory` list, filtered by the params above. */
export function useBuilders(params: BuildersQueryParams = {}) {
  return useQuery({
    queryKey: buildersKeys.list(params),
    queryFn: () => fetchBuilders(params),
    placeholderData: keepPreviousData,
  });
}

/** Filter facets (skills, countries, statuses) for the builders directory. */
export function useBuilderFilters() {
  return useQuery({
    queryKey: buildersKeys.filters,
    queryFn: () => fetchBuilderFilters(),
  });
}

