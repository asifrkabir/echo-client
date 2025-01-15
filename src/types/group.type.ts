import { IUser } from "./user.type";

export interface IGroup {
  _id: string;
  name: string;
  description?: string;
  createdBy: IUser;
  members: Array<{
    userId: string;
    joinedAt: Date;
    role: "admin" | "member";
  }>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateGroup {
  name: string;
  description?: string;
}

export interface IUpdateGroup {
  id: string;
  payload: {
    name: string;
    description?: string;
  };
}

export interface IJoinGroup {
  id: string;
}

export interface ILeaveGroup {
  id: string;
}
