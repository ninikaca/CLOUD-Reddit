import { CommentData } from "../comment/CommentData";

export interface RetrivedPostsData {
  PostId: string;
  PostTitle: string;
  PostContent: string;
  PostAuthor: string;
  PostImageUrl: string;
  VotesCount: number;
  CommentsCount: number;
  Comments: CommentData[];
  UsersUpvoted: string[];
  UsersDownvoted: string[];
  UsersSubscribed: string[];
}

export const emptyRetrivedPostsData: RetrivedPostsData = {
  PostId: "",
  PostTitle: "",
  PostContent: "",
  PostAuthor: "",
  PostImageUrl: "",
  VotesCount: 0,
  CommentsCount: 0,
  Comments: [],
  UsersUpvoted: [],
  UsersDownvoted: [],
  UsersSubscribed: [],
};
