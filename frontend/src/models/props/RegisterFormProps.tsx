import RegisterData from "../form/RegisterData";

interface RegisterFormProps {
    data: RegisterData;
    setData: React.Dispatch<React.SetStateAction<RegisterData>>;
    handleRegister: () => void;
}

export default RegisterFormProps;