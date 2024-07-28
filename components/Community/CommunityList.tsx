'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { IPagination, ISearchParams } from '@/types';
import { LoadingIcon } from '@/components/Icons';
import { CommunityCard } from './CommunityCard';
import { Community } from '@/payload-types';
import { fetchCommunities } from '@/actions/community';

interface ICommunityList {
  searchParams: ISearchParams;
  initialCommunities: Community[];
  initialPagination: IPagination;
}

export const CommunityList = ({
  searchParams,
  initialCommunities = [],
  initialPagination,
}: ICommunityList) => {
  const [communities, setCommunities] =
    useState<Community[]>(initialCommunities);
  const [pagination, setPagination] = useState<IPagination>(initialPagination);
  const [loaderRef, loaderInView] = useInView();
  const { hasNextPage, nextPage } = pagination;

  const loadMoreCommunities = async () => {
    if (!hasNextPage) return;

    const response = await fetchCommunities({
      page: nextPage,
      searchParams,
    });
    setPagination(response.pagination);
    setCommunities((prev) => [...prev, ...response.communities]);
  };

  useEffect(() => {
    if (loaderInView) {
      loadMoreCommunities();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaderInView]);

  return (
    <>
      {!communities.length && (
        <div className='grid h-40 place-items-center'>
          <p>No communities</p>
        </div>
      )}
      <div className='flex w-full flex-col'>
        {communities.map((community: Community, indec) => (
          <CommunityCard key={community.id} community={community} />
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
