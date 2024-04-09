import { classNames } from '@/lib';
import React from 'react';
import { useFormContext } from 'react-hook-form';

type FormSelectProps = {
  label: string;
  name: string;
  placeholder?: string;
  options: { value: string; label: string }[];
};

const FormSelect: React.FC<FormSelectProps> = ({
  label,
  name,
  placeholder = '',
  options,
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
      <select
        className={classNames(
          'w-full rounded-xl border bg-custom-gray px-3 py-2 leading-tight text-gray-700',
          'focus:border-black focus:outline-none',
          'placeholder:text-[#979797]',
          !!errors[name]?.message && 'border-red-500'
        )}
        placeholder={placeholder}
        aria-invalid={errors[name]?.message ? 'true' : 'false'}
        {...register(name)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors[name] && (
        <span role='alert' className='mt-1 block text-xs italic text-red-500'>
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};

export default FormSelect;
