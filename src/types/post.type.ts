import { IUser } from "./user.type";

export interface IPost {
  _id: string;
  title: string;
  content: string;
  author: IUser;
  category: "tip" | "story";
  isPremium: boolean;
  upvotes: number;
  downvotes: number;
  tags?: string[];
  imageUrls?: string[];
  isPublished: boolean;
  isPurchased?: boolean;
  voteType?: "upvote" | "downvote" | "none";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
