'use client';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';

const NavBar = () => (
  <header className='fixed -top-1 z-30 w-full backdrop-blur backdrop-filter'>
    <DesktopNav />
    <MobileNav />
  </header>
);

export default NavBar;
