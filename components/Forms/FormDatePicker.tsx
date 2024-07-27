import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { classNames } from '@/lib';
import { DateIcon } from '../Icons';

interface IFormDatePicker {
  placeholder: string;
  error?: string;
  onChange: (value: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  value?: Date | string | null;
}

// eslint-disable-next-line react/display-name
export const FormDatePicker = React.forwardRef<
  HTMLInputElement,
  IFormDatePicker
>(
  (
    { placeholder, error, onChange, minDate, maxDate, value, ...props },
    ref
  ) => {
    return (
      <div className='relative'>
        <DatePicker
          // ref={ref}
          className={classNames(
            'w-full rounded-xl border bg-custom-gray px-3 py-2.5 leading-tight text-gray-700',
            'cursor-pointer focus:border-black focus:outline-none',
            'placeholder:text-neutral-400',
            error && 'border-red-500'
          )}
          minDate={minDate}
          maxDate={maxDate}
          selected={value ? new Date(value) : null}
          placeholderText={placeholder}
          onChange={(val: any) => {
            onChange(val);
          }}
          {...props}
        />
        <DateIcon className='absolute right-3 top-2' />
        {error && (
          <span role='alert' className='mt-1 block text-xs italic text-red-500'>
            {error}
          </span>
        )}
      </div>
    );
  }
);
