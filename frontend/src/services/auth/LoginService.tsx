import axios, { AxiosResponse } from "axios";
import LoginData from "../../models/form/LoginData";
import { API_URL } from "../../main";

const LoginService = async (data: LoginData): Promise<string | null> => {
  try {
    const response: AxiosResponse<string> = await axios.post(
      API_URL + "auth/login",
      data
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

export default LoginService;
