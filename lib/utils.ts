import { Media } from '@/payload-types';

export const getPayloadImageUrl = (image: string | Media) => {
  return typeof image === 'string' ? image : image?.url;
};
