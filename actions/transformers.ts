import { ICommunity } from '@/types';

export const transformCommunity = (item: any): ICommunity => {
  const community = item.attributes;
  return {
    id: item.id,
    title: community.title,
    description: community.description,
    visit_url: community.visit_url,
    is_approved: community.is_approved,
    platforms: community.platforms,
  };
};
