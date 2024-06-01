export interface PostData {
  Title: string;
  UserId: string;
  Content: string;
  Image: string;
}

export const PostDataDefault: PostData = {
  Title: "",
  UserId: "",
  Content: "",
  Image: "",
};
