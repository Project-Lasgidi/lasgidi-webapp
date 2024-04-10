'use client';
import { MenuIcon, TwitterIconSm } from '../Icons';
import Link from 'next/link';
import packageJson from '@/package.json';
import { GithubSmIcon, LogoIconLg, MenuCloseIcon } from '../Icons/SVGIcons';
import { useEffect, useState } from 'react';
import routes from '@/constants/routes';
import classNames from '@/lib/classNames';
import { SubmitPopover } from './SubmitPopover';
import { GITHUB_URL, TWITTER_URL } from '@/constants/links';

const displayOrder = ['Browse', 'About', 'Submit'];
const orderedRoutes = displayOrder.map((routeName) =>
  routes.find((route) => route.name === routeName)
);

export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const htmlElement = document.querySelector('html');
    if (htmlElement) {
      if (isOpen) {
        htmlElement.style.overflowY = 'hidden';
      } else {
        htmlElement.style.overflowY = 'scroll';
      }
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className='lg:hidden'>
      <div className='grid grid-cols-3 p-4'>
        <Link href='/'>
          <LogoIconLg className='cursor-pointer' aria-hidden='true' />
        </Link>
        <div className='flex items-center justify-center text-sm font-normal text-zinc-600'>
          v {packageJson.version}
        </div>
        <div className='flex items-center justify-end gap-3'>
          <Link href={GITHUB_URL} target='_blank'>
            <GithubSmIcon aria-hidden='true' />
          </Link>
          <Link href={TWITTER_URL} target='_blank'>
            <TwitterIconSm aria-hidden='true' />
          </Link>
          <div className='cursor-pointer'>
            {isOpen ? (
              <MenuCloseIcon onClick={handleClose} aria-hidden='true' />
            ) : (
              <MenuIcon onClick={() => setIsOpen(true)} aria-hidden='true' />
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <div className='relative'>
          <div
            className={classNames(
              'absolute inset-0 h-screen duration-300 ease-in-out',
              'bg-black/20 backdrop-blur backdrop-filter transition-opacity'
            )}
          />
          <div
            className={classNames(
              'absolute z-50 flex w-full flex-col gap-10 bg-white py-8',
              'px-4 transition-all duration-300 ease-in-out'
            )}
          >
            {orderedRoutes.map((route) => {
              if (route!.name.toLowerCase() === 'submit') {
                return <SubmitPopover key={route!.name} />;
              }
              return (
                <Link
                  key={route!.name}
                  href={route!.href}
                  className='text-xl font-bold text-black'
                  onClick={handleClose}
                >
                  {route!.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
