'use client';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { IConference, IPagination } from '@/types';
import { fetchCommunities } from '@/actions/community';
import { LoadingIcon } from '@/components/Icons';
import conferences from '@/data/conferences';
import { ConferenceCardSmall } from './ConferenceCard/Small';

interface IConferenceList {
  text?: string;
  initialConferencies: IConference[];
  initialPagination: IPagination;
}

export const ConferenceList = ({
  text,
  initialConferencies = [],
  initialPagination,
}: IConferenceList) => {
  const [communities, setCommunities] =
    useState<IConference[]>(initialConferencies);
  // const [pagination, setPagination] = useState<IPagination>(initialPagination);
  // const [ref, inView] = useInView();

  // const { page, pageSize, total } = pagination;
  // const hasMore = page * pageSize < total;

  // const loadMoreCommunities = useCallback(async () => {
  //   if (!hasMore) return;
  //   const nextPage = page + 1;
  //   const response = await fetchCommunities({
  //     page: nextPage,
  //     pageSize,
  //     text: text,
  //   });
  //   if (response.communities?.length) {
  //     setPagination(response.pagination);
  //     setCommunities((prev) => [...prev, ...response.communities]);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (inView) {
  //     loadMoreCommunities();
  //   }
  // }, [inView, loadMoreCommunities]);

  return (
    <>
      <div className='flex w-full flex-col gap-4'>
        {/* {!communities.length && (
          <div className="w-full flex items-center justify-center">
            <div className="w-96"/>
            <p>No communities</p>
          </div>
        )} */}

        {communities.map((conference: IConference) => (
          <ConferenceCardSmall key={conference.id} conference={conference} />
        ))}

        {/* {hasMore && (
          <div
            ref={ref}
            className="w-full flex items-center justify-center gap-2 mt-12"
          >
            <LoadingIcon aria-hidden="true" className="h-6 w-6 animate-spin" />
            <span>Loading more...</span>
          </div>
        )} */}
      </div>
    </>
  );
};
