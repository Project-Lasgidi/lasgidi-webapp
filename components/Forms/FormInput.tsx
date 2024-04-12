import { classNames } from '@/lib';
import React from 'react';
import { useFormContext } from 'react-hook-form';

type FormInputProps = {
  label: string;
  subLabel?: string;
  name: string;
  placeholder?: string;
  type?: string;
};

const FormInput: React.FC<FormInputProps> = ({
  label,
  subLabel,
  name,
  placeholder = '',
  type = 'text',
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <div className='mb-1.5'>
        <label htmlFor={name} className='block font-bold text-gray-700'>
          {label}
        </label>
        {subLabel && (
          <span className='mt-0.5 block leading-4 text-gray-500'>
            {subLabel}
          </span>
        )}
      </div>

      <input
        className={classNames(
          'h-11 w-full appearance-none rounded-xl border bg-custom-gray px-3 py-2 leading-tight text-gray-700',
          'focus:border-black focus:outline-none',
          'placeholder:text-neutral-400',
          !!errors[name]?.message && 'border-red-500'
        )}
        type={type}
        placeholder={placeholder}
        aria-invalid={errors[name]?.message ? 'true' : 'false'}
        {...register(name)}
      />
      {errors[name] && (
        <span role='alert' className='mt-1 block text-xs italic text-red-500'>
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};

export default FormInput;
