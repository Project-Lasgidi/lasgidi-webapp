import { classNames } from '@/lib';
import React from 'react';
import { useFormContext } from 'react-hook-form';

type FormTextAreaProps = {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
};

const FormTextArea: React.FC<FormTextAreaProps> = ({
  label,
  name,
  placeholder = '',
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <div className='flex justify-between'>
        <label htmlFor={name} className='mb-1.5 block font-bold text-gray-700'>
          {label}
        </label>

        <span className='text-[#5C5C5C]'>50 words max</span>
      </div>
      <textarea
        className={classNames(
          'h-40 w-full appearance-none rounded-xl border bg-custom-gray px-3 py-2 leading-tight text-gray-700',
          'focus:border-black focus:outline-none',
          'placeholder:text-[#979797]',
          !!errors[name]?.message && 'border-red-500'
        )}
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

export default FormTextArea;
