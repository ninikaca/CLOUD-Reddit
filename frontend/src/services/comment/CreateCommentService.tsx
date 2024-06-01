import axios, { AxiosResponse } from "axios";
import { CommentData } from "../../models/comment/CommentData";
import { API_URL } from "../../main";

const CreateCommentService = async (
  data: CommentData,
  token: string
): Promise<CommentData | null> => {
  try {
    if (token === "") {
      return null;
    }

    const response: AxiosResponse<CommentData | null> = await axios.post(
      API_URL + "comment/create",
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

export default CreateCommentService;
