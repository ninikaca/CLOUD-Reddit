import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useAuth } from "../../../providers/useAuth";
import { RetrivedPostsData } from "../../../models/post/RetrivedPostsData";
import { useNavigate } from "react-router-dom";
import SubscribeToPostService from "../../../services/subscription/SubscribeToPostService";
import toast from "react-hot-toast";

const PostPreviewTile: React.FC<{
  data: RetrivedPostsData;
}> = ({ data }) => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string>("");
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const auth = useAuth();

  useEffect(() => {
    try {
      const { Id } = jwtDecode<{ Id: string }>(auth?.token ?? "");
      setUserId(Id);
      setIsSubscribed(data.UsersSubscribed.includes(Id));
    } catch {
      setUserId("");
    }
  }, [auth?.token, data.UsersSubscribed]);

  const handleSubscribe = async () => {
    if (isSubscribed) {
      toast.loading("You have already subscribed to this post!");
      return;
    }

    const success: boolean = await SubscribeToPostService(
      { userId: userId, postId: data.PostId },
      auth?.token ?? ""
    );

    if (success) {
      toast.success("You have subscribed to the post.");
      setIsSubscribed(true); // Update local subscription state
      data.UsersSubscribed = [...data.UsersSubscribed, userId]; // Update data's subscription list
    } else {
      toast.error("Failed to subscribe to the post!");
    }
  };

  const backgroundImage = data.PostImageUrl || "/placeholder.png";

  return (
    <div className="w-full flex border-[3.5px] rounded-2xl border-primary-600">
      <div
        className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-s-xl text-center overflow-hidden"
        style={{
          backgroundImage: `url("${backgroundImage}")`,
        }}
        title={data.PostTitle}
      ></div>
      <div className="bg-gray-100/50 dark:bg-gray-700 w-full rounded-b lg:rounded-b-none lg:rounded-r-xl p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
            <svg
              className="fill-current text-gray-500 dark:text-gray-300 w-4 h-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M20.0005 7L14.1543 12.9375C14.0493 13.0441 13.9962 13.0976 13.9492 13.1396C13.1899 13.8193 12.0416 13.8193 11.2822 13.1396C11.2352 13.0976 11.1817 13.0442 11.0767 12.9375C10.9716 12.8308 10.9191 12.7774 10.8721 12.7354C10.1127 12.0557 8.96397 12.0557 8.20461 12.7354C8.15771 12.7773 8.10532 12.8305 8.00078 12.9367L4 17M20.0005 7L20 13M20.0005 7H14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {data.VotesCount} karma
          </p>
          <div className="text-gray-900 dark:text-white font-bold text-xl mb-2">
            {data.PostTitle.substring(0, 36)}
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-base break-words line-clamp-2">
            {data.PostContent.substring(0, 36)}
          </p>
        </div>
        <div className="flex items-center mb-4">
          <div className="text-sm">
            <p className="text-gray-900 dark:text-white leading-none">
              Posted comments
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              {data.CommentsCount} comments
            </p>
          </div>
        </div>
        <div className="flex space-x-4">
          {userId && (
            <>
              {isSubscribed ? (
                <button
                  className="bg-gradient-to-r dark:text-gray-300 from-teal-700 opacity-75 cursor-default to-teal-800 shadow-lg p-2 text-white rounded-lg w-full"
                  type="button"
                >
                  Subscribed
                </button>
              ) : (
                <button
                  className="bg-gradient-to-r dark:text-gray-300 from-teal-700 to-teal-800 shadow-lg p-2 text-white rounded-lg w-full hover:scale-105 hover:from-teal-700 hover:to-teal-700 transition duration-300 ease-in-out"
                  type="button"
                  onClick={handleSubscribe}
                >
                  ⭐ Subscribe
                </button>
              )}
            </>
          )}
          <button
            className="bg-gradient-to-r dark:text-gray-300 from-primary-700 to-primary-800 shadow-lg p-2 text-white rounded-lg w-full hover:scale-105 hover:from-primary-700 hover:to-primary-600 transition duration-300 ease-in-out"
            type="button"
            onClick={() => navigate(`/posts/${data.PostId}`)}
          >
            🡪 Go to Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostPreviewTile;
