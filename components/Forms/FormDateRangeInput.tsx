import React from 'react';
import FormDateInput from './FormDateInput';

type FormDateRangeInputProps = {
  label: string;
  subLabel?: string;
  startName: string;
  endName: string;
  startPlaceholder?: string;
  endPlaceholder?: string;
  minStartDate: string;
  minEndDate: string;
};

const FormDateRangeInput: React.FC<FormDateRangeInputProps> = ({
  label,
  subLabel,
  startName,
  endName,
  startPlaceholder = 'Start Date',
  endPlaceholder = 'End Date',
  minStartDate,
  minEndDate,
}) => {
  return (
    <div>
      <div className='mb-1.5'>
        <label htmlFor={startName} className='block font-bold text-gray-700'>
          {label}
        </label>
        {subLabel && (
          <span className='mt-0.5 block leading-4 text-gray-500'>
            {subLabel}
          </span>
        )}
      </div>
      <div className='flex gap-x-2'>
        <FormDateInput
          name={startName}
          placeholder={startPlaceholder}
          minDate={minStartDate}
        />
        <FormDateInput
          name={endName}
          placeholder={endPlaceholder}
          minDate={minEndDate}
        />
      </div>
    </div>
  );
};

export default FormDateRangeInput;
