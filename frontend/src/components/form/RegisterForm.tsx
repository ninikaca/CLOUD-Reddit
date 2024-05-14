import toast from "react-hot-toast";
import RegisterFormProps from "../../models/props/RegisterFormProps";
import ImageCompressor from "image-compressor.js";
import { useState } from "react";

const RegisterForm: React.FC<RegisterFormProps> = ({
  data,
  setData,
  handleRegister,
}) => {
  const [obrada, setObrada] = useState<boolean>(false);

  // Frontend data validator
  const checkDataAndRegister = async () => {
    if (data.name.trim().length < 1) {
      toast.error("Name must have a minimum length of 1 character!");
      return;
    }

    if (data.surname.trim().length < 1) {
      toast.error("Surame must have a minimum length of 1 character!");
      return;
    }

    if (data.address.trim().length < 1) {
      toast.error("Address must have a minimum length of 1 character!");
      return;
    }

    if (data.city.trim().length < 1) {
      toast.error("City must have a minimum length of 1 character!");
      return;
    }

    if (data.country.trim().length < 1) {
      toast.error("Country must have a minimum length of 1 character!");
      return;
    }

    if (data.phone.trim().length < 1) {
      toast.error("Phone must have a minimum length of 1 character!");
      return;
    }

    if (
      data.email.trim().length < 1 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
    ) {
      toast.error("Email must be entered and be in the valid format!");
      return;
    }

    if (data.password.trim().length < 6) {
      toast.error("Password must have a minimum length of 6 characters!");
      return;
    }

    if (data.image.trim().length < 1) {
      toast.error("Image must be choosen!");
      return;
    }

    // If data is valid, then run login service
    handleRegister();
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
            image:
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
          className="bg-gradient-to-r from-primary-600 to-primary-600 rounded-3xl m-4"
        >
          <div className="border-[20px] border-transparent rounded-[20px] dark:bg-gray-900 bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2">
            <h1 className="pt-8 pb-6 font-bold dark:text-gray-200 text-5xl text-center cursor-default">
              Register
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
                    value={data.name}
                    onChange={(e) =>
                      setData({ ...data, name: e.currentTarget.value })
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
                    value={data.surname}
                    onChange={(e) =>
                      setData({ ...data, surname: e.currentTarget.value })
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
                    value={data.address}
                    onChange={(e) =>
                      setData({ ...data, address: e.currentTarget.value })
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
                    value={data.city}
                    onChange={(e) =>
                      setData({ ...data, city: e.currentTarget.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="flex gap-x-4">
                <div className="w-1/2">
                  <label
                    htmlFor="Phone"
                    className="mb-2  dark:text-gray-400 text-lg"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    className="border p-3 dark:bg-gray-700 dark:text-gray-300  dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                    type="text"
                    placeholder="Phone"
                    value={data.phone}
                    onChange={(e) =>
                      setData({ ...data, phone: e.currentTarget.value })
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
                    value={data.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.currentTarget.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="flex gap-x-4">
                <div className="w-1/2">
                  <label
                    htmlFor="Country"
                    className="mb-2 dark:text-gray-400 text-lg"
                  >
                    Country
                  </label>
                  <input
                    id="Country"
                    className="border p-3 mb-4 shadow-md dark:bg-gray-700 dark:text-gray-300  dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                    type="text"
                    placeholder="Country"
                    value={data.country}
                    onChange={(e) =>
                      setData({ ...data, country: e.currentTarget.value })
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
                    value={data.password}
                    onChange={(e) =>
                      setData({ ...data, password: e.currentTarget.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="w-full">
                <label
                  htmlFor="password"
                  className="mb-2 dark:text-gray-400 text-lg"
                >
                  Profile image
                </label>
                <input
                  name="image"
                  type="file"
                  required
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
                onClick={checkDataAndRegister}
              >
                Register
              </button>
            </form>
            <div className="flex flex-col mt-4 items-center justify-center text-sm">
              <h3 className="dark:text-gray-300">
                Already have an account?{" "}
                <a
                  className="group text-primary-400 transition-all duration-100 ease-in-out"
                  href="/login"
                >
                  <span className="bg-left-bottom bg-gradient-to-r from-primary-400 to-primary-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                    Login now
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

export default RegisterForm;
