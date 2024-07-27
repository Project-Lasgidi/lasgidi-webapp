import NavBar from '@/components/NavBar';
import { BrowseTabEnum, ISearchParams } from '@/types';
import { Banner } from '@/components/Banner';
import { v4 as uuid } from 'uuid';
import { Suspense } from 'react';
import { UpcomingConferences } from '@/components/Conference/UpcomingConferences';
import { CommunityListDelegate } from '@/components/Community/CommunityListDelegate';
import { ConferenceListDelegate } from '@/components/Conference/ConferenceListDelegate';
import { FilterSidebar } from '@/components/FilterSidebar';
import { BrowseControls } from '@/components/BrowseControls';

type Props = {
  searchParams?: ISearchParams;
};

export default async function Page({ searchParams }: Props) {
  return (
    <div id='homepage' className='min-h-screen py-10 lg:py-20'>
      <NavBar />
      <Banner />
      <Suspense fallback={<div>Loading carousel...</div>}>
        <UpcomingConferences />
      </Suspense>
      <BrowseControls />
      <div className='app-container flex flex-col md:mt-14 md:flex-row'>
        <FilterSidebar />
        <ul key={uuid()} role='list' className='flex-1'>
          {searchParams?.tab === BrowseTabEnum.COMMUNITY && (
            <Suspense fallback={<div>Loading communites...</div>}>
              <CommunityListDelegate searchParams={searchParams} />
            </Suspense>
          )}
          {searchParams?.tab === BrowseTabEnum.CONFERENCE && (
            <Suspense fallback={<div>Loading conferences...</div>}>
              <ConferenceListDelegate searchParams={searchParams} />
            </Suspense>
          )}
        </ul>
      </div>
    </div>
  );
}
