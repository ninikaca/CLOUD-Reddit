import { UserData } from "../user/UserData";

interface UpdateAccountFormProps {
  data: UserData;
  setData: React.Dispatch<React.SetStateAction<UserData>>;
  handleAccountUpdate: () => void;
}

export default UpdateAccountFormProps;
