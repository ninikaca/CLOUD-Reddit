import axios, { AxiosResponse } from "axios";
import { API_URL } from "../../main";
import { VoteData } from "../../models/vote/VoteData";

const VotePostService = async (
  token: string,
  data: VoteData
): Promise<boolean> => {
  try {
    if (!token || token === "") return false;

    const response: AxiosResponse<boolean> = await axios.post(
      API_URL + `votes/vote`,
      data,
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

export default VotePostService;
