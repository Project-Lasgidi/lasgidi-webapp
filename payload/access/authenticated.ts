import { User } from '@/payload-types';
import type { AccessArgs } from 'payload';

type TAuthenticated = (args: AccessArgs<User>) => boolean;

export const authenticated: TAuthenticated = ({ req: { user } }) => {
  if (user) {
    return true;
  }
  return false;
};
