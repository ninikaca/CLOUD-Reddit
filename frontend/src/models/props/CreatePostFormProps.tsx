import { PostData } from "../post/PostData";

interface CreatePostFormProps {
  data: PostData;
  setData: React.Dispatch<React.SetStateAction<PostData>>;
  handleCreatePost: () => void;
}

export default CreatePostFormProps;
