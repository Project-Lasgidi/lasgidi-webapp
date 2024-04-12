'use client';

import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { ICommunity, IPagination, ISearchParams } from '@/types';
import { fetchCommunities } from '@/actions/community';
import { LoadingIcon } from '@/components/Icons';
import { CommunityCard } from './CommunityCard';

interface ICommunityList {
  searchParams: ISearchParams;
  initialCommunities: ICommunity[];
  initialPagination: IPagination;
}

export const CommunityList = ({
  searchParams,
  initialCommunities = [],
  initialPagination,
}: ICommunityList) => {
  const [communities, setCommunities] =
    useState<ICommunity[]>(initialCommunities);
  const [pagination, setPagination] = useState<IPagination>(initialPagination);
  const [loaderRef, loaderInView] = useInView();

  const { page, pageSize, total } = pagination;
  const hasMore = page * pageSize < total;

  const loadMoreCommunities = useCallback(async () => {
    if (!hasMore) return;
    const nextPage = page + 1;
    const response = await fetchCommunities({
      page: nextPage,
      pageSize,
      searchParams,
    });
    if (response.communities?.length) {
      setPagination(response.pagination);
      setCommunities((prev) => [...prev, ...response.communities]);
    }
  }, []);

  useEffect(() => {
    if (loaderInView) {
      loadMoreCommunities();
    }
  }, [loaderInView, loadMoreCommunities]);

  return (
    <>
      {!communities.length && (
        <div className='grid h-40 place-items-center'>
          <p>No communities</p>
        </div>
      )}
      <div className='flex w-full flex-col'>
        {communities.map((community: ICommunity) => (
          <CommunityCard
            logo={community.logo}
            key={community.id}
            name={community.name}
            description={community.description}
            programs={community.platforms}
            website={community.website}
          />
        ))}
        {hasMore && (
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
