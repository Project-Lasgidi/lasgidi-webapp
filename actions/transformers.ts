import { ICommunity } from '@/types';

export const transformCommunity = (item: any): ICommunity => {
  const community = item.attributes;
  const logoItem = item.attributes.logo.data.attributes;
  return {
    id: item.id,
    title: community.title,
    logo: {
      url: logoItem.url,
      width: logoItem.width,
      height: logoItem.height,
    },
    description: community.description,
    visit_url: community.visit_url,
    is_approved: community.is_approved,
    platforms: community.platforms,
  };
};
