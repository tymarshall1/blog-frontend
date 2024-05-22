import { CommunityPagePostProps } from "@/components/ui/postFilter";
export type Community = {
  communityIcon: File | string;
  name: string;
  description: string;
  tags: string | string[];
  posts?: CommunityPagePostProps[];
  followers?: string[];
  owner?: string;
  created?: string;
  formattedDateCreated?: string;
};
