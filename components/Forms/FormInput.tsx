import { classNames } from '@/lib';
import React from 'react';
import { useFormContext } from 'react-hook-form';

type FormInputProps = {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
};

const FormInput: React.FC<FormInputProps> = ({
  label,
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
      <label htmlFor={name} className='mb-1.5 block font-bold text-gray-700'>
        {label}
      </label>
      <input
        className={classNames(
          'w-full appearance-none rounded-xl border bg-custom-gray px-3 py-2 leading-tight text-gray-700',
          'focus:border-black focus:outline-none',
          'placeholder:text-[#979797]',
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
