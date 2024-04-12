'use client';
import Container from '@/components/Container';
import SearchBar from '@/components/SearBar';
import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import FilterMenu from './FilterMenu';
import { ICommunity, IConference, IPagination, ISearchParams } from '@/types';
import classNames from '@/lib/classNames';
import { CommunityList } from './Community/CommunityList';
import { ConferenceList } from './Conference/ConferenceList';
import { FilterIcon } from './Icons';
import { FilterMenuModal } from './FilterMenu/FilterMenuModal';

interface ICommunityList {
  searchParams: ISearchParams;
  initialCommunities: ICommunity[];
  initialConferences: IConference[];
  initialPagination: IPagination;
}

enum Page {
  COMMUNITY = 'community',
  CONFERENCE = 'conference',
}

const tabs = [
  { id: Page.COMMUNITY, label: 'Communities' },
  { id: Page.CONFERENCE, label: 'Conferences' },
];

const CommunityConferenceList = ({
  searchParams,
  initialCommunities,
  initialPagination,
  initialConferences,
}: ICommunityList) => {
  const [active, setActive] = useState<Page>(Page.COMMUNITY);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <FilterMenuModal isOpen={isOpen} onClose={handleClose} />
      <Container>
        <h3
          id='browse'
          className='text-4xl font-bold leading-relaxed text-black'
        >
          Browse
        </h3>
        <div className='flex flex-col justify-between gap-8 md:flex-row'>
          <div className='flex items-center justify-between'>
            <div className='flex w-fit items-center gap-4 rounded-3xl bg-neutral-100 p-2'>
              {tabs.map((tab) => (
                <p
                  key={tab.id}
                  onClick={() => setActive(tab.id)}
                  className={classNames(
                    'cursor-pointer rounded-2xl px-2 py-1 font-normal leading-relaxed text-zinc-600 transition-all duration-200',
                    active === tab.id &&
                      'rounded-2xl bg-white px-3 !font-bold text-black'
                  )}
                >
                  {tab.label}
                </p>
              ))}
            </div>
            <FilterIcon
              className='cursor-pointer lg:hidden'
              onClick={handleOpen}
            />
          </div>
          <SearchBar searchFor='community' />
        </div>
      </Container>
      <div className='mx-auto flex max-w-[1200px] flex-col md:mt-14 md:flex-row'>
        <div className='scrollable-div max-h-screen-200 lg:max-h-screen-320 hidden w-1/4 overflow-y-auto overflow-x-hidden pl-4 lg:block xl:pl-0'>
          <p className='text-xl font-bold text-black'>Filter</p>
          <FilterMenu />
        </div>
        <ul
          key={uuid()}
          role='list'
          className='scrollable-div max-h-screen-200 lg:max-h-screen-320 flex-1 overflow-y-auto'
        >
          {active === Page.COMMUNITY && (
            <CommunityList
              searchParams={searchParams}
              initialCommunities={initialCommunities}
              initialPagination={initialPagination}
            />
          )}
          {active === Page.CONFERENCE && (
            <ConferenceList
              searchParams={searchParams}
              initialConferences={initialConferences}
              initialPagination={initialPagination}
            />
          )}
        </ul>
      </div>
    </>
  );
};

export default CommunityConferenceList;
