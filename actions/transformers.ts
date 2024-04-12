import { ICommunity, IConference } from '@/types';

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
    platforms: community.platforms,
  };
};

export const transformConference = (item: any): IConference => {
  const conference = item.attributes;
  const logoItem = item.attributes.logo.data.attributes;
  const picturesItem = item.attributes.pictures.data.map((pic: any) => ({
    url: pic.attributes.url,
    width: pic.attributes.width,
    height: pic.attributes.height,
  }));
  return {
    id: item.id,
    submitter_name: conference.submitter_name,
    submitter_email: conference.submitter_email,
    name: conference.name,
    description: conference.description,
    website: conference.website,
    region: conference.region,
    location: conference.location,
    start_date: conference.start_date,
    end_date: conference.end_date,
    platforms: conference.platforms,
    pictures: picturesItem,
    tool: conference.tool,
    language: conference.language,
    logo: {
      url: logoItem.url,
      width: logoItem.width,
      height: logoItem.height,
    },
  };
};
