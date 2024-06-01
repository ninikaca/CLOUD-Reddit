import axios, { AxiosResponse } from "axios";
import { UserData } from "../../models/user/UserData";
import { API_URL } from "../../main";

const ReadUserService = async (
  token: string,
  email: string
): Promise<UserData | null> => {
  try {
    if (token === "" || email === "") return null;

    const response: AxiosResponse<UserData> = await axios.get(
      API_URL + `users/get/${email}`,
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

export default ReadUserService;
