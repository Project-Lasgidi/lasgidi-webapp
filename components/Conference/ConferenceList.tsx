'use client';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { IConference, IPagination, ISearchParams } from '@/types';
import { fetchConferences } from '@/actions/conference';
import { LoadingIcon } from '@/components/Icons';
import { ConferenceCardSmall } from './ConferenceCard/Small';

interface IConferenceList {
  searchParams: ISearchParams;
  initialConferences: IConference[];
  initialPagination: IPagination;
}

export const ConferenceList = ({
  searchParams,
  initialConferences = [],
  initialPagination,
}: IConferenceList) => {
  const [conferencies, setConferences] =
    useState<IConference[]>(initialConferences);
  const [pagination, setPagination] = useState<IPagination>(initialPagination);
  const [ref, inView] = useInView();

  const { page, pageSize, total } = pagination;
  const hasMore = page * pageSize < total;

  const loadMoreConferences = useCallback(async () => {
    if (!hasMore) return;
    const nextPage = page + 1;
    const response = await fetchConferences({
      page: nextPage,
      pageSize,
      searchParams,
    });
    if (response.conferences?.length) {
      setPagination(response.pagination);
      setConferences((prev) => [...prev, ...response.conferences]);
    }
  }, []);

  useEffect(() => {
    if (inView) {
      loadMoreConferences();
    }
  }, [inView, loadMoreConferences]);

  return (
    <>
      {!conferencies.length && (
        <div className='grid h-40 place-items-center'>
          <p>No conferences</p>
        </div>
      )}
      <div className='flex w-full flex-col gap-4'>
        {conferencies.map((conference: IConference) => (
          <ConferenceCardSmall key={conference.id} conference={conference} />
        ))}

        {hasMore && (
          <div
            ref={ref}
            className='mt-12 flex w-full items-center justify-center gap-2'
          >
            <LoadingIcon aria-hidden='true' className='h-6 w-6 animate-spin' />
            <span>Loading more...</span>
          </div>
        )}
      </div>
    </>
  );
};
