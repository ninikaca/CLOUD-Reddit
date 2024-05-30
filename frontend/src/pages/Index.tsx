import { useEffect, useState } from "react";
import PostPreviewTile from "../components/post/post_homepage_preview_tile/PostPreviewTile";
import GetPostsService from "../services/posts/GetPostsService";
import {
  PostQueryData,
  defaultPostQueryData,
} from "../models/post/PostQueryData";
import { EmptyInfoPost } from "../components/layout/EmptyPostInfo";
import { Sidebar } from "../components/layout/sidebar/Sidebar";
import { SearchFilter } from "../components/search_filter/SearchFilter";
import { RetrivedPostsData } from "../models/post/RetrivedPostsData";

export const Index: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<RetrivedPostsData[]>([]);
  const [query, setQuery] = useState<PostQueryData>(defaultPostQueryData);

  const fetchData = async () => {
    setLoading(true);

    const response: RetrivedPostsData[] = await GetPostsService(query);
    setPosts(response);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const handleNextPage = () => {
    if (posts.length === query.PageSize) {
      setQuery({ ...query, Page: query.Page + 1 });
    }
  };

  const handlePreviousPage = () => {
    if (query.Page > 1) {
      setQuery({ ...query, Page: query.Page - 1 });
    }
  };

  return (
    <>
      <div className="flex min-h-screen dark:bg-gray-900">
        <Sidebar />

        <div className="flex-grow py-12 flex flex-col items-center ml-64">
          <div className="w-full max-w-3xl px-4">
            <SearchFilter filter={query} setFilter={setQuery} />
          </div>
          <div className="flex justify-between w-full max-w-3xl px-4 mt-6">
            <button
              onClick={handlePreviousPage}
              disabled={query.Page === 1}
              className="bg-gradient-to-r dark:text-gray-300 from-primary-700 to-primary-800 shadow-lg p-2 text-white rounded-lg px-8 hover:scale-105 hover:from-primary-700 hover:to-primary-600 transition duration-300 ease-in-out disabled:opacity-50"
            >
              {"🡐"} Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={posts.length < query.PageSize}
              className="bg-gradient-to-r dark:text-gray-300 from-primary-700 to-primary-800 shadow-lg p-2 text-white rounded-lg px-8 hover:scale-105 hover:from-primary-700 hover:to-primary-600 transition duration-300 ease-in-out disabled:opacity-50"
            >
              Next {"🡒"}
            </button>
          </div>
          <div className="grid gap-8 mt-8 w-full max-w-3xl px-4">
            {!posts || (posts.length === 0 && <EmptyInfoPost />)}
            {!loading &&
              posts.map((post: RetrivedPostsData, index: number) => (
                <PostPreviewTile key={index} data={post} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
