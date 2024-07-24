import { CommunityPagePostProps } from "@/components/ui/postFilter";
export type Community = {
  communityIcon: File | string;
  communityBG: File | string;
  name: string;
  description: string;
  tags: string | string[];
  posts?: CommunityPagePostProps[];
  followers?: string[] | number;
  owner?: string;
  created?: string;
  formattedDateCreated?: string;
  followsCommunity?: boolean;
};
