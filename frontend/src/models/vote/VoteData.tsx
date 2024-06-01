export interface VoteData {
  UserId: string;
  PostId: string;
  IsUpvoted: boolean;
}

export const DefaultVoteData: VoteData = {
  UserId: "",
  PostId: "",
  IsUpvoted: false,
};
