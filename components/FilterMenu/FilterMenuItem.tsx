import React from 'react';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Field,
  Label,
  Switch,
} from '@headlessui/react';
import { CaretIcon, CheckedIcon, UncheckedIcon } from '@/components/Icons';
import classNames from '@/lib/classNames';

interface IFilterMenuItem {
  title: string;
  subMenus: { label: string; checked: boolean }[];
  onChecked: (checked: boolean, title: string, label: string) => void;
}

export const FilterMenuItem = ({
  title,
  subMenus = [],
  onChecked,
}: IFilterMenuItem) => {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <DisclosureButton as='div' className='mt-2 w-full'>
            <div className='flex cursor-pointer items-center justify-between'>
              <p className='text-base font-bold leading-relaxed text-black'>
                {title}
              </p>
              {subMenus.length && (
                <CaretIcon
                  stroke={'#BEBEBE'}
                  className={classNames(
                    'mr-2 transform transition-transform duration-300',
                    open ? 'rotate-90' : '-rotate-90'
                  )}
                />
              )}
            </div>
          </DisclosureButton>
          <DisclosurePanel>
            {subMenus.map(({ checked, label }) => (
              <Field key={label}>
                <div className='mt-2 flex cursor-pointer items-center gap-2 pr-2'>
                  <Switch
                    checked={checked}
                    onChange={(checked) => onChecked(checked, title, label)}
                    className='inline-flex h-5 w-5 rounded border'
                  >
                    {checked ? <CheckedIcon /> : <UncheckedIcon />}
                  </Switch>
                  <Label>{label}</Label>
                </div>
              </Field>
            ))}
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
};
