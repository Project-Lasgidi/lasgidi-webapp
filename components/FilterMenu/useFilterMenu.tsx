import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface IMenuCategory {
  title: string;
  menuItems: {
    label: string;
    checked: boolean;
  }[];
}

export const useFilterMenu = ({
  initialCategories,
}: {
  initialCategories: IMenuCategory[];
}) => {
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
    const checkecItems: Record<string, string[]> = {};
    menuItems.forEach((category) => {
      const checkedLabels = category.menuItems
        .filter((item) => item.checked)
        .map((item) => item.label);
      checkecItems[category.title] = checkedLabels;
    });
    return checkecItems;
  };

  const createQueryParams = useCallback(
    (checkecItems: Record<string, string[]>) => {
      const params = new URLSearchParams(searchParams);

      Object.entries(checkecItems).forEach(([category, checkedLabels]) => {
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

  useEffect(() => {
    const checkedLabels = getCheckedLabels(menuCategories);
    createQueryParams(checkedLabels);
  }, [createQueryParams, menuCategories]);

  return {
    menuCategories,
    handleMenuItemCheck,
  };
};
