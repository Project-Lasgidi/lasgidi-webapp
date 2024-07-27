import { ISearchParams } from '@/types';
import { CommunityList } from './CommunityList';
import { fetchCommunities } from '@/actions/community';

interface ICommunityListDelegate {
  searchParams: ISearchParams;
}

export const CommunityListDelegate = async ({
  searchParams,
}: ICommunityListDelegate) => {
  const { communities, pagination } = await fetchCommunities({
    searchParams,
  });

  return (
    <CommunityList
      searchParams={searchParams}
      initialCommunities={communities}
      initialPagination={pagination}
    />
  );
};
