import React, { ChangeEvent, useRef, useState } from 'react';
import { LogoPlaceholderIcon } from '../Icons';
import Image from 'next/image';

interface ILogoPicker {
  title: string;
  onLogoChange: (file: File | null) => void;
}

const LogoPicker = ({ title, onLogoChange }: ILogoPicker) => {
  const [logo, setLogo] = useState<File | null>(null);
  const conferenceImgRef = useRef<HTMLInputElement | null>(null);

  const handleLogoRemove = () => {
    setLogo(null);
    onLogoChange(null);
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
    <div className='flex items-center gap-4'>
      <div className='flex h-24 w-24 items-center justify-center rounded-xl border bg-custom-gray'>
        {logo ? (
          <Image
            src={URL.createObjectURL(logo)}
            alt='Logo'
            height={100}
            width={100}
          />
        ) : (
          <LogoPlaceholderIcon />
        )}
      </div>

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
  );
};

export default LogoPicker;
