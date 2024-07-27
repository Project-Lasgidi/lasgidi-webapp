import { classNames } from '@/lib';
import React from 'react';
import { useFormContext } from 'react-hook-form';

type FormSelectProps = {
  label: string;
  subLabel?: string;
  name: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  defaultOption?: string;
};

const FormSelect: React.FC<FormSelectProps> = ({
  label,
  name,
  placeholder = '',
  options,
  subLabel,
  defaultOption = 'Select one',
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label htmlFor={name} className='block font-bold leading-5 text-gray-700'>
        {label}
      </label>
      {subLabel && <span className='leading-7 text-gray-500'>{subLabel}</span>}

      <div className='relative'>
        <select
          className={classNames(
            'h-11 w-full rounded-xl border bg-custom-gray px-3 py-2 leading-tight text-gray-700',
            'appearance-none focus:border-black focus:outline-none',
            !!errors[name]?.message && 'border-red-500'
          )}
          // placeholder={placeholder}
          aria-invalid={errors[name]?.message ? 'true' : 'false'}
          {...register(name)}
        >
          <option value='' disabled>
            {defaultOption}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <svg
          aria-hidden='true'
          width='14'
          height='8'
          viewBox='0 0 14 8'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='pointer-events-none absolute inset-y-0 right-4 h-full'
        >
          <path
            d='M1 1L7 7L13 1'
            stroke='black'
            strokeWidth='1.2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </div>
      {errors[name] && (
        <span role='alert' className='mt-1 block text-xs italic text-red-500'>
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};

export default FormSelect;
