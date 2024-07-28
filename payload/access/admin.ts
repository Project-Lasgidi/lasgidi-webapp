import { User } from '@/payload-types';
import type { AccessArgs } from 'payload';

type TIsAdmin = (args: AccessArgs<User>) => boolean;

export const isAdmin: TIsAdmin = ({ req: { user } }) => {
  return user?.role === 'admin';
};
