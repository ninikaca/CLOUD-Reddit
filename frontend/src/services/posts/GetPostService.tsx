import axios, { AxiosResponse } from "axios";
import { API_URL } from "../../main";
import { RetrivedPostsData } from "../../models/post/RetrivedPostsData";

const GetPostService = async (postId: string): Promise<RetrivedPostsData | null> => {
  try {
    if(postId === "")
        return null;

    const response: AxiosResponse<RetrivedPostsData> = await axios.get(
      API_URL + `posts/get/${postId}`
    );

    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

export default GetPostService;
