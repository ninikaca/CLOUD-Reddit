import { PostQueryData } from "../post/PostQueryData";

export interface SearchFilterProps {
  filter: PostQueryData;
  setFilter: React.Dispatch<React.SetStateAction<PostQueryData>>;
}
