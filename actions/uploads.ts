'use server';

export const uploadImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('_payload', JSON.stringify({ alt: file.name }));

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/media?depth=0&fallback-locale=null`,
      {
        method: 'POST',
        body: formData,
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.errors?.[0]?.message || 'Upload failed');
    }
    const result = await response.json();
    return result.doc;
  } catch (error) {
    throw error;
  }
};
