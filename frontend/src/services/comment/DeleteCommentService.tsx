import axios, { AxiosResponse } from "axios";
import { API_URL } from "../../main";

const DeleteCommentService = async (
  commentId: string,
  token: string
): Promise<boolean> => {
  try {
    if (commentId === "" || token === "") return false;

    const response: AxiosResponse = await axios.delete(
      API_URL + `comment/delete/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch {
    return false;
  }
};

export default DeleteCommentService;
