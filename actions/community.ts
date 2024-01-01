import qs from 'qs';

import { axiosInstance } from './axiosIntance';
import { transformCommunity } from './transformers';
import { ICommunity, IPagination } from '@/types';

export const fetchCommunities = async ({
  text = '',
  page = 1,
  pageSize = 2,
} = {}): Promise<{ communities: ICommunity[]; pagination: IPagination }> => {
  const query: any = {
    filters: {},
    pagination: {
      page,
      pageSize,
    },
  };
  const fields = ['title', 'description'];

  if (text) {
    query['filters']['$or'] = fields.map((field) => {
      const searchField: any = {};
      searchField[field] = { $containsi: text };
      return searchField;
    });
  }
  const queryStr = qs.stringify(query, { encodeValuesOnly: true });
  return axiosInstance.get(`communities?${queryStr}`).then((res) => {
    const communities = res.data.data.map(transformCommunity);
    const pagination = res.data.meta.pagination;
    return { communities, pagination };
  });
};
