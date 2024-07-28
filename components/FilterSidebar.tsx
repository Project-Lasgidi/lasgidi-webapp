import FilterMenu from './FilterMenu';

export const FilterSidebar = () => {
  return (
    <div className='hidden md:w-[380px] lg:block'>
      <p className='mb-4 text-xl font-bold text-black'>Filter</p>
      <div className='scrollable-div max-h-screen-200 w-full overflow-y-auto overflow-x-hidden lg:max-h-screen-320'>
        <FilterMenu />
      </div>
    </div>
  );
};
