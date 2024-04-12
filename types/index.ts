import { ReactNode } from 'react';

export type PropsWithChildren<P = unknown> = P & { children: ReactNode };

export type PropsWithOptionalChildren<P = unknown> = P & {
  children?: ReactNode;
};

export interface ISearchParams {
  q?: string;
  tools?: string;
  languages?: string;
  regions?: string;
}

export type IQueryParams = {
  page?: number;
  pageSize?: number;
  searchParams?: ISearchParams;
};

export type ICommunity = {
  id: string;
  title: string;
  logo: IImageUrl;
  description: string;
  visit_url: string;
  platforms: string[];
};

export type IPagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
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
