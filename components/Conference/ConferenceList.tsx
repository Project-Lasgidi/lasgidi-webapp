'use client';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { IPagination, ISearchParams } from '@/types';
import { fetchConferences } from '@/actions/conference';
import { LoadingIcon } from '@/components/Icons';
import { ConferenceCardSmall } from './ConferenceCard/Small';
import { Conference } from '@/payload-types';

interface IConferenceList {
  searchParams: ISearchParams;
  initialConferences: Conference[];
  initialPagination: IPagination;
}

export const ConferenceList = ({
  searchParams,
  initialConferences = [],
  initialPagination,
}: IConferenceList) => {
  const [conferencies, setConferences] =
    useState<Conference[]>(initialConferences);
  const [pagination, setPagination] = useState<IPagination>(initialPagination);
  const [loaderRef, loaderInView] = useInView();
  const { hasNextPage, nextPage } = pagination;

  const loadMoreConferences = async () => {
    if (!hasNextPage) return;

    const response = await fetchConferences({
      page: nextPage,
      searchParams,
    });
    setPagination(response.pagination);
    setConferences((prev) => [...prev, ...response.conferences]);
  };

  useEffect(() => {
    if (loaderInView) {
      loadMoreConferences();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaderInView]);

  return (
    <>
      {!conferencies.length && (
        <div className='grid h-40 place-items-center'>
          <p>No conferences</p>
        </div>
      )}
      <div className='mt-6 flex w-full flex-col md:mt-0'>
        {conferencies.map((conference: Conference) => (
          <ConferenceCardSmall key={conference.id} conference={conference} />
        ))}

        {hasNextPage && (
          <div
            ref={loaderRef}
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
