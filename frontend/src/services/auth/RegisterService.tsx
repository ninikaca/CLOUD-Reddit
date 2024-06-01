import axios, { AxiosResponse } from "axios";
import { API_URL } from "../../main";
import RegisterData from "../../models/form/RegisterData";

const RegisterService = async (data: RegisterData): Promise<string | null> => {
  try {
    const response: AxiosResponse<string> = await axios.post(
      API_URL + "auth/register",
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

export default RegisterService;
