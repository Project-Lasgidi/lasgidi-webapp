'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SearchIcon } from './Icons';
import { useDebouncedCallback } from 'use-debounce';
import classNames from '@/lib/classNames';

const DEBOUNCE_TIME = 300;

const SearchBar = ({ searchFor }: { searchFor: string }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    term ? params.set('q', term) : params.delete('q');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, DEBOUNCE_TIME);

  return (
    <div className='flex h-10 w-96 items-center justify-start gap-1 border-b border-neutral-100 pb-3'>
      <SearchIcon className='pointer-events-none' />
      <input
        className={classNames(
          'w-full border-none pl-2',
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
