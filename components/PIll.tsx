import { classNames } from '@/lib';
import React from 'react';

interface IPill {
  title: string;
  className: string;
}

export const Pill = ({ title, className }: IPill) => {
  return (
    <button
      className={classNames(
        'rounded-full px-2 py-1 text-sm font-semibold',
        'pointer-events-none text-white no-underline hover:text-white focus:outline-none active:shadow-none',
        className
      )}
    >
      {title}
    </button>
  );
};
