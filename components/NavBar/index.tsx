'use client';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';

const NavBar = () => (
  <header className='sticky top-0 z-30 w-full backdrop-blur backdrop-filter'>
    <DesktopNav />
    <MobileNav />
  </header>
);

export default NavBar;
