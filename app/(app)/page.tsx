import NavBar from '@/components/NavBar';
import { BrowseTabEnum, ISearchParams } from '@/types';
import { Banner } from '@/components/Banner';
import { v4 as uuid } from 'uuid';
import { Suspense } from 'react';
import {
  UpcomingConferences,
  UpcomingConferencesLoader,
} from '@/components/Conference/UpcomingConferences';
import { CommunityListDelegate } from '@/components/Community/CommunityListDelegate';
import { ConferenceListDelegate } from '@/components/Conference/ConferenceListDelegate';
import { FilterSidebar } from '@/components/FilterSidebar';
import { BrowseControls } from '@/components/BrowseControls';

type Props = {
  searchParams?: ISearchParams;
};

export default async function Page({ searchParams }: Props) {
  const isConferenceTab = searchParams?.tab === BrowseTabEnum.CONFERENCE;
  const isCommnunityOrNoTab =
    searchParams?.tab === BrowseTabEnum.COMMUNITY ||
    searchParams?.tab === undefined;

  return (
    <div id='homepage' className='min-h-screen py-10 lg:py-20'>
      <NavBar />
      <Banner />
      <Suspense fallback={<UpcomingConferencesLoader />}>
        <UpcomingConferences />
      </Suspense>
      <BrowseControls />
      <div className='app-container flex flex-col md:mt-14 md:flex-row'>
        <FilterSidebar />
        <ul key={uuid()} role='list' className='flex-1'>
          {isCommnunityOrNoTab && (
            <Suspense fallback={<div>Loading communites...</div>}>
              <CommunityListDelegate searchParams={searchParams!} />
            </Suspense>
          )}
          {isConferenceTab && (
            <Suspense fallback={<div>Loading conferences...</div>}>
              <ConferenceListDelegate searchParams={searchParams} />
            </Suspense>
          )}
        </ul>
      </div>
    </div>
  );
}
