import { useEffect, useState } from "react";
import LoginForm from "../components/form/LoginForm";
import LoginData from "../models/form/LoginData";
import LoginService from "../services/auth/LoginService";
import { useAuth } from "../providers/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/layout/sidebar/Sidebar";

export const LoginPage: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState<LoginData>({ email: "", password: "" });

  const handleLogin = async () => {
    const token: string | null = await LoginService(data);

    if (token) {
      auth?.login(token);
      toast.success("You have been logged in!");
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1500);
    } else {
      toast.error("Invalid login data!");
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
      <LoginForm data={data} setData={setData} handleLogin={handleLogin} />
      </div>
    </>
  );
};
