import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import regions from '@/constants/regions';
import programmingLanguages from '@/constants/programmingLanguages';
import tools from '@/constants/tools';

const transformMenuCaterogy = (title: string, data: string[]) => ({
  title,
  menuItems: data.map((item) => ({ label: item, checked: false })),
});

const initialCategories = [
  transformMenuCaterogy('Regions', regions),
  transformMenuCaterogy('Languages', programmingLanguages),
  transformMenuCaterogy('Tools', tools),
];

interface IMenuCategory {
  title: string;
  menuItems: {
    label: string;
    checked: boolean;
  }[];
}

export const useFilterMenu = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [menuCategories, setMenuCategories] =
    useState<IMenuCategory[]>(initialCategories);

  const handleMenuItemCheck = (
    checked: boolean,
    title: string,
    label: string
  ) => {
    setMenuCategories((prevMenuCategories) => {
      const updatedMenuCategories = [...prevMenuCategories];
      const categoryIndex = updatedMenuCategories.findIndex(
        (item) => item.title === title
      );
      if (categoryIndex < 0) return updatedMenuCategories;
      const labelIndex = updatedMenuCategories[
        categoryIndex
      ].menuItems.findIndex((item) => item.label === label);
      if (labelIndex < 0) return updatedMenuCategories;
      updatedMenuCategories[categoryIndex].menuItems[labelIndex].checked =
        checked;

      return updatedMenuCategories;
    });
  };

  const getCheckedLabels = (menuItems: IMenuCategory[]) => {
    const checkedItems: Record<string, string[]> = {};
    menuItems.forEach((category) => {
      const checkedLabels = category.menuItems
        .filter((item) => item.checked)
        .map((item) => item.label);
      checkedItems[category.title] = checkedLabels;
    });
    return checkedItems;
  };

  const createQueryParams = useCallback(
    (checkedItems: Record<string, string[]>) => {
      const params = new URLSearchParams(searchParams);

      Object.entries(checkedItems).forEach(([category, checkedLabels]) => {
        const lowerCategory = category.toLowerCase();
        if (checkedLabels.length) {
          params.set(lowerCategory, checkedLabels.join(','));
        } else {
          params.delete(lowerCategory);
        }
      });

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const clearFilters = () => {
    setMenuCategories((prevMenuCategories) => {
      const updatedMenuCategories = [...prevMenuCategories];
      updatedMenuCategories.forEach((category) => {
        category.menuItems.forEach((item) => {
          item.checked = false;
        });
      });
      return updatedMenuCategories;
    });
  };

  const hasCheckedItems = () => {
    return menuCategories.some((category) =>
      category.menuItems.some((item) => item.checked)
    );
  };

  useEffect(() => {
    const checkedLabels = getCheckedLabels(menuCategories);
    createQueryParams(checkedLabels);
  }, [createQueryParams, menuCategories]);

  useEffect(() => {
    const parseSearchParams = (key: string): string[] =>
      searchParams.get(key)?.split(',') || [];

    const checkedItems: Record<string, string[]> = {
      Tools: parseSearchParams('tools'),
      Regions: parseSearchParams('regions'),
      Languages: parseSearchParams('languages'),
    };

    setMenuCategories((prevMenuCategories) =>
      prevMenuCategories.map((category) => ({
        ...category,
        menuItems: category.menuItems.map((item) => ({
          ...item,
          checked: checkedItems[category.title].includes(item.label),
        })),
      }))
    );
  }, [searchParams]);

  return {
    menuCategories,
    handleMenuItemCheck,
    clearFilters,
    hasCheckedItems,
  };
};
