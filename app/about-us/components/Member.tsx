import Image from 'next/image';

interface IMember {
  name: string;
  imgUrl: string;
  title: string;
}

export const Member = ({ name, imgUrl, title }: IMember) => (
  <div>
    <Image
      className='mb-2 h-32 w-32 overflow-hidden rounded-2xl object-contain'
      src={imgUrl}
      alt={name}
      height={0}
      width={0}
    />
    <p className='text-base font-normal text-black'>{name}</p>
    <p className='text-sm font-normal text-zinc-600'>{title}</p>
  </div>
);
