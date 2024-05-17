import { useNavigate } from "react-router-dom";

export const EmptyInfoPost: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="bg-white dark:bg-gray-900 ">
        <div className="container flex items-center px-6 py-12 mx-auto">
          <div className="flex flex-col items-center max-w-sm mx-auto text-center">
            <p className="p-3 text-sm font-medium text-teal-600 rounded-full bg-blue-50 dark:bg-gray-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
            </p>
            <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
              Such an empty space!
            </h1>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              There is no available posts to show up :(
              <br />
              Try to create a new one or refresh a page.
            </p>
            <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
              <button
                onClick={() => navigate("/", { replace: true })}
                type="button"
                className="flex items-center hover:scale-105 bg-gradient-to-r  justify-center w-1/2 px-5 py-2 text-sm text-gray-700  bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700 transition duration-300 ease-in-out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 32 32"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4 rtl:rotate-180"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path d="M15.977 0c-7.994 0-14.498 6.504-14.498 14.498 0 7.514 5.79 13.798 13.236 14.44l-2.87 1.455c-0.354 0.195-0.566 0.632-0.355 0.977l0.101 0.262c0.211 0.346 0.668 0.468 1.021 0.274l4.791-2.453c0.006-0.004 0.012-0.003 0.019-0.007l0.322-0.176c0.177-0.098 0.295-0.257 0.342-0.434 0.049-0.177 0.027-0.375-0.079-0.547l-0.191-0.313c-0.003-0.006-0.009-0.010-0.012-0.015l-2.959-4.624c-0.21-0.346-0.666-0.468-1.021-0.274l-0.232 0.162c-0.354 0.194-0.378 0.694-0.168 1.038l1.746 2.709c-0.009-0-0.018-0.004-0.027-0.005-6.54-0.429-11.662-5.907-11.662-12.47 0-6.891 5.607-12.498 12.498-12.498 6.892 0 12.53 5.606 12.53 12.498 0 3.968-1.823 7.613-5 9.999-0.442 0.332-0.53 0.959-0.199 1.401 0.332 0.442 0.959 0.531 1.401 0.199 3.686-2.768 5.799-6.996 5.799-11.598-0-7.994-6.536-14.498-14.53-14.498z" />{" "}
                  </g>
                </svg>
                <span>Refresh</span>
              </button>
              <button
                type="button"
                onClick={() => navigate("/create", { replace: true })}
                className="bg-gradient-to-r px-4 py-1.5 dark:text-gray-300 from-primary-700 to-primary-800 shadow-lg text-white rounded-lg w-full hover:scale-105 hover:from-primary-700 hover:to-primary-600 transition duration-300 ease-in-out"
              >
                Create Post
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
