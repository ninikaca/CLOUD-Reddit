import axios, { AxiosResponse } from "axios";
import { API_URL } from "../../main";

const DeletePostService = async (
  token: string,
  postId: string
): Promise<boolean> => {
  try {
    if (postId === "" || token === "") return false;

    const response: AxiosResponse<boolean> = await axios.delete(
      API_URL + `posts/delete/${postId}`,
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

export default DeletePostService;
