import { classNames } from '@/lib';
import React, { RefObject, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

type FormDateInputProps = {
  name: string;
  placeholder: string;
  minDate?: string;
};

const FormDateInput: React.FC<FormDateInputProps> = ({
  name,
  placeholder,
  minDate,
}) => {
  const {
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const ref = useRef<HTMLInputElement>(null);
  const startDate = watch(name);

  const setInputType = (
    ref: RefObject<HTMLInputElement>,
    type: 'text' | 'date'
  ) => {
    if (ref.current) {
      ref.current.type = type;
    }
  };

  return (
    <div className='w-full'>
      <input
        ref={ref}
        className={classNames(
          'w-full appearance-none rounded-xl border bg-custom-gray px-3 py-2 leading-tight text-gray-700',
          'focus:border-black focus:outline-none',
          'placeholder:text-neutral-400',
          !!errors[name]?.message && 'border-red-500'
        )}
        aria-invalid={errors[name]?.message ? 'true' : 'false'}
        type='text'
        min={minDate}
        placeholder={placeholder}
        value={startDate}
        onFocus={() => setInputType(ref, 'date')}
        onBlur={() => {
          setInputType(ref, 'text');
          trigger(name);
        }}
        onChange={(e) => setValue(name, e.target.value)}
      />
      {errors[name] && (
        <span role='alert' className='mt-1 block text-xs italic text-red-500'>
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};

export default FormDateInput;
