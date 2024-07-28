import React from 'react';
import {
  FigmaIcon,
  GithubLgIcon,
  NextJsIcon,
  StrapiIcon,
  VercelIcon,
} from '@/components/Icons';
import { StackItem } from './StackItem';

export const TechStack = () => (
  <div className='mb-12'>
    <p className='mb-4 text-xl font-bold text-black'>Tech stack</p>
    <div className='grid grid-cols-4'>
      <div className='col-span-2 flex flex-col gap-5'>
        <StackItem title='Figma' subTitle='Design' icon={<FigmaIcon />} />
        <StackItem title='Next.js' subTitle='Front-end' icon={<NextJsIcon />} />
        <StackItem
          title='Github'
          subTitle='Version Control'
          icon={<GithubLgIcon />}
        />
      </div>
      <div className='col-span-1 flex flex-col gap-5'>
        <StackItem title='Vercel' subTitle='Hosting' icon={<VercelIcon />} />
        <StackItem title='Strapi' subTitle='CMS' icon={<StrapiIcon />} />
      </div>
    </div>
  </div>
);
