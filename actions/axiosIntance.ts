import axios, { RawAxiosRequestConfig } from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  async (config) => {
    config.baseURL = process.env.NEXT_PUBLIC_STRAPI_API_ENDPOINT;
    const strapiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    if (strapiToken) {
      (config as RawAxiosRequestConfig).headers = {
        Authorization: `Bearer ${strapiToken}`,
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosInstance };
