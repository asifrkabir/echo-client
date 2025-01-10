export interface IVote {
  user?: string;
  post: string;
  voteType: "upvote" | "downvote";
}
