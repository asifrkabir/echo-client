export interface IUser {
  _id?: string;
  userId?: string;
  name?: string;
  email: string;
  role: string;
  profilePicture?: string;
  bio?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
