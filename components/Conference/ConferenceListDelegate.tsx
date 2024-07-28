import { ISearchParams } from '@/types';
import { ConferenceList } from './ConferenceList';
import { fetchConferences } from '@/actions/conference';

interface IConferenceListDelegate {
  searchParams: ISearchParams;
}

export const ConferenceListDelegate = async ({
  searchParams,
}: IConferenceListDelegate) => {
  const { conferences, pagination } = await fetchConferences({
    searchParams,
  });

  return (
    <ConferenceList
      searchParams={searchParams}
      initialConferences={conferences}
      initialPagination={pagination}
    />
  );
};
