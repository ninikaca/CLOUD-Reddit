export interface CommentData {
  PostId: string;
  UserId: string;
  Content: string;
  RowKey: string;
}

export const DefaultComment: CommentData = {
  PostId: "",
  UserId: "",
  Content: "",
  RowKey: ""
}
