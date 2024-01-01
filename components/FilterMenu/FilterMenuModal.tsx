import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import FilterMenu from '.';
import classNames from '@/lib/classNames';

interface IFilterMenuModal {
  isOpen: boolean;
  onClose: () => void;
}

export const FilterMenuModal = ({ isOpen, onClose }: IFilterMenuModal) => {
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
          <Dialog.Panel className='relative w-full bg-white pt-9'>
            <div className='px-4'>
              <div className='flex items-center justify-between'>
                <p className='text-xl font-bold text-black'>Filter</p>
                <p className='text-right text-base font-normal text-black underline'>
                  Clear filters
                </p>
              </div>
              <div className='w-1/2'>
                <FilterMenu />
              </div>
            </div>

            <div className='absolute bottom-0 w-full border-t border-gray-100 bg-white px-4 pb-4 pt-2'>
              <button
                onClick={onClose}
                className={classNames(
                  'flex w-full items-center justify-center',
                  'rounded-full bg-black py-3 outline-none',
                  'text-base font-normal text-white'
                )}
              >
                Save
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};
