import React from 'react';
import {
  DjangoLgIcon,
  FigmaIcon,
  GithubLgIcon,
  NetlifyIcon,
  NextJsIcon,
  StrapiIcon,
} from '@/components/Icons';
import { StackItem } from './StackItem';

export const TechStack = () => (
  <div className='mb-12'>
    <p className='mb-4 text-xl font-bold text-black'>Tech stack</p>
    <div className='grid grid-cols-4'>
      <div className='col-span-2 flex flex-col gap-5'>
        <StackItem title='Figma' subTitle='Design' icon={<FigmaIcon />} />
        <StackItem
          title='Github'
          subTitle='Version Control'
          icon={<GithubLgIcon />}
        />
        <StackItem title='Django' subTitle='Back-end' icon={<DjangoLgIcon />} />
      </div>
      <div className='col-span-1 flex flex-col gap-5'>
        <StackItem title='Nextjs' subTitle='Front-end' icon={<NextJsIcon />} />
        <StackItem title='Netlify' subTitle='Hosting' icon={<NetlifyIcon />} />
        <StackItem title='Strapi' subTitle='CMS' icon={<StrapiIcon />} />
      </div>
    </div>
  </div>
);
