'use client';
import Container from '@/components/Container';
import SearchBar from '@/components/SearBar';
import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import FilterMenu from './FilterMenu';
import {
  ICommunity,
  IConference,
  IPagination,
  ISearchParams,
  BrowseTab,
} from '@/types';
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

const tabs = [
  { id: BrowseTab.COMMUNITY, label: 'Communities' },
  { id: BrowseTab.CONFERENCE, label: 'Conferences' },
];

const CommunityConferenceList = ({
  searchParams,
  initialCommunities,
  initialPagination,
  initialConferences,
}: ICommunityList) => {
  const [activeTab, setActiveTab] = useState<BrowseTab>(BrowseTab.COMMUNITY);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <FilterMenuModal
        activeTab={activeTab}
        isOpen={isOpen}
        onClose={handleClose}
      />
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
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={classNames(
                    'rounded-full px-2 py-1 leading-relaxed transition-colors duration-200',
                    activeTab === tab.id
                      ? 'rounded-2xl bg-white px-3 font-bold text-black'
                      : 'font-normal text-zinc-600'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <FilterIcon
              className='cursor-pointer lg:hidden'
              onClick={handleOpen}
            />
          </div>
          <div className='mb-4 md:mb-0'>
            <SearchBar activeTab={activeTab} />
          </div>
        </div>
      </Container>
      <div className='mx-auto flex max-w-[1200px] flex-col md:mt-14 md:flex-row'>
        <div className='w-1/4'>
          <p className='text-xl font-bold text-black mb-4'>Filter</p>
          <div className='scrollable-div hidden max-h-screen-200 w-full overflow-y-auto overflow-x-hidden px-4 lg:block lg:max-h-screen-320 xl:pl-0'>
            <FilterMenu activeTab={activeTab} />
          </div>
        </div>
        <ul
          key={uuid()}
          role='list'
          className='scrollable-div max-h-screen-200 flex-1 overflow-y-auto lg:max-h-screen-320'
        >
          {activeTab === BrowseTab.COMMUNITY && (
            <CommunityList
              searchParams={searchParams}
              initialCommunities={initialCommunities}
              initialPagination={initialPagination}
            />
          )}
          {activeTab === BrowseTab.CONFERENCE && (
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
