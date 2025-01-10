export interface IFollow {
  _id?: string;
  follower?: string;
  following: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICreateFollow {
  following: string;
}
