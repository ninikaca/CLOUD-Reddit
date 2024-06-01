import { CommentData } from "../comment/CommentData";

export interface CreateCommentFormProps {
  data: CommentData;
  setData: React.Dispatch<React.SetStateAction<CommentData>>
  handleCreateComment: () => void;
  userId: string;
  postId: string;
}
