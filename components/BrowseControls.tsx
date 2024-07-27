'use client';
import { FilterMenuModal } from './FilterMenu/FilterMenuModal';
import { SearchBar } from './SearchBar';
import { BrowseTabs } from './BrowseTabs';

export const BrowseControls = () => {
  return (
    <div className='app-container'>
      <h3 id='browse' className='text-4xl font-bold leading-relaxed text-black'>
        Browse
      </h3>
      <div className='flex flex-col justify-between gap-8 md:flex-row'>
        <div className='flex items-center justify-between'>
          <BrowseTabs />
          <FilterMenuModal />
        </div>
        <div className='mb-4 md:mb-0'>
          <SearchBar />
        </div>
      </div>
    </div>
  );
};
