import { IPost } from "./post.type";
import { IUser } from "./user.type";

export interface IPaymentIntent {
  amount: number;
}

export interface IPayment {
  _id?: string;
  user?: string | IUser;
  post: string | IPost;
  amount: number;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}
