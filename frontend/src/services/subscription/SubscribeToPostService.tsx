import axios, { AxiosResponse } from "axios";
import { API_URL } from "../../main";
import { SubscribeData } from "../../models/subscribe/SubscribeData";

const SubscribeToPostService = async (
  data: SubscribeData,
  token: string
): Promise<boolean> => {
  try {
    if (token === "") {
      return false;
    }

    const response: AxiosResponse<string> = await axios.post(
      API_URL + `subscriptions/subscribe`,
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

export default SubscribeToPostService;
