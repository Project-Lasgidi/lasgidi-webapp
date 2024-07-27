import { ReactNode } from 'react';

export type PropsWithChildren<P = unknown> = P & { children: ReactNode };

export type PropsWithOptionalChildren<P = unknown> = P & {
  children?: ReactNode;
};

export interface ISearchParams {
  q?: string;
  tab?: BrowseTabEnum;
  tools?: string;
  languages?: string;
  regions?: string;
}

export type IQueryParams = {
  limit?: number;
  page?: number;
  searchParams?: ISearchParams;
};

export type ICommunity = {
  id: string;
  name: string;
  logo: IImageUrl;
  description: string;
  website: string;
  platforms: string[];
};

export type IPagination = {
  nextPage?: number;
  hasNextPage: boolean;
};

export interface IConference {
  id: number;
  submitter_name: string;
  submitter_email: string;
  name: string;
  description: string;
  website: string;
  region: string;
  location: string;
  start_date: string;
  end_date: string;
  platforms?: string[];
  pictures: IImageUrl[];
  tool?: string;
  language?: string;
  logo: IImageUrl;
}

export interface IImageUrl {
  url: string;
  width: number;
  height: number;
}

export enum BrowseTabEnum {
  COMMUNITY = 'community',
  CONFERENCE = 'conference',
}
