'use client';
import React, { useState } from 'react';
import FilterMenuItem from './FilterMenuItem';

const FilterMenu = () => {
  const [menuItems, setMenuItems] = useState([
    {
      title: 'Region',
      menuItems: [
        { title: 'Africa', isActive: true },
        { title: 'Europe', isActive: true },
      ],
    },
    {
      title: 'Languages',
      menuItems: [
        { title: 'Figma', isActive: true },
        { title: 'VS Code', isActive: true },
      ],
    },
    {
      title: 'Tools',
      menuItems: [
        { title: 'Python', isActive: true },
        { title: 'Javascript', isActive: true },
      ],
    },
  ]);

  return (
    <div>
      {menuItems.map((item) => (
        <FilterMenuItem
          key={item.title}
          title={item.title}
          subMenus={item.menuItems}
        />
      ))}
    </div>
  );
};

export default FilterMenu;
