import Image from 'next/image';

interface IMember {
  name: string;
  imgUrl: string;
  title: string;
}

export const Member = ({ name, imgUrl, title }: IMember) => (
  <div>
    <Image
      className='mb-2 h-32 w-full overflow-hidden rounded-2xl object-contain sm:w-32'
      src={imgUrl}
      alt={name}
      height={0}
      width={0}
    />
    <p className='text-center text-base font-normal text-black sm:text-left'>
      {name}
    </p>
    <p className='text-center text-sm font-normal text-zinc-600 sm:text-left'>
      {title}
    </p>
  </div>
);
