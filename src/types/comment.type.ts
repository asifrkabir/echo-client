import { IUser } from "./user.type";

export interface IComment {
  _id?: string;
  post?: string;
  user?: string | IUser;
  content?: string;
  createdAt?: string;
  updatedAt?: string;
}
