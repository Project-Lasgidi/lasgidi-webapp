import { Media } from '@/payload-types';

export const getPayloadImageUrl = (image: string | Media) => {
  return typeof image === 'string' ? image : image?.url;
};

export const getPayloadUploadFormData = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('_payload', JSON.stringify({ alt: file.name }));
  return formData;
};
