'use client';
import { BrowseTabEnum } from '@/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';

export const useActiveTab = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const activeTab = (searchParams.get('tab')?.toString() ||
    BrowseTabEnum.COMMUNITY) as BrowseTabEnum;

  const handleActiveTab = useCallback(
    (tab: BrowseTabEnum) => {
      const params = new URLSearchParams(searchParams);
      params.set('tab', tab);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, searchParams, pathname]
  );

  useEffect(() => {
    if (activeTab === BrowseTabEnum.COMMUNITY) {
      handleActiveTab(BrowseTabEnum.COMMUNITY);
    } else {
      handleActiveTab(BrowseTabEnum.CONFERENCE);
    }
  }, [activeTab, handleActiveTab]);

  return { activeTab, handleActiveTab };
};
