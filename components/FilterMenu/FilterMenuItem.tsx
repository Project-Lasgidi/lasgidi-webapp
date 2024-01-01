import React from 'react';
import { Disclosure } from '@headlessui/react';
import { CaretIcon, CheckedIcon, UncheckedIcon } from '@/components/Icons';
import classNames from '@/lib/classNames';

interface IFilterMenuItem {
  title: string;
  subMenus: { title: string; isActive: boolean }[];
}

// TODO: Implement this
const FilterMenuItem = ({ title, subMenus }: IFilterMenuItem) => (
  <Disclosure>
    {({ open }) => (
      <>
        <Disclosure.Button as='div' className='mt-6 w-full'>
          <div className='flex cursor-pointer items-center justify-between'>
            <p className='text-base font-bold leading-relaxed text-black'>
              {title}
            </p>

            {subMenus?.length && (
              <CaretIcon
                stroke={'#BEBEBE'}
                className={classNames(
                  'transform transition-transform duration-300',
                  open ? 'rotate-90' : '-rotate-90'
                )}
              />
            )}
          </div>
        </Disclosure.Button>
        <Disclosure.Panel>
          {subMenus.length &&
            subMenus.map((item) => (
              <div
                key={item.title}
                className='mt-2 flex cursor-pointer items-center gap-2 pr-2'
                onClick={() => {}}
              >
                {item.isActive ? <CheckedIcon /> : <UncheckedIcon />}

                <p>{item.title}</p>
              </div>
            ))}
        </Disclosure.Panel>
      </>
    )}
  </Disclosure>
);

export default FilterMenuItem;
