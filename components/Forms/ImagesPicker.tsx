import { useState, useRef, ChangeEvent } from 'react';
import Image from 'next/image';
import { AddIcon, DeleteIcon } from '@/components/Icons';

interface IImagesPicker {
  totalImages?: number;
  onImageChange: (files: File[]) => void;
}

export const ImagesPicker = ({
  totalImages = 5,
  onImageChange,
}: IImagesPicker) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [currentImage, setCurrentImage] = useState<File | null>(null);

  const ref = useRef<HTMLInputElement | null>(null);

  const removeImage = (file: File) => {
    const newImages = selectedImages.filter((img) => img !== file);
    setSelectedImages(newImages);
    onImageChange(newImages);

    if (currentImage === file) {
      const currentIndex = selectedImages.indexOf(file);
      const prevIndex = Math.max(0, currentIndex - 1);
      setCurrentImage(newImages[prevIndex] || null);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      const images = [...selectedImages, ...fileArray].slice(0, totalImages);
      setSelectedImages(images);
      onImageChange(images);

      if (!currentImage && images.length > 0) {
        setCurrentImage(images[0]);
      }
    }
  };

  return (
    <>
      <label className='text-[#5C5C5C]'>Add up to {totalImages} images</label>
      {currentImage ? (
        <Image
          src={URL.createObjectURL(currentImage)}
          alt='placeholder'
          height={100}
          width={100}
          className='aspect-video h-52 w-full rounded-lg object-cover'
        />
      ) : (
        <div className='h-52 w-full rounded-xl bg-custom-gray' />
      )}
      <div className='mt-2 flex items-center gap-x-2'>
        {selectedImages.length > 0 &&
          selectedImages.map((image, index) => (
            <div className='relative' key={index}>
              <DeleteIcon
                className='absolute bottom-1 right-2 z-10 h-6 w-6 cursor-pointer rounded-full bg-white p-1'
                onClick={() => removeImage(image)}
              />
              <Image
                src={URL.createObjectURL(image)}
                alt={image.name}
                layout='fixed'
                width={100}
                height={100}
                className='cursor-pointer rounded-xl'
                onClick={() => setCurrentImage(image)}
              />
            </div>
          ))}
        {selectedImages.length < totalImages && (
          <div
            className='flex h-14 w-20 cursor-pointer items-center justify-center rounded-xl bg-custom-gray px-6 py-3'
            onClick={() => ref.current?.click()}
          >
            <AddIcon />
          </div>
        )}
        <input
          ref={ref}
          multiple
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          hidden
        />
      </div>
    </>
  );
};
