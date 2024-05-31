import { useEffect, useState } from "react";
import { useAuth } from "../providers/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/layout/sidebar/Sidebar";
import { UserData, defaultUser } from "../models/user/UserData";
import UpdateAccountDetailsService from "../services/users/UpdateAccountDetailsService";
import UpdateAccountForm from "../components/form/UpdateAccountForm";
import { jwtDecode } from "jwt-decode";
import ReadUserService from "../services/users/GetUserService";

export const AccountPage: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState<UserData>(defaultUser);
  const [id, setId] = useState<string>("");

  const handleAccountUpdate = async () => {
    const token: string | null = await UpdateAccountDetailsService(
      auth?.token ?? "",
      data
    );

    if (token) {
      auth?.login(token);
      toast.success("Account information has been updated!");
      setTimeout(() => {
        navigate("/account", { replace: true });
      }, 1500);
    } else {
      toast.error("Invalid data provided or email is already in use!");
    }
  };

  useEffect(() => {
    // If user is not logged in, then redirect to main page
    if (!auth?.token) {
      navigate("/", { replace: true });
    } else {
      try {
        const { Id } = jwtDecode<{ Id: string }>(auth?.token ?? "");
        setId(Id);
      } catch {
        console.log();
      }

      const fetchData = async () => {
        if (!id) return;

        const response: UserData | null = await ReadUserService(
          auth?.token ?? "",
          id
        );
        if (response) {
          setData(response);
        }
      };

      fetchData();
    }
  }, [auth?.token, id, navigate]);

  return (
    <>
      <div className="flex min-h-screen dark:bg-gray-900">
        <Sidebar />
        <UpdateAccountForm
          data={data}
          setData={setData}
          handleAccountUpdate={handleAccountUpdate}
        />
      </div>
    </>
  );
};
