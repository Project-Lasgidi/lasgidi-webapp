import { BrowseTab } from '@/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';

export const useActiveTab = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const activeTab = (searchParams.get('tab')?.toString() ||
    BrowseTab.COMMUNITY) as BrowseTab;

  const handleActiveTab = useCallback(
    (tab: BrowseTab) => {
      const params = new URLSearchParams(searchParams);
      params.set('tab', tab);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, searchParams, pathname]
  );

  useEffect(() => {
    if (activeTab === BrowseTab.COMMUNITY) {
      handleActiveTab(BrowseTab.COMMUNITY);
    } else {
      handleActiveTab(BrowseTab.CONFERENCE);
    }
  }, [activeTab, handleActiveTab]);

  return { activeTab, handleActiveTab };
};
