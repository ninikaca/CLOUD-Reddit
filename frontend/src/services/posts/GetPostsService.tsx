import axios, { AxiosResponse } from "axios";
import { PostQueryData } from "../../models/post/PostQueryData";
import { RetrivedPostsData } from "../../models/post/RetrivedPostsData";
import { API_URL } from "../../main";

const GetPostsService = async (
  data: PostQueryData
): Promise<RetrivedPostsData[]> => {
  try {
    const response: AxiosResponse<RetrivedPostsData[]> = await axios.post(
      API_URL + `posts/all`,
      data
    );
    if (response.status === 200) {
      return response.data;
    } else {
      return [];
    }
  } catch {
    return [];
  }
};

export default GetPostsService;
