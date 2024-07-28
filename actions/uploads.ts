'use server';

export const uploadImage = async (formData: FormData) => {
  try {
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
