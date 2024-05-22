import { ProfileFields } from "./profileFields";
import { UserPost } from "./post";
export type Comment = {
  profile: ProfileFields;
  comment: string;
  post: UserPost;
  replies: Comment[];
  created: string;
};
