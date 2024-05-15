import toast from "react-hot-toast";
import React, { useState } from "react";
import CreatePostFormProps from "../../models/props/CreatePostFormProps";
import ImageCompressor from "image-compressor.js";

const CreatePostForm: React.FC<CreatePostFormProps> = ({
  data,
  setData,
  handleCreatePost,
}) => {
  const [obrada, setObrada] = useState<boolean>(false);

  // Frontend data validator
  const checkDataAndCreatePost = async () => {
    if (data.Title.trim().length < 1) {
      toast.error("Title must have a minimum length of 1 character!");
      return;
    }

    if (data.Content.trim().length < 1) {
      toast.error("Content must have a minimum length of 1 character!");
      return;
    }

    if (data.UserId.trim().length < 1) {
      toast.error("User ID must have a minimum length of 1 character!");
      return;
    }

    // If data is valid, then run create post service
    handleCreatePost();
  };

  const handleCompressImage = async (file: File | null) => {
    setObrada(true);

    if (file && file.type.startsWith("image/")) {
      // Check if file is an image
      const reader = new FileReader();

      reader.onload = async () => {
        try {
          const compressedFile = await new ImageCompressor().compress(file, {
            quality: 0.6, // Adjust the quality as needed (0.6 means 60% quality)
            maxWidth: 800, // Maximum width of the compressed image
            maxHeight: 600, // Maximum height of the compressed image
            convertSize: 5000000, // Maximum size of the compressed image (in bytes)
          });
          // Assuming setData is a function to update state
          setData({
            ...data,
            Image:
              compressedFile instanceof Blob
                ? await blobToBase64(compressedFile)
                : compressedFile,
          });
        } catch (error) {
          console.error("Image compression error:", error);
        }
      };

      reader.readAsDataURL(file);
    }
    setObrada(false);
  };

  // Helper function to convert Blob to Base64
  const blobToBase64 = (blob: Blob) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(blob);
    });
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center dark:bg-gray-900">
      <div className="grid gap-8">
        <div
          id="back-div"
          className="bg-gradient-to-r from-primary-500 to-primary-500 rounded-3xl m-4"
        >
          <div className="border-[20px] border-transparent rounded-[20px] dark:bg-gray-900 bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2">
            <h1 className="pt-8 pb-6 font-bold dark:text-gray-200 text-5xl text-center cursor-default">
              Create Post
            </h1>
            <form action="#" method="post" className="space-y-4">
              <div className="w-full">
                <label
                  htmlFor="title"
                  className="mb-2 dark:text-gray-400 text-lg"
                >
                  Title
                </label>
                <input
                  id="title"
                  className="border p-3 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                  type="text"
                  placeholder="Title"
                  value={data.Title}
                  onChange={(e) =>
                    setData({ ...data, Title: e.currentTarget.value })
                  }
                  required
                />
              </div>

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

              <div className="w-full">
                <label
                  htmlFor="image"
                  className="mb-2 dark:text-gray-400 text-lg"
                >
                  Post image (optional)
                </label>
                <input
                  id="image"
                  name="image"
                  type="file"
                  onChange={(e) => {
                    const file =
                      e.currentTarget.files && e.currentTarget.files[0];
                    handleCompressImage(file);
                  }}
                  className="w-full text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none mb-4 text-black dark:text-white"
                  placeholder="Profile Image"
                />
              </div>

              <button
                className="bg-gradient-to-r dark:text-gray-300 from-primary-500 to-primary-700 shadow-lg p-2 text-white rounded-lg w-full hover:scale-105 hover:from-primary-500 hover:to-primary-500 transition duration-300 ease-in-out"
                type="button"
                disabled={obrada}
                onClick={checkDataAndCreatePost}
              >
                Create Post
              </button>
            </form>
            <div className="flex flex-col mt-4 items-center justify-center text-sm">
              <h3 className="dark:text-gray-300">
                Want to go back?{" "}
                <a
                  className="group text-primary-400 transition-all duration-100 ease-in-out"
                  href="/"
                >
                  <span className="bg-left-bottom bg-gradient-to-r from-primary-400 to-primary-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                    Return to home
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

export default CreatePostForm;
