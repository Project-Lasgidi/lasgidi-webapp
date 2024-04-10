import Link from 'next/link';
import { Popover, Transition } from '@headlessui/react';
import { Fragment, useRef } from 'react';
import {
  CaretLgIcon,
  CommunityIcon,
  MicrophoneIcon,
  OpensourceIcon,
} from '../Icons';
import classNames from '@/lib/classNames';

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

export const SubmitPopover = () => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const timeoutDuration = 200;
  let timeout: NodeJS.Timeout;

  const closePopover = () => {
    return buttonRef.current?.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        cancelable: true,
      })
    );
  };
  const onMouseEnter = (open: boolean) => {
    clearTimeout(timeout);
    if (!open) {
      buttonRef.current?.click();
    }
  };
  const onMouseLeave = (open: boolean) => {
    if (open) {
      timeout = setTimeout(() => closePopover(), timeoutDuration);
    }
  };

  return (
    <div className='top-4 w-full'>
      <Popover className='relative'>
        {({ open }) => {
          return (
            <div onMouseLeave={() => onMouseLeave(open)}>
              <Popover.Button
                ref={buttonRef}
                className='inline-flex w-full items-center justify-between text-white outline-none'
                onMouseEnter={() => onMouseEnter(open)}
              >
                <span
                  className={classNames(
                    'lg:normal-text inline-flex justify-center',
                    'text-xl font-bold text-black lg:font-normal'
                  )}
                >
                  Submit
                </span>
                <CaretLgIcon
                  className={`transform transition-transform duration-300 lg:hidden ${
                    open ? '' : 'rotate-180'
                  }`}
                />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter='transition ease-out duration-200'
                enterFrom='opacity-0 translate-y-1'
                enterTo='opacity-100 translate-y-0'
                leave='transition ease-in duration-150'
                leaveFrom='opacity-100 translate-y-0'
                leaveTo='opacity-0 translate-y-1'
              >
                <Popover.Panel
                  onMouseEnter={() => onMouseEnter(open)}
                  onMouseLeave={() => onMouseLeave(open)}
                  className={classNames(
                    'absolute left-1/2 top-10 z-10 mt-0 w-screen -translate-x-1/2 transform',
                    'bg-white lg:max-w-[330px] lg:rounded-lg lg:shadow-lg',
                    'overflow-hidden lg:ring-1 lg:ring-black lg:ring-opacity-5'
                  )}
                >
                  <div className='relative flex flex-col pb-8 lg:pb-0'>
                    {proposals.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <div className='flex gap-2.5 px-4 py-3'>
                          <item.icon
                            aria-hidden='true'
                            className='flex h-6 w-6 flex-shrink-0 items-center justify-center text-white'
                          />
                          <p className='text-base text-black'>{item.name}</p>
                        </div>
                      </Link>
                    ))}
                    <div
                      className={classNames(
                        'flex w-screen items-center justify-between',
                        'gap-2.5 px-4 py-3 lg:w-full lg:justify-normal'
                      )}
                    >
                      <div className='flex items-center gap-2.5'>
                        <OpensourceIcon
                          aria-hidden='true'
                          className='flex h-6 w-6 flex-shrink-0 opacity-30'
                        />
                        <span className='text-black/30'>
                          An Open Source Project
                        </span>
                      </div>
                      <span
                        className={classNames(
                          'inline-flex w-fit justify-center rounded-3xl px-3 py-1.5',
                          'bg-[#306998] text-center text-xs font-bold lowercase text-white'
                        )}
                      >
                        coming soon
                      </span>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </div>
          );
        }}
      </Popover>
    </div>
  );
};
