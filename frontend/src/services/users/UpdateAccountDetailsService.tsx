import axios, { AxiosResponse } from "axios";
import { API_URL } from "../../main";
import { UserData } from "../../models/user/UserData";

const UpdateAccountDetailsService = async (
  token: string,
  data: UserData
): Promise<string | null> => {
  try {
    if (!token || token === "") return null;

    const response: AxiosResponse<string> = await axios.patch(
      API_URL + "users/update",
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

export default UpdateAccountDetailsService;
