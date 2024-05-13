'use client';
import Container from '../Container';
import { LogoIcon, NavGithubIcon, TwitterIcon } from '../Icons';
import { NavLink } from './NavLink';
import Link from 'next/link';
import packageJson from '@/package.json';
import routes from '@/constants/routes';
import { GITHUB_URL, TWITTER_URL } from '@/constants/links';
import { SubmitPopover } from './SubmitPopover';
import classNames from '@/lib/classNames';

export const DesktopNav = () => (
  <Container className='hidden py-2.5 lg:block'>
    <div className='flex items-center justify-between'>
      <div className='text-sm font-normal text-zinc-600'>
        v {packageJson.version}
      </div>

      <div
        className={classNames(
          'flex items-center justify-start gap-10 bg-white bg-opacity-80 pl-4 pr-6',
          'rounded-3xl border border-neutral-100 border-opacity-60 backdrop-blur-2xl'
        )}
      >
        <Link href='/'>
          <LogoIcon className='cursor-pointer' />
        </Link>
        <nav className='flex items-center gap-x-5'>
          {routes.map(({ name, href }) => {
            if (name.toLowerCase() === 'submit') {
              return <SubmitPopover key={name} />;
            }
            return <NavLink key={name} href={href} name={name} />;
          })}
        </nav>
      </div>
      <div className='flex items-center gap-3'>
        <Link href={GITHUB_URL} target='_blank'>
          <NavGithubIcon className='rounded-full transition duration-500 hover:bg-neutral-100' />
        </Link>
        <Link href={TWITTER_URL} target='_blank'>
          <TwitterIcon className='rounded-full transition duration-500 hover:bg-neutral-100' />
        </Link>
      </div>
    </div>
  </Container>
);
