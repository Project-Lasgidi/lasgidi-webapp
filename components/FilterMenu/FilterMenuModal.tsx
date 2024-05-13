import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import FilterMenu from '.';
import Button from '../Forms/Button';
import { useFilterMenu } from './useFilterMenu';

interface IFilterMenuModal {
  isOpen: boolean;
  onClose: () => void;
}

export const FilterMenuModal = ({ isOpen, onClose }: IFilterMenuModal) => {
  const { hasCheckedItems, clearFilters } = useFilterMenu();

  return (
    <Transition
      show={isOpen}
      as={Fragment}
      enter='ease-out duration-300'
      enterFrom='opacity-0'
      enterTo='opacity-100'
      leave='ease-in duration-200'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
    >
      <Dialog className='relative' onClose={onClose}>
        <div className='fixed inset-0 z-50 flex h-screen w-screen'>
          <Dialog.Panel className='relative w-full bg-white py-4'>
            <div className='mb-4 px-4'>
              <div className='flex flex-wrap items-center justify-between'>
                <p className='text-xl font-bold text-black'>Filter</p>
                <div className='flex items-center gap-6'>
                  {hasCheckedItems() && (
                    <button
                      className='text-base font-normal text-black underline outline-none focus:outline-none'
                      onClick={clearFilters}
                    >
                      Clear filters
                    </button>
                  )}
                  <Button onClick={onClose} className='!py-1.5'>
                    Save
                  </Button>
                </div>
              </div>
            </div>
            <div className='h-full overflow-y-scroll'>
              <FilterMenu />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};
