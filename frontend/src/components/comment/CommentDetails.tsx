import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { CommentDetailsProps } from "../../models/props/CommentDetailsProps";

const CommentDetails: React.FC<CommentDetailsProps> = ({
  data,
  userId,
  handleDeleteComment,
}) => {
  const [isCurrentUserComment, setIsCurrentUserComment] = useState(false);

  // Check if the current user matches the comment owner
  useEffect(() => {
    setIsCurrentUserComment(userId === data.UserId);
  }, [userId, data.UserId]);

  const handleDelete = () => {
    // Call delete comment function only if the current user is the owner of the comment
    if (isCurrentUserComment) {
      handleDeleteComment(data.RowKey);
    } else {
      toast.error("You are not authorized to delete this comment.");
    }
  };

  return (
    <div className="flex justify-center items-center dark:bg-gray-900">
      <div className="w-full">
        <div
          id="back-div"
          className="bg-gradient-to-r from-primary-500 to-primary-500 rounded-3xl m-2"
        >
          <div className="border-[20px] border-transparent rounded-[20px] dark:bg-gray-900/80 bg-white shadow-xl p-2">
            <div>
              <p className="text-lg max-w-4xl text-wrap break-words dark:text-gray-400">
                {data.Content}
              </p>
              {isCurrentUserComment && ( // Render delete button only if it's the current user's comment
                <button
                  className="bg-gradient-to-r px-6 mt-5 -mb-5 dark:text-gray-300 from-primary-500 to-primary-700 shadow-lg p-2 text-white rounded-lg hover:scale-105 hover:from-primary-500 hover:to-primary-500 transition duration-300 ease-in-out"
                  type="button"
                  onClick={handleDelete}
                >
                  Delete Comment
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentDetails;
