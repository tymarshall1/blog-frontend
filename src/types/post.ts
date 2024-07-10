import { Community } from "./community";
import { Comment } from "./comment";
export type UserPost = {
  author: { id: string; profileImg: string; account: { username: string } };
  body: string;
  comments: Comment[] | number;
  created: string;
  title: string;
  _id: string;
  likes: number;
  dislikes: number;
  community: Community;
  reactionScore: number;
};
