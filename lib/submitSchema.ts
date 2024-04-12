import {
  number,
  object,
  string,
  TypeOf,
  instanceof as instanceof_,
  union,
} from 'zod';

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ['image/png'];

export const submitCommunitySchema = object({
  submitter_name: string().min(1, 'Full name is required'),
  submitter_email: string()
    .min(1, { message: 'Email is required.' })
    .email('This is not a valid email.'),
  community_email: string()
    .min(1, { message: 'Community email is required.' })
    .email('This is not a valid email.'),
  title: string().min(1, 'Title is required'),
  description: string().min(1, 'Description is required'),
  visit_url: string().min(1, 'Visit URL is required'),
  region: string().min(1, 'Location is required'),
  platforms: string(),
  tool: string(),
  language: string(),
  logo: union([
    number().positive('Logo is required').min(1, 'Logo is required'),
    instanceof_(File)
      .refine(
        (file) => file === undefined || file!.size <= MAX_UPLOAD_SIZE,
        'Logo size must be less than 3MB'
      )
      .refine(
        (file) =>
          file === undefined || ACCEPTED_FILE_TYPES.includes(file!.type),
        'Logo must be a PNG'
      ),
  ]),
});

export const submitConferenceSchema = object({
  submitter_name: string().min(1, 'Full name is required'),
  submitter_email: string()
    .min(1, { message: 'Email is required.' })
    .email('This is not a valid email.'),
  conferenceEmail: string()
    .min(1, { message: 'Conference email is required.' })
    .email('This is not a valid email.'),
  title: string().min(1, 'Title is required'),
  description: string().min(1, 'Description is required'),
  visit_url: string().min(1, 'Visit URL is required'),
  region: string().min(1, 'Region is required'),
  location: string().min(1, 'Location is required'),
  startDate: string().min(1, 'Start date is required'),
  endDate: string().min(1, 'End date is required'),
  platforms: string().array(),
  pictures: number().array(),
  tool: string(),
  language: string(),
  logo: union([
    number().positive('Logo is required').min(1, 'Logo is required'),
    instanceof_(File)
      .refine(
        (file) => file === undefined || file!.size <= MAX_UPLOAD_SIZE,
        'Logo size must be less than 3MB'
      )
      .refine(
        (file) =>
          file === undefined || ACCEPTED_FILE_TYPES.includes(file!.type),
        'Logo must be a PNG'
      ),
  ]),
});

export type ISubmitCommunityRequest = TypeOf<typeof submitCommunitySchema>;
export type ISubmitConferenceRequest = TypeOf<typeof submitConferenceSchema>;
