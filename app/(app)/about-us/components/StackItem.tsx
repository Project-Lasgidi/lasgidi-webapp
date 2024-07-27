import React, { ReactNode } from 'react';

interface IStackItem {
  title: string;
  subTitle: string;
  icon: ReactNode;
}

export const StackItem = ({ title, subTitle, icon }: IStackItem) => (
  <div className='flex gap-2'>
    <div>{icon}</div>
    <div>
      <p className='text-base font-normal text-black'>{title}</p>
      <p className='text-sm font-normal text-zinc-600'>{subTitle}</p>
    </div>
  </div>
);
