'use client';
import React, { useMemo } from 'react';
import FilterMenuItem from './FilterMenuItem';
import { useFilterMenu } from './useFilterMenu';
import regions from '@/constants/regions';
import programmingLanguages from '@/constants/programmingLanguages';
import tools from '@/constants/tools';
import { BrowseTab } from '@/types';

const transformMenuCaterogy = (title: string, data: string[]) => ({
  title,
  menuItems: data.map((item) => ({ label: item, checked: false })),
});

interface IFilterMenu {
  activeTab: BrowseTab;
}

const FilterMenu = ({ activeTab }: IFilterMenu) => {
  const initialCategories = useMemo(
    () => [
      transformMenuCaterogy('Regions', regions),
      transformMenuCaterogy('Languages', programmingLanguages),
      transformMenuCaterogy('Tools', tools),
    ],
    []
  );

  const { menuCategories, handleMenuItemCheck, clearFilters, hasCheckedItems } =
    useFilterMenu({
      activeTab,
      initialCategories,
    });

  return (
    <div className='px-4 lg:px-0'>
      <div className='flex items-center justify-between'>
        {hasCheckedItems() && (
          <p
            className='cursor-pointer text-right text-base font-normal text-black underline md:hidden'
            onClick={clearFilters}
          >
            Clear filters
          </p>
        )}
      </div>

      {menuCategories.map((item) => (
        <FilterMenuItem
          key={item.title}
          title={item.title}
          subMenus={item.menuItems}
          onChecked={handleMenuItemCheck}
        />
      ))}
    </div>
  );
};

export default FilterMenu;
