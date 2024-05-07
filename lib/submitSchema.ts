import {
  number,
  object,
  string,
  TypeOf,
  instanceof as instanceof_,
  union,
  array,
  date,
} from 'zod';

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB

const getFileSchema = (name: string) =>
  union([
    number().positive(`${name} is required`).min(1, `${name} is required`),
    instanceof_(File).refine(
      (file) => file === undefined || file.size <= MAX_UPLOAD_SIZE,
      `${name} size must be less than 3MB`
    ),
  ]);

export const submitCommunitySchema = object({
  submitter_name: string().min(1, 'Full name is required'),
  submitter_email: string()
    .min(1, { message: 'Email is required.' })
    .email('This is not a valid email.'),
  community_email: string()
    .min(1, { message: 'Community email is required.' })
    .email('This is not a valid email.'),
  name: string().min(1, 'Name is required'),
  description: string().min(1, 'Description is required'),
  website: string().min(1, 'Visit URL is required'),
  region: string().min(1, 'Location is required'),
  platforms: string(),
  tool: string(),
  language: string(),
  logo: getFileSchema('Logo'),
});

export const submitConferenceSchema = object({
  submitter_name: string().min(1, 'Full name is required'),
  submitter_email: string()
    .min(1, { message: 'Email is required.' })
    .email('This is not a valid email.'),
  name: string().min(1, 'Name is required'),
  description: string().min(1, 'Description is required'),
  website: string().min(1, 'Website is required'),
  region: string().min(1, 'Region is required'),
  location: string().min(1, 'Location is required'),
  start_date: date({
    required_error: 'Start date is required',
    invalid_type_error: 'Invalid date!',
  }),
  end_date: date({
    required_error: 'End date is required',
    invalid_type_error: 'Invalid date!',
  }),
  platforms: string().array(),
  pictures: array(getFileSchema('Picture')).min(
    1,
    'At least one picture is required'
  ),
  tool: string(),
  language: string(),
  logo: getFileSchema('Logo'),
});

export type ISubmitCommunityRequest = TypeOf<typeof submitCommunitySchema>;
export type ISubmitConferenceRequest = TypeOf<typeof submitConferenceSchema>;
