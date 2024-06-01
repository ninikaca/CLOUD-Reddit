import axios, { AxiosResponse } from "axios";
import { API_URL } from "../../main";
import { PostData } from "../../models/post/PostData";

const CreatePostService = async (
  data: PostData,
  token: string
): Promise<string | null> => {
  try {
    if (token === "") {
      return null;
    }

    const response: AxiosResponse<string> = await axios.post(
      API_URL + "posts/create",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
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

export default CreatePostService;
