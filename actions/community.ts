import qs from 'qs';

import { axiosInstance } from './axiosIntance';
import { transformCommunity } from './transformers';
import { ICommunity, IPagination, IQueryParams, BrowseTab } from '@/types';
import { getSearchParams } from '@/lib';
import { ISubmitCommunityRequest } from '@/lib/submitSchema';

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
    tab,
    tools = [],
    languages = [],
    regions = [],
  } = getSearchParams(searchParams);

  const query: any = {
    populate: '*',
    filters: {},
    pagination: {
      page,
      pageSize,
    },
  };
  const fields = ['name', 'description'];

  if (tab === BrowseTab.COMMUNITY) {
    if (q) {
      query['filters']['$or'] = fields.map((field) => ({
        [field]: { $containsi: q },
      }));
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

export const submitCommunity = async (community: ISubmitCommunityRequest) => {
  return axiosInstance.post('communities', {
    data: { ...community, publishedAt: null },
  });
};

export const uploadImages = async (formdata: FormData) => {
  return axiosInstance.post('upload', formdata, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
