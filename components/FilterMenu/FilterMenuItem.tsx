import React from 'react';
import { Disclosure, Switch } from '@headlessui/react';
import { CaretIcon, CheckedIcon, UncheckedIcon } from '@/components/Icons';
import classNames from '@/lib/classNames';

interface IFilterMenuItem {
  title: string;
  subMenus: { label: string; checked: boolean }[];
  onChecked: (checked: boolean, title: string, label: string) => void;
}

const FilterMenuItem = ({
  title,
  subMenus = [],
  onChecked,
}: IFilterMenuItem) => (
  <Disclosure>
    {({ open }) => (
      <>
        <Disclosure.Button as='div' className='mt-6 w-full'>
          <div className='flex cursor-pointer items-center justify-between'>
            <p className='text-base font-bold leading-relaxed text-black'>
              {title}
            </p>
            {subMenus.length && (
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
          {subMenus.map(({ checked, label }) => (
            <Switch.Group key={label}>
              <div className='mt-2 flex cursor-pointer items-center gap-2 pr-2'>
                <Switch
                  checked={checked}
                  onChange={(checked) => onChecked(checked, title, label)}
                  className='inline-flex h-5 w-5 rounded border'
                >
                  {checked ? <CheckedIcon /> : <UncheckedIcon />}
                </Switch>
                <Switch.Label>{label}</Switch.Label>
              </div>
            </Switch.Group>
          ))}
        </Disclosure.Panel>
      </>
    )}
  </Disclosure>
);

export default FilterMenuItem;
