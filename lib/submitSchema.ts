import { number, object, string, TypeOf } from 'zod';

export const submitCommunitySchema = object({
  fullName: string().min(1, 'Full name is required'),
  email: string()
    .min(1, { message: 'Email is required.' })
    .email('This is not a valid email.'),
  communityEmail: string()
    .min(1, { message: 'Community email is required.' })
    .email('This is not a valid email.'),
  title: string().min(1, 'Title is required'),
  description: string().min(1, 'Description is required'),
  visit_url: string().min(1, 'Visit URL is required'),
  region: string().min(1, 'Location is required'),
  platforms: string(),
  tool: string(),
  language: string(),
  logo: number(),
});

export const submitConferenceSchema = object({
  fullName: string().min(1, 'Full name is required'),
  email: string()
    .min(1, { message: 'Email is required.' })
    .email('This is not a valid email.'),
  conferenceEmail: string()
    .min(1, { message: 'Conference email is required.' })
    .email('This is not a valid email.'),
  title: string().min(1, 'Title is required'),
  description: string().min(1, 'Description is required'),
  visit_url: string().min(1, 'Visit URL is required'),
  region: string().min(1, 'Region is required'),
  platforms: string().array(),
  pictures: number().array(),
  tool: string(),
  language: string(),
  logo: number(),
});

export type ISubmitCommunityRequest = TypeOf<typeof submitCommunitySchema>;
export type ISubmitConferenceRequest = TypeOf<typeof submitConferenceSchema>;
