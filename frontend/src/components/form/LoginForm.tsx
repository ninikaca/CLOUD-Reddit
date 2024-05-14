import toast from "react-hot-toast";
import LoginFormProps from "../../models/props/LoginFormProps";

const LoginForm: React.FC<LoginFormProps> = ({
  data,
  setData,
  handleLogin,
}) => {
  // Frontend data validator
  const checkDataAndLogin = async () => {
    if (
      data.email.trim().length < 1 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
    ) {
      toast.error("Email must be entered and be in the valid format!");
      return;
    }

    if (data.password.trim().length < 6) {
      toast.error("Password must have a minimum length of 6 characters!");
      return;
    }

    // If data is valid, then run login service
    handleLogin();
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center dark:bg-gray-900">
      <div className="grid gap-8">
        <div
          id="back-div"
          className="bg-gradient-to-r from-primary-600 to-primary-600 rounded-3xl m-4"
        >
          <div className="border-[35px] border-transparent rounded-[20px] dark:bg-gray-900 bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2">
            <h1 className="pt-8 pb-6 font-bold dark:text-gray-200 text-5xl text-center cursor-default">
              Log in
            </h1>
            <form action="#" method="post" className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2  dark:text-gray-400 text-lg"
                >
                  Email
                </label>
                <input
                  id="email"
                  className="border p-3 dark:bg-gray-700 dark:text-gray-300  dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                  type="email"
                  placeholder="Email"
                  value={data.email}
                  onChange={(e) =>
                    setData({ ...data, email: e.currentTarget.value })
                  }
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 dark:text-gray-400 text-lg"
                >
                  Password
                </label>
                <input
                  id="password"
                  className="border p-3 mb-4 shadow-md dark:bg-gray-700 dark:text-gray-300  dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                  type="password"
                  placeholder="Password"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.currentTarget.value })
                  }
                  required
                />
              </div>
              <button
                type="button"
                className="bg-gradient-to-r dark:text-gray-300 from-primary-700 to-primary-800 shadow-lg p-2 text-white rounded-lg w-full hover:scale-105 hover:from-primary-700 hover:to-primary-600 transition duration-300 ease-in-out"
                onClick={checkDataAndLogin}
              >
                LOG IN
              </button>
            </form>
            <div className="flex flex-col mt-4 items-center justify-center text-sm">
              <h3 className="dark:text-gray-300">
                Don't have an account?{" "}
                <a
                  className="group text-primary-400 transition-all duration-100 ease-in-out"
                  href="/register"
                >
                  <span className="bg-left-bottom bg-gradient-to-r from-primary-400 to-primary-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                    Register now
                  </span>
                </a>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
