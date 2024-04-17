import qs from 'qs';

import { axiosInstance } from './axiosIntance';
import { transformConference } from './transformers';
import { IConference, IPagination, IQueryParams, BrowseTab } from '@/types';
import { getSearchParams } from '@/lib';
import { ISubmitConferenceRequest } from '@/lib/submitSchema';

export const fetchConferences = async ({
  page = 1,
  pageSize = 2,
  searchParams = {},
}: IQueryParams): Promise<{
  conferences: IConference[];
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

  if (tab === BrowseTab.CONFERENCE) {
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
    const res = await axiosInstance.get(`conferences?${queryStr}`);
    const conferences = res.data.data.map(transformConference);
    const pagination = res.data.meta.pagination;
    return { conferences, pagination };
  } catch (error) {
    return {
      conferences: [],
      pagination: { page, pageSize, pageCount: 1, total: 0 },
    };
  }
};

export const submitConference = async (
  conference: ISubmitConferenceRequest
) => {
  return axiosInstance.post('conferences', {
    data: { ...conference, publishedAt: null },
  });
};
