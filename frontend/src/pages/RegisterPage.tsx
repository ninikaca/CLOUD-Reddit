import { useEffect, useState } from "react";
import { useAuth } from "../providers/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/form/RegisterForm";
import RegisterData from "../models/form/RegisterData";
import RegisterService from "../services/auth/RegisterService";
import { Sidebar } from "../components/layout/sidebar/Sidebar";

export const RegisterPage: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState<RegisterData>({
    name: "",
    surname: "",
    address: "",
    city: "",
    country: "",
    phone: "",
    email: "",
    password: "",
    image: "",
  });

  const handleRegister = async () => {
    const token: string | null = await RegisterService(data);

    if (token) {
      auth?.login(token);
      toast.success("You have been succesfully registered. Redirecting...");
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1500);
    } else {
      toast.error("Invalid data provided or email is already in use!");
    }
  };

  useEffect(() => {
    // If user is already logged in, then redirect to main page
    if (auth?.token) {
      navigate("/", { replace: true });
    }
  }, [auth?.token, navigate]);

  return (
    <>
      <div className="flex min-h-screen dark:bg-gray-900">
        <Sidebar />
        <RegisterForm
          data={data}
          setData={setData}
          handleRegister={handleRegister}
        />
      </div>
    </>
  );
};
