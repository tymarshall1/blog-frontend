import { Community } from "./community";
import { Comment } from "./comment";
export type UserPost = {
  author: { id: string; account: { username: string } };
  body: string;
  comments: Comment[];
  created: string;
  title: string;
  _id: string;
  likes: string[];
  dislikes: string[];
  community: Community;
};
