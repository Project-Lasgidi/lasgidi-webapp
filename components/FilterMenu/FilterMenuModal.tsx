import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import FilterMenu from '.';
import Button from '../Forms/Button';
import { BrowseTab } from '@/types';

interface IFilterMenuModal {
  isOpen: boolean;
  activeTab: BrowseTab;
  onClose: () => void;
}

export const FilterMenuModal = ({
  isOpen,
  activeTab,
  onClose,
}: IFilterMenuModal) => {
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
            <div className='overflow-y-scroll h-full'>
              <FilterMenu activeTab={activeTab} />
            </div>
            <div className='absolute bottom-0 z-50 w-full border-t border-gray-100 bg-white px-4 pb-4 pt-2'>
              <Button onClick={onClose} className='w-full'>
                Save
              </Button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};
