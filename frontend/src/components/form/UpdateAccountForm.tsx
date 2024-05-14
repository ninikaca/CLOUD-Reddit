import toast from "react-hot-toast";
import UpdateAccountFormProps from "../../models/props/UpdateAccountFormProps";
import ImageCompressor from "image-compressor.js";
import { useState } from "react";

const UpdateAccountForm: React.FC<UpdateAccountFormProps> = ({
  data,
  setData,
  handleAccountUpdate,
}) => {
  const [obrada, setObrada] = useState<boolean>(false);

  const checkDataAndUpdate = async () => {
    // Frontend data validator
    if (data.Name.trim().length < 1) {
      toast.error("Name must have a minimum length of 1 character!");
      return;
    }

    if (data.Surname.trim().length < 1) {
      toast.error("Surname must have a minimum length of 1 character!");
      return;
    }

    if (data.Address.trim().length < 1) {
      toast.error("Address must have a minimum length of 1 character!");
      return;
    }

    if (data.City.trim().length < 1) {
      toast.error("City must have a minimum length of 1 character!");
      return;
    }

    if (data.Country.trim().length < 1) {
      toast.error("Country must have a minimum length of 1 character!");
      return;
    }

    if (data.Phone.trim().length < 1) {
      toast.error("Phone must have a minimum length of 1 character!");
      return;
    }

    if (
      data.Email.trim().length < 1 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.Email)
    ) {
      toast.error("Email must be entered and be in the valid format!");
      return;
    }

    if (data.Password.trim().length < 6) {
      toast.error("Password must have a minimum length of 6 characters!");
      return;
    }

    // If data is valid, then run update account service
    handleAccountUpdate();
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
          id="update-account-form"
          className="bg-gradient-to-r from-primary-600 to-primary-600 rounded-3xl m-4"
        >
          <div className="border-[20px] border-transparent rounded-[20px] dark:bg-gray-900 bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2">
            <h1 className="pt-8 pb-6 font-bold dark:text-gray-200 text-5xl text-center cursor-default">
              Update Account
            </h1>
            <form action="#" method="post" className="space-y-4">
              <div className="flex gap-x-4">
                <div className="w-1/2">
                  <label
                    htmlFor="name"
                    className="mb-2  dark:text-gray-400 text-lg"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    className="border p-3 dark:bg-gray-700 dark:text-gray-300  dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                    type="text"
                    placeholder="Name"
                    value={data.Name}
                    onChange={(e) =>
                      setData({ ...data, Name: e.currentTarget.value })
                    }
                    required
                  />
                </div>
                <div className="w-1/2">
                  <label
                    htmlFor="surname"
                    className="mb-2  dark:text-gray-400 text-lg"
                  >
                    Surname
                  </label>
                  <input
                    id="surname"
                    className="border p-3 dark:bg-gray-700 dark:text-gray-300  dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                    type="text"
                    placeholder="Surname"
                    value={data.Surname}
                    onChange={(e) =>
                      setData({ ...data, Surname: e.currentTarget.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="flex gap-x-4">
                <div className="w-1/2">
                  <label
                    htmlFor="address"
                    className="mb-2  dark:text-gray-400 text-lg"
                  >
                    Address
                  </label>
                  <input
                    id="address"
                    className="border p-3 dark:bg-gray-700 dark:text-gray-300  dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                    type="text"
                    placeholder="Address"
                    value={data.Address}
                    onChange={(e) =>
                      setData({ ...data, Address: e.currentTarget.value })
                    }
                    required
                  />
                </div>
                <div className="w-1/2">
                  <label
                    htmlFor="city"
                    className="mb-2  dark:text-gray-400 text-lg"
                  >
                    City
                  </label>
                  <input
                    id="city"
                    className="border p-3 dark:bg-gray-700 dark:text-gray-300  dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                    type="text"
                    placeholder="City"
                    value={data.City}
                    onChange={(e) =>
                      setData({ ...data, City: e.currentTarget.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="flex gap-x-4">
                <div className="w-1/2">
                  <label
                    htmlFor="phone"
                    className="mb-2  dark:text-gray-400 text-lg"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    className="border p-3 dark:bg-gray-700 dark:text-gray-300  dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                    type="text"
                    placeholder="Phone"
                    value={data.Phone}
                    onChange={(e) =>
                      setData({ ...data, Phone: e.currentTarget.value })
                    }
                    required
                  />
                </div>

                <div className="w-1/2">
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
                    value={data.Email}
                    onChange={(e) =>
                      setData({ ...data, Email: e.currentTarget.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="flex gap-x-4">
                <div className="w-1/2">
                  <label
                    htmlFor="country"
                    className="mb-2 dark:text-gray-400 text-lg"
                  >
                    Country
                  </label>
                  <input
                    id="country"
                    className="border p-3 mb-4 shadow-md dark:bg-gray-700 dark:text-gray-300  dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                    type="text"
                    placeholder="Country"
                    value={data.Country}
                    onChange={(e) =>
                      setData({ ...data, Country: e.currentTarget.value })
                    }
                    required
                  />
                </div>
                <div className="w-1/2">
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
                    value={data.Password}
                    onChange={(e) =>
                      setData({ ...data, Password: e.currentTarget.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="w-full">
                <label
                  htmlFor="image"
                  className="mb-2 dark:text-gray-400 text-lg"
                >
                  Profile image
                </label>
                <input
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
                className="bg-gradient-to-r dark:text-gray-300 from-primary-700 to-primary-800 shadow-lg p-2 text-white rounded-lg w-full hover:scale-105 hover:from-primary-700 hover:to-primary-600 transition duration-300 ease-in-out"
                type="button"
                disabled={obrada}
                onClick={checkDataAndUpdate}
              >
                Update Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateAccountForm;
