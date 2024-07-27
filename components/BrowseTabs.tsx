'use client'
import { BrowseTabEnum } from '@/types';
import classNames from '@/lib/classNames';
import { useActiveTab } from '../hooks';

const tabs = [
  { id: BrowseTabEnum.COMMUNITY, label: 'Communities' },
  { id: BrowseTabEnum.CONFERENCE, label: 'Conferences' },
];

export const BrowseTabs = () => {
  const { activeTab, handleActiveTab } = useActiveTab();

  return (
    <div className='flex w-fit items-center gap-4 rounded-3xl bg-neutral-100 p-2'>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleActiveTab(tab.id)}
          className={classNames(
            'rounded-full px-2 py-1 leading-relaxed transition-colors duration-200',
            activeTab === tab.id
              ? 'rounded-2xl bg-white px-3 font-bold text-black'
              : 'font-normal text-zinc-600'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
