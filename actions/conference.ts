'use server';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import configPromise from '@payload-config';
import { ISubmitConferenceRequest } from '@/lib/submitSchema';
import { Where } from 'payload';
import { BrowseTabEnum, IQueryParams } from '@/types';
import { Conference } from '@/payload-types';

export const fetchConferences = async ({
  limit = 2,
  page = 1,
  searchParams = {},
}: IQueryParams) => {
  const payload = await getPayloadHMR({ config: configPromise });
  const { q = '', languages, regions, tab, tools } = searchParams;

  const query: Where = {};

  const addQueryCondition = (field: string, value?: string) => {
    if (value) {
      query[field] = { contains: value };
    }
  };

  if (tab === BrowseTabEnum.CONFERENCE) {
    if (q) {
      query.or = [{ name: { contains: q } }, { description: { contains: q } }];
    }
    addQueryCondition('language', languages);
    addQueryCondition('region', regions);
    addQueryCondition('tool', tools);
  }

  const {
    docs: conferences,
    nextPage,
    hasNextPage,
  } = await payload.find({
    collection: 'conferences',
    where: query,
    limit,
    depth: 1,
    page,
  });

  return {
    conferences,
    pagination: {
      nextPage: nextPage ? nextPage : undefined,
      hasNextPage,
    },
  };
};

export const submitConference = async (
  conference: ISubmitConferenceRequest
) => {
  const payload = await getPayloadHMR({ config: configPromise });
  await payload.create({
    collection: 'conferences',
    data: {
      ...conference,
      region: conference.region as Conference['region'],
      tool: conference.tool as Conference['tool'],
      language: conference.language as Conference['language'],
      logo: conference.logo as string,
      start_date: conference.start_date.toISOString(),
      end_date: conference.end_date.toISOString(),
      pictures: conference.pictures.map((id) => ({
        picture: id as string,
      })),
    },
  });
};
