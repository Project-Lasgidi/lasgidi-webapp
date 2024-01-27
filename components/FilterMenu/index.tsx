'use client';
import React from 'react';
import FilterMenuItem from './FilterMenuItem';
import { useFilterMenu } from './useFilterMenu';

const initialCategories = [
  {
    title: 'Region',
    menuItems: [
      { label: 'Africa', checked: false },
      { label: 'Europe', checked: false },
    ],
  },
  {
    title: 'Languages',
    menuItems: [
      { label: 'Figma', checked: false },
      { label: 'VS Code', checked: false },
    ],
  },
  {
    title: 'Tools',
    menuItems: [
      { label: 'Python', checked: false },
      { label: 'Javascript', checked: false },
    ],
  },
];

const FilterMenu = () => {
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
