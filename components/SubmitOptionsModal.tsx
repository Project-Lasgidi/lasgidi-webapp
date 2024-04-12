import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  CommunityIcon,
  MicrophoneIcon,
  ModalCloseIcon,
  OpensourceIcon,
} from './Icons';
import Link from 'next/link';
import { Pill } from './PIll';

const proposals = [
  {
    name: 'A Tech Community',
    href: '/submit/community',
    icon: CommunityIcon,
  },
  {
    name: 'A Tech Conference',
    href: '/submit/conference',
    icon: MicrophoneIcon,
  },
];

interface ISubmitOptionsModal {
  isOpen: boolean;
  onClose: () => void;
}

export const SubmitOptionsModal = ({
  isOpen,
  onClose,
}: ISubmitOptionsModal) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/30' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex h-3/4 items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-sm transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all'>
                <div className='flex items-center justify-between border-b py-1.5 pl-4 pr-1.5'>
                  <h2 className='font-bold'>What do you want to submit?</h2>
                  <div
                    className='grid cursor-pointer place-items-center rounded-full bg-transparent p-2.5 transition-colors duration-500 hover:bg-gray-200'
                    onClick={onClose}
                  >
                    <ModalCloseIcon />
                  </div>
                </div>
                <div className='px-4'>
                  {proposals.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <div className='flex items-center justify-between'>
                        <div className='flex gap-2.5 py-3'>
                          <item.icon
                            aria-hidden='true'
                            className='flex h-6 w-6 flex-shrink-0 items-center justify-center text-white'
                          />
                          <p className='text-base text-black'>{item.name}</p>
                        </div>
                        <svg
                          width='6'
                          height='12'
                          viewBox='0 0 6 12'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M1 10.5L5 6L1 1.5'
                            stroke='#C9C9C9'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                      </div>
                    </Link>
                  ))}
                  <div className='flex w-full items-center justify-between gap-2.5 py-3'>
                    <div className='flex items-center gap-2.5'>
                      <OpensourceIcon
                        aria-hidden='true'
                        className='flex h-6 w-6 flex-shrink-0 opacity-30'
                      />
                      <span className='text-black/30'>
                        An Open Source Project
                      </span>
                    </div>
                    <Pill
                      title='coming soon'
                      className='border-[#306998] bg-[#306998]'
                    />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
