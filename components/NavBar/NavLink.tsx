import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface INavLink {
  href: string;
  name: string;
}

export const NavLink = ({ href, name }: INavLink) => {
  const pathname = usePathname();
  const isActive = href === pathname;

  return (
    <Link href={href} passHref>
      <div className='flex flex-col items-center'>
        <p className='normal-text cursor-pointer'>{name}</p>
        {isActive && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='39'
            height='4'
            viewBox='0 0 39 4'
            fill='none'
          >
            <path d='M0 2L39 2' stroke='black' strokeWidth='3' />
          </svg>
        )}
      </div>
    </Link>
  );
};
