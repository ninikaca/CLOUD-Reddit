import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useAuth } from "../../providers/useAuth";
import { SearchFilterProps } from "../../models/props/SearchFilterProps";

export const SearchFilter: React.FC<SearchFilterProps> = ({
  filter,
  setFilter,
}) => {
  const auth = useAuth();
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

    setLoading(false);
  }, [auth?.token]);

  return (
    <>
      {!loading && (
        <div>
          <div className="flex flex-col">
            <div className="border-[3.5px] rounded-2xl border-primary-600 bg-white dark:bg-gray-800 p-6 shadow-lg">
              <form className="">
                <div className="relative mb-10 w-full flex  items-center justify-between rounded-md">
                  <svg
                    className="absolute left-2 block h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx={11} cy={11} r={8} className="" />
                    <line x1={21} y1={21} x2="16.65" y2="16.65" className="" />
                  </svg>
                  <input
                    type="name"
                    name="search"
                    onChange={(e) =>
                        setFilter({ ...filter, Page: 1, SearchQuery: e.currentTarget.value })
                      }
                    className="h-12 w-full cursor-text border-2 rounded-xl border-primary-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-100 py-4 pr-40 pl-12 shadow-sm outline-none"
                    placeholder="Search by topic title..."
                  />
                </div>
                <div className="grid gap-6 grid-cols-2">
                  <div className="flex flex-col">
                    <label
                      htmlFor="sorting"
                      className="text-sm font-medium text-gray-600 dark:text-gray-200"
                    >
                      Created by
                    </label>
                    <select
                      id="sorting"
                      onChange={(e) =>
                        setFilter({ ...filter, Page: 1, UserId: e.currentTarget.value })
                      }
                      className="mt-2 block w-full rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                    >
                      <option value="">All posts</option>
                      {id && <option value={id}>By me</option>}
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="sorting"
                      className="text-sm font-medium text-gray-600 dark:text-gray-200"
                    >
                      Sorting
                    </label>
                    <select
                      onChange={(e) =>
                        setFilter({ ...filter, Page: 1, Sort: e.currentTarget.value })
                      }
                      id="sorting"
                      className="mt-2 block w-full rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                    >
                      <option value="">Time added</option>
                      <option value="asc">Ascending</option>
                      <option value="desc">Desceding</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
