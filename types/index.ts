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
  description: string;
  visit_url: string;
  platforms: string[];
  is_approved: boolean;
};

export type IPagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export interface IConference {
  id: number;
  title: string;
  description: string;
  date: string;
  organization: string;
  logo: string;
  website: string;
  location: string;
  pictures: string[];
}
