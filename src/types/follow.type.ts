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

export interface IPeopleYouMayKnow {
  _id: string;
  name: string;
  profilePicture: string;
}
