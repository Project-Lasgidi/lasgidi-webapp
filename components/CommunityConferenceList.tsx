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
  initialConferencies: IConference[];
  initialPagination: IPagination;
}

enum Page {
  COMMUNITY = 'community',
  CONFERENCE = 'conference',
}

const CommunityConferenceList = ({
  searchParams,
  initialCommunities,
  initialPagination,
  initialConferencies,
}: ICommunityList) => {
  const [active, setActive] = useState<Page>(Page.COMMUNITY);
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleOpen = () => {
    setIsOpen(true);
  };

  const activeStyle = 'bg-white px-3 text-black !font-bold rounded-2xl';
  const inActiveStyle =
    'text-base font-normal leading-relaxed text-zinc-600 cursor-pointer rounded-2xl py-1 px-2';

  const isConference = active === Page.CONFERENCE;
  const isCommunity = active === Page.COMMUNITY;

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
              <p
                className={classNames(
                  inActiveStyle,
                  isCommunity && activeStyle
                )}
                onClick={() => {
                  setActive(Page.COMMUNITY);
                }}
              >
                Communities
              </p>
              <p
                className={classNames(
                  inActiveStyle,
                  isConference && activeStyle
                )}
                onClick={() => {
                  setActive(Page.CONFERENCE);
                }}
              >
                Conferences
              </p>
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
        <div className='hidden w-1/4 pl-4 lg:block xl:pl-0'>
          <p className='text-xl font-bold text-black'>Filter</p>
          <FilterMenu />
        </div>
        <ul
          key={uuid()}
          role='list'
          className='scrollable-div max-h-screen-200 lg:max-h-screen-320 flex-1 overflow-y-auto'
        >
          {isCommunity && (
            <CommunityList
              searchParams={searchParams}
              initialCommunities={initialCommunities}
              initialPagination={initialPagination}
            />
          )}
          {isConference && (
            <ConferenceList
              searchParams={searchParams}
              initialConferencies={initialConferencies}
              initialPagination={initialPagination}
            />
          )}
        </ul>
      </div>
    </>
  );
};

export default CommunityConferenceList;
