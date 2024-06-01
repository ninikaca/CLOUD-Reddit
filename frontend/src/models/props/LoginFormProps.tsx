import LoginData from "../form/LoginData";

interface LoginFormProps {
    data: LoginData;
    setData: React.Dispatch<React.SetStateAction<LoginData>>;
    handleLogin: () => void;
}

export default LoginFormProps;