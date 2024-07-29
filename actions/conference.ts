'use server';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import configPromise from '@payload-config';
import { ISubmitConferenceRequest } from '@/lib/submitSchema';
import { Where } from 'payload';
import { IQueryParams } from '@/types';
import { Conference } from '@/payload-types';

export const fetchConferences = async ({
  limit = 2,
  page = 1,
  searchParams = {},
}: IQueryParams) => {
  const payload = await getPayloadHMR({ config: configPromise });
  const { q, languages, regions, tools } = searchParams;

  const query: Where = {
    _status: {
      equals: 'published',
    },
  };

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
  const {
    region,
    tool,
    language,
    logo,
    start_date,
    end_date,
    pictures,
    ...rest
  } = conference;
  await payload.create({
    collection: 'conferences',
    data: {
      ...rest,
      region: region ? (region as Conference['region']) : null,
      tool: tool ? (tool as Conference['tool']) : null,
      language: language ? (language as Conference['language']) : null,
      logo: logo as string,
      start_date: start_date.toISOString(),
      end_date: end_date.toISOString(),
      pictures: pictures.map((id) => ({
        picture: id as string,
      })),
    },
  });
};
