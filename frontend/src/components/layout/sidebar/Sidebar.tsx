import { useEffect, useState } from "react";
import { useAuth } from "../../../providers/useAuth";
import { UserData, defaultUser } from "../../../models/user/UserData";
import ReadUserService from "../../../services/users/GetUserService";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [user, setUser] = useState<UserData>(defaultUser);
  const [loading, setLoading] = useState<boolean>(true);
  const [id, setId] = useState<string>("");

  useEffect(() => {
    setLoading(true);

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
        setUser(response);
      }
    };

    fetchData();

    setLoading(false);
  }, [auth?.token, id]);

  return (
    <>
      {!loading && (
        <aside className="flex flex-col fixed h-[900px] w-[250px] px-4 py-8 overflow-y-auto bg-white border-r dark:bg-primary-900 dark:border-primary-800 shadow-xl rounded-e-md">
          <a href="/" className="mx-auto">
            <img
              className="w-auto h-24 sm:h-16 filter brightness-0 invert"
              src="/logo.png"
              alt=""
            />
          </a>
          {id ? (
            <div className="flex flex-col items-center mt-6 -mx-2">
              <img
                className="object-cover w-24 h-24 mx-2 rounded-full"
                src={user.ImageUrl}
                alt="avatar"
              />
              <h4 className="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200">
                {user.Name + " " + user.Surname}
              </h4>
              <p className="mx-2 mt-1 text-sm font-medium text-gray-600 italic dark:text-gray-100">
                {user.Email}
              </p>
            </div>
          ) : (
            <>
              <h1 className="text-white px-2 text-center pt-4">
                Log in to view personalised data.
              </h1>
            </>
          )}
          <div className="flex flex-col justify-between flex-1 mt-12">
            <nav>
              <a
                className={
                  window.location.pathname === "/"
                    ? "flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-200"
                    : "flex items-center px-4 py-2 text-gray-400 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                }
                href="/"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="mx-4 font-medium">Homepage</span>
              </a>
              {auth?.token ? (
                <>
                  <a
                    className={
                      window.location.pathname === "/account"
                        ? "flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-200 my-2"
                        : "flex items-center px-4 py-2 text-gray-400 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 my-2"
                    }
                    href="/account"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="mx-4 font-medium">Account</span>
                  </a>
                  <a
                    className={
                      window.location.pathname === "/create"
                        ? "flex items-center px-4 py-2 my-2 text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-200"
                        : "flex items-center px-4 py-2 text-gray-400 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 my-2"
                    }
                    href="/create"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 5V7M15 11V13M15 17V19M5 5C3.89543 5 3 5.89543 3 7V10C4.10457 10 5 10.8954 5 12C5 13.1046 4.10457 14 3 14V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V14C19.8954 14 19 13.1046 19 12C19 10.8954 19.8954 10 21 10V7C21 5.89543 20.1046 5 19 5H5Z"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="mx-4 font-medium">Create post</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      auth?.logout();
                      navigate("/login", { replace: true });
                    }}
                    className={
                      window.location.pathname === "/signout"
                        ? "flex items-center px-4 py-2 my-2 text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-200"
                        : "flex items-center px-4 py-2 text-gray-400 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 w-full my-2"
                    }
                  >
                    <svg
                      className="w-5 h-5 text-gray-400 dark:text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <g id="Interface / Log_Out">
                          {" "}
                          <path
                            id="Vector"
                            d="M12 15L15 12M15 12L12 9M15 12H4M9 7.24859V7.2002C9 6.08009 9 5.51962 9.21799 5.0918C9.40973 4.71547 9.71547 4.40973 10.0918 4.21799C10.5196 4 11.0801 4 12.2002 4H16.8002C17.9203 4 18.4796 4 18.9074 4.21799C19.2837 4.40973 19.5905 4.71547 19.7822 5.0918C20 5.5192 20 6.07899 20 7.19691V16.8036C20 17.9215 20 18.4805 19.7822 18.9079C19.5905 19.2842 19.2837 19.5905 18.9074 19.7822C18.48 20 17.921 20 16.8031 20H12.1969C11.079 20 10.5192 20 10.0918 19.7822C9.71547 19.5905 9.40973 19.2839 9.21799 18.9076C9 18.4798 9 17.9201 9 16.8V16.75"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />{" "}
                        </g>{" "}
                      </g>
                    </svg>

                    <span className="mx-4 font-medium">Sign out</span>
                  </button>
                </>
              ) : (
                <>
                  <a
                    className={
                      window.location.pathname === "/login"
                        ? "flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-200"
                        : "flex items-center px-4 py-2 text-gray-400 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                    }
                    href="/login"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="mx-4 font-medium">Log in</span>
                  </a>
                  <a
                    className={
                      window.location.pathname === "/register"
                        ? "flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-200"
                        : "flex items-center px-4 py-2 text-gray-400 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                    }
                    href="/register"
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <g id="SVGRepo_iconCarrier">
                        <defs>
                          <style
                            dangerouslySetInnerHTML={{
                              __html:
                                ".cls-1{fill:none;stroke:#ffffff;stroke-miterlimit:10;stroke-width:1.91px;}",
                            }}
                          />
                        </defs>
                        <circle className="cls-1" cx={12} cy="7.25" r="5.73" />
                        <path
                          className="cls-1"
                          d="M1.5,23.48l.37-2.05A10.3,10.3,0,0,1,12,13h0a10.3,10.3,0,0,1,10.13,8.45l.37,2.05"
                        />
                      </g>
                    </svg>
                    <span className="mx-4 font-medium">Register</span>
                  </a>
                </>
              )}
            </nav>
          </div>
        </aside>
      )}
    </>
  );
};
