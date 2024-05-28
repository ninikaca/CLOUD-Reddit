import { useEffect, useState } from "react";
import { PostData, PostDataDefault } from "../models/post/PostData";
import { useAuth } from "../providers/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CreatePostService from "../services/posts/CreatePostService";
import CreatePostForm from "../components/form/CreatePostForm";
import { jwtDecode } from "jwt-decode";
import { Sidebar } from "../components/layout/sidebar/Sidebar";

export const CreatePost: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [data, setData] = useState<PostData>(PostDataDefault);

  const handleCreatePost = async () => {
    const post_id: string | null = await CreatePostService(
      data,
      auth?.token ?? ""
    );

    if (post_id) {
      toast.success("Post has been created. Squashing 'em...");
      setTimeout(() => {
        navigate("/posts/" + post_id, { replace: true });
      }, 1500);
    } else {
      toast.error("Invalid post data provider!");
    }
  };

  useEffect(() => {
    // If user is not logged in, then redirect to main page
    if (!auth?.token) {
      navigate("/login", { replace: true });
    } else {
      try {
        const { Id } = jwtDecode<{ Id: string }>(auth?.token ?? "");
        data.UserId = Id;
      } catch {
        console.log();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.token, navigate]);

  return (
    <>
      <div className="flex min-h-screen dark:bg-gray-900">
        <Sidebar />
        <CreatePostForm
          handleCreatePost={handleCreatePost}
          data={data}
          setData={setData}
        />
      </div>
    </>
  );
};
