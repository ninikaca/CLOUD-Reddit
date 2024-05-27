import { useEffect, useState } from "react";
import { Sidebar } from "../components/layout/sidebar/Sidebar";
import { useParams } from "react-router-dom";
import GetPostService from "../services/posts/GetPostService";
import {
  RetrivedPostsData,
  emptyRetrivedPostsData,
} from "../models/post/RetrivedPostsData";
import PostDetails from "../components/post/post_details/PostDetails";
import CreateCommentForm from "../components/form/CreateCommentForm";
import { CommentData, DefaultComment } from "../models/comment/CommentData";
import CreateCommentService from "../services/comment/CreateCommentService";
import { useAuth } from "../providers/useAuth";
import toast from "react-hot-toast";
import DeleteCommentService from "../services/comment/DeleteCommentService";
import CommentDetails from "../components/comment/CommentDetails";
import { jwtDecode } from "jwt-decode";

export const PostPage: React.FC = () => {
  const auth = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [post, setPost] = useState<RetrivedPostsData>(emptyRetrivedPostsData);
  const { id } = useParams<{ id: string }>();
  const [uid, setUid] = useState<string>("");
  const [comment, setComment] = useState<CommentData>(DefaultComment);

  const fetchData = async () => {
    setLoading(true);
    const response: RetrivedPostsData | null = await GetPostService(id ?? "");
    if (response) setPost(response);
    setLoading(false);
  };

  const addComment = async () => {
    const response: CommentData | null = await CreateCommentService(
      comment,
      auth?.token ?? ""
    );

    if (response) {
      toast.success("Comment has been added!");
      setPost({
        ...post,
        Comments: post.Comments.concat(comment),
        CommentsCount: post.CommentsCount + 1,
      });
      setComment({ ...comment, Content: "" });
    } else {
      toast.error("Comment couldn't be added right now.");
    }
  };

  const deleteComment = async (RowKey: string) => {
    const response: boolean = await DeleteCommentService(
      RowKey,
      auth?.token ?? ""
    );

    if (response) {
      toast.success("Comment has been deleted!");
      setPost({
        ...post,
        Comments: post.Comments.filter((x) => x.RowKey !== RowKey),
        CommentsCount: post.CommentsCount + 1,
      });
      setComment({ ...comment, Content: "" });
    } else {
      toast.error("Comment couldn't be deleted right now.");
    }
  };

  useEffect(() => {
    try {
      const { Id } = jwtDecode<{ Id: string }>(auth?.token ?? "");
      setUid(Id);
    } catch {
      console.log();
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.token]);

  return (
    <>
      <div className="flex min-h-screen dark:bg-gray-900">
        <Sidebar />

        <div className="flex-grow py-12 flex flex-col items-center ml-64">
          <div className="grid gap-8 mt-8 w-full max-w-5xl px-4">
            {!loading && (
              <>
                <PostDetails key={post.PostId} data={post} />

                {auth?.token && (
                  <CreateCommentForm
                    data={comment}
                    setData={setComment}
                    userId={uid}
                    postId={post.PostId}
                    handleCreateComment={addComment}
                  />
                )}

                {/* Render all comments */}
                {post.Comments.map((comment: CommentData, index: number) => (
                  <CommentDetails
                    key={index}
                    data={comment}
                    userId={uid}
                    handleDeleteComment={deleteComment}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
