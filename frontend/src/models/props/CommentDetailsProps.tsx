import { CommentData } from "../comment/CommentData";

export interface CommentDetailsProps {
  data: CommentData;
  userId: string;
  handleDeleteComment: (RowKey: string) => void;
}
