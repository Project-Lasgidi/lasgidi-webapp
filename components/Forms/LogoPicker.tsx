import React, { ChangeEvent, useRef, useState } from 'react';
import { LogoPlaceholderIcon } from '../Icons';
import Image from 'next/image';
import { classNames } from '@/lib';

interface ILogoPicker {
  title: string;
  error?: string;
  onLogoChange: (file?: File) => void;
}

const LogoPicker = ({ title, error, onLogoChange }: ILogoPicker) => {
  const [logo, setLogo] = useState<File | undefined>(undefined);
  const conferenceImgRef = useRef<HTMLInputElement | null>(null);

  const handleLogoRemove = () => {
    setLogo(undefined);
    onLogoChange(undefined);
  };

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const file = files[0];
      setLogo(file);
      onLogoChange(file);
    }
  };

  return (
    <div>
      <div className='flex items-center gap-4'>
        {logo ? (
          <Image
            src={URL.createObjectURL(logo)}
            alt='Logo'
            height={100}
            width={100}
            className='h-24 w-24 rounded-xl'
          />
        ) : (
          <div
            className={classNames(
              'flex h-24 w-24 items-center justify-center rounded-xl border bg-custom-gray',
              error && 'border-red-500'
            )}
          >
            <LogoPlaceholderIcon />
          </div>
        )}

        <div>
          <p className='font-bold text-gray-700'>{title}</p>
          {logo ? (
            <p
              onClick={handleLogoRemove}
              className='cursor-pointer text-sm font-bold text-red-500 underline'
            >
              Delete
            </p>
          ) : (
            <div>
              <p
                className='cursor-pointer text-sm text-gray-500'
                onClick={() => conferenceImgRef.current?.click()}
              >
                Tap to upload
              </p>
              <input
                ref={conferenceImgRef}
                type='file'
                accept='image/*'
                hidden
                onChange={handleLogoChange}
              />
            </div>
          )}
        </div>
      </div>
      {error && (
        <span role='alert' className='mt-1 block text-xs italic text-red-500'>
          {error}
        </span>
      )}
    </div>
  );
};

export default LogoPicker;
