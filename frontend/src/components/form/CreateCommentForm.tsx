import toast from "react-hot-toast";
import React, { useEffect } from "react";
import { CreateCommentFormProps } from "../../models/props/CreateCommentFormProps";

const CreateCommentForm: React.FC<CreateCommentFormProps> = ({
  data,
  setData,
  handleCreateComment,
  userId,
  postId,
}) => {
  // Frontend data validator
  const checkDataAndCreateComment = async () => {
    if (data.Content.trim().length < 1) {
      toast.error("Content must have a minimum length of 1 character!");
      return;
    }

    // Set the UserId and PostId
    setData({ ...data, UserId: userId, PostId: postId });

    // If data is valid, then run create comment service
    handleCreateComment();
  };

  useEffect(() => {
    // Set the UserId and PostId
    setData({ ...data, UserId: userId, PostId: postId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, postId, setData]);

  return (
    <div className="flex justify-center items-center dark:bg-gray-900">
      <div className="grid gap-8 w-full">
        <div
          id="back-div"
          className="bg-gradient-to-r from-primary-500 to-primary-500 rounded-3xl m-4"
        >
          <div className="border-[20px] border-transparent rounded-[20px] dark:bg-gray-900/80 bg-white shadow-xl p-8">
            <h1 className="pb-6 font-bold dark:text-gray-200 text-4xl text-center cursor-default">
              Create Comment
            </h1>
            <form action="#" method="post" className="space-y-4">
              <div className="w-full">
                <label
                  htmlFor="content"
                  className="mb-2 dark:text-gray-400 text-lg"
                >
                  Content
                </label>
                <textarea
                  id="content"
                  className="border p-3 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                  placeholder="Content"
                  value={data.Content}
                  onChange={(e) =>
                    setData({ ...data, Content: e.currentTarget.value })
                  }
                  required
                />
              </div>

              <div className="flex mx-auto justify-end items-end gap-8">
                <button
                  className="bg-gradient-to-r dark:text-gray-300 from-emerald-600 to-emerald-800 shadow-lg p-2 text-white rounded-lg w-full hover:scale-105 hover:from-emerald-600 hover:to-emerald-800 transition duration-300 ease-in-out"
                  type="button"
                  onClick={checkDataAndCreateComment}
                >
                  Create Comment
                </button>
                <button
                  className="bg-gradient-to-r dark:text-gray-300 from-primary-500 to-primary-700 shadow-lg p-2 text-white rounded-lg w-full hover:scale-105 hover:from-primary-500 hover:to-primary-500 transition duration-300 ease-in-out"
                  type="reset"
                  onClick={() => setData({ ...data, Content: "" })}
                >
                  Clear Comment Content
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCommentForm;
