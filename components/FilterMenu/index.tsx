'use client';
import React from 'react';
import FilterMenuItem from './FilterMenuItem';
import { useFilterMenu } from './useFilterMenu';

const FilterMenu = () => {
  const { menuCategories, handleMenuItemCheck } = useFilterMenu();

  return (
    <div className='px-4 lg:px-0'>
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
