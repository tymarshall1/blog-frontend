export type Community = {
  communityIcon: File | string;
  name: string;
  description: string;
  tags: string | string[];
  posts?: string[];
  followers?: string[];
  owner?: string;
  created?: string;
  formattedDateCreated?: string;
};
