import { ISearchParams } from '@/types';

export default function getSearchParams(searchParams: ISearchParams) {
  const query = Object.entries(searchParams).reduce<
    Record<string, string | string[]>
  >((acc, [key, value]) => {
    if (value && typeof value === 'string') {
      acc[key] = key === 'q' ? value : value.split(',');
    }
    return acc;
  }, {});
  return query;
}
