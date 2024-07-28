'use client';
import { Fragment, useState } from 'react';
import { Dialog, DialogPanel, Transition } from '@headlessui/react';
import FilterMenu from '.';
import Button from '../Forms/Button';
import { useFilterMenu } from './useFilterMenu';
import { FilterIcon } from '../Icons';
import { useMediaQuery } from 'usehooks-ts';

export const FilterMenuModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isSmallDevice = useMediaQuery('only screen and (max-width : 768px)');
  const isMediumDevice = useMediaQuery(
    'only screen and (min-width : 769px) and (max-width : 992px)'
  );
  const supportedDevices = isSmallDevice || isMediumDevice;

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const { hasCheckedItems, clearFilters } = useFilterMenu();

  return (
    <>
      <FilterIcon className='cursor-pointer lg:hidden' onClick={handleOpen} />
      <Transition
        show={supportedDevices && isOpen}
        as={Fragment}
        enter='ease-out duration-300'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='ease-in duration-200'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <Dialog className='relative' onClose={handleClose}>
          <div className='fixed inset-0 z-50 flex h-screen w-screen'>
            <DialogPanel className='relative w-full bg-white py-4'>
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
                    <Button onClick={handleClose} className='!py-1.5'>
                      Save
                    </Button>
                  </div>
                </div>
              </div>
              <div className='h-full overflow-y-scroll'>
                <FilterMenu />
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
