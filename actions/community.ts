'use server';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import configPromise from '@payload-config';
import { ISubmitCommunityRequest } from '@/lib/submitSchema';
import { Community } from '@/payload-types';
import { IQueryParams } from '@/types';
import { Where } from 'payload';

export const fetchCommunities = async ({
  limit = 2,
  page = 1,
  searchParams = {},
}: IQueryParams) => {
  const payload = await getPayloadHMR({ config: configPromise });
  const { q, languages, regions, tools } = searchParams;

  const query: Where = {};

  const addQueryCondition = (field: string, value?: string) => {
    if (value) {
      query[field] = { contains: value };
    }
  };

  if (q) {
    query.or = [{ name: { contains: q } }, { description: { contains: q } }];
  }
  addQueryCondition('language', languages);
  addQueryCondition('region', regions);
  addQueryCondition('tool', tools);

  const {
    docs: communities,
    nextPage,
    hasNextPage,
  } = await payload.find({
    collection: 'communities',
    where: query,
    limit,
    depth: 1,
    page,
  });

  return {
    communities,
    pagination: {
      nextPage: nextPage ? nextPage : undefined,
      hasNextPage,
    },
  };
};

export const submitCommunity = async (community: ISubmitCommunityRequest) => {
  const payload = await getPayloadHMR({ config: configPromise });
  const { region, tool, language, logo, ...rest } = community;
  await payload.create({
    collection: 'communities',
    data: {
      ...rest,
      region: region ? (region as Community['region']) : null,
      tool: tool ? (tool as Community['tool']) : null,
      language: language ? (language as Community['language']) : null,
      logo: logo as string,
    },
  });
};
