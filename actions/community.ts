import qs from 'qs';

import { axiosInstance } from './axiosIntance';
import { transformCommunity } from './transformers';
import { ICommunity, IPagination, IQueryParams, ISearchParams } from '@/types';
import { getSearchParams } from '@/lib';

export const fetchCommunities = async ({
  page = 1,
  pageSize = 2,
  searchParams = {},
}: IQueryParams): Promise<{
  communities: ICommunity[];
  pagination: IPagination;
}> => {
  const {
    q = '',
    tools = [],
    languages = [],
    regions = [],
  } = getSearchParams(searchParams);

  const query: any = {
    filters: {},
    pagination: {
      page,
      pageSize,
    },
  };
  const fields = ['title', 'description'];

  if (q) {
    query['filters']['$or'] = fields.map((field) => {
      const searchField: any = {};
      searchField[field] = { $containsi: q };
      return searchField;
    });
  }
  if (tools.length) {
    query['filters'] = { tool: { $in: tools } };
  }
  if (regions.length) {
    query['filters'] = { region: { $in: regions } };
  }
  if (languages.length) {
    query['filters'] = { language: { $in: languages } };
  }
  const queryStr = qs.stringify(query, { encodeValuesOnly: true });
  try {
    const res = await axiosInstance.get(`communities?${queryStr}`);
    const communities = res.data.data.map(transformCommunity);
    const pagination = res.data.meta.pagination;
    return { communities, pagination };
  } catch (error) {
    return {
      communities: [],
      pagination: { page, pageSize, pageCount: 1, total: 0 },
    };
  }
};
