import { Community } from "./community";
export type AccountData = {
  username?: string;
  accessToken: string;
  profile?: {
    account: string;
    biography: string;
    comments: [];
    firstName: string;
    lastName: string;
    posts: [];
    saved: [];
    id: string;
    profileImg: File;
    followedCommunities: Community[];
  };
  accountCreated?: string;
};
