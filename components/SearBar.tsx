'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SearchIcon } from './Icons';
import { useDebouncedCallback } from 'use-debounce';
import classNames from '@/lib/classNames';
import { BrowseTab } from '@/types';

const DEBOUNCE_TIME = 300;

const SearchBar = ({ activeTab }: { activeTab: BrowseTab }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('q', term);
      params.set('tab', activeTab);
    } else {
      params.delete('q');
      const paramsCount = Array.from(searchParams.entries()).length;
      if (paramsCount <= 1) {
        params.delete('tab');
      }
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, DEBOUNCE_TIME);

  return (
    <div className='flex h-10 w-full items-center  justify-start gap-1 border-b border-neutral-100 pb-3 md:w-96'>
      <SearchIcon className='pointer-events-none' />
      <input
        className={classNames(
          'w-full border-none pl-2 text-xl font-medium',
          'placeholder:text-xl placeholder:font-medium placeholder:text-stone-300',
          'focus:outline-none'
        )}
        placeholder='Search conferences or communities'
        defaultValue={searchParams.get('q')?.toString()}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchBar;
