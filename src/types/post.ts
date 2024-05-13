import { Community } from "./community";

export type UserPost = {
  author: { id: string; account: { username: string } };
  body: string;
  comments: string[];
  created: string;
  title: string;
  _id: string;
  likes: string[];
  dislikes: string[];
  community: Community;
};
