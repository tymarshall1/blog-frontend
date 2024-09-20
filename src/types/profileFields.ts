export type ProfileFields = {
  firstName: string;
  lastName: string;
  biography: string;
  profileImg: File | string;
  account?: { username: string };
};
