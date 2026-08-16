import { useInfiniteQuery } from '@tanstack/react-query';
import { getPsychologists } from '@/lib/psychologists';
import { PsychologistsParams } from '@/types/psychologist';

const LIMIT = 4;

export function usePsychologists(
  filters: Omit<PsychologistsParams, 'page' | 'limit'>,
) {
  return useInfiniteQuery({
    queryKey: ['psychologists', filters],
    queryFn: ({ pageParam }) =>
      getPsychologists({ ...filters, page: pageParam, limit: LIMIT }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.length * LIMIT;
      return loaded < lastPage.total ? allPages.length + 1 : undefined;
    },
  });
}
