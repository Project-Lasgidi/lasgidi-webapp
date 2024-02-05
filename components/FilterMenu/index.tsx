'use client';
import React, { useMemo } from 'react';
import FilterMenuItem from './FilterMenuItem';
import { useFilterMenu } from './useFilterMenu';
import regions from '@/constants/regions';
import programmingLanguages from '@/constants/programmingLanguages';
import tools from '@/constants/tools';

const transformMenuCaterogy = (title: string, data: string[]) => ({
  title,
  menuItems: data.map((item) => ({ label: item, checked: false })),
});

const FilterMenu = () => {
  const initialCategories = useMemo(
    () => [
      transformMenuCaterogy('Region', regions),
      transformMenuCaterogy('Languages', programmingLanguages),
      transformMenuCaterogy('Tools', tools),
    ],
    []
  );

  const { menuCategories, handleMenuItemCheck } = useFilterMenu({
    initialCategories,
  });

  return (
    <div>
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
