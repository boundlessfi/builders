export type RouteEntry = {
  slug: string;
  label: string;
  changeFrequency:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';
  priority: number;
};

export const routes: RouteEntry[] = [
  {
    slug: '/',
    label: 'Home',
    changeFrequency: 'weekly',
    priority: 1,
  },
  {
    slug: '/about',
    label: 'About',
    changeFrequency: 'monthly',
    priority: 0.5,
  },
  {
    slug: '/builders',
    label: 'Builders',
    changeFrequency: 'daily',
    priority: 0.9,
  },
];
