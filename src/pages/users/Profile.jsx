import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { uploadPhotoAPI } from "../../API/users/userAPIs";
import { Button } from "../../components/ui/button";
import LoadingAlert from "../../components/alerts/LoadingAlert";
import DangerAlert from "../../components/alerts/DangerAlert";
import SuccessAlert from "../../components/alerts/SuccessAlert";
import { Cancel01Icon } from "hugeicons-react";

const Profile = () => {
  const [imageError, setImageError] = useState(""); //local state for image errors
  const [imagePreview, setImagePreview] = useState(null); //local state for image preview

  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const uploadMutation = useMutation({
    mutationKey: ["upload-photo"],
    mutationFn: uploadPhotoAPI,
  });

  // get all states from useMutation hook
  const { data, isPending, isError, error, isSuccess } = uploadMutation;
  useEffect(() => {
    if (isError) {
      setShowError(true);

      // Set a timeout to hide the error after 5 seconds
      const timer = setTimeout(() => {
        setShowError(false);
      }, 10000);

      // Clean up the timer on unmount or when isError changes
      return () => clearTimeout(timer);
    }
  }, [isError]);

  // Handle success state
  useEffect(() => {
    if (isSuccess) {
      setShowSuccess(true);

      // Set a timeout to hide the success message after 5 seconds
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  const formik = useFormik({
    //*initial values
    initialValues: {
      image: "",
    },
    //*validation
    validationSchema: Yup.object({
      image: Yup.string().required("Image is required"),
    }),
    //*submit
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("image", values.image);
      uploadMutation.mutate(formData);
    },
  });

  //! File Upload Handler
  const handleFileChange = (e) => {
    const file = e.currentTarget.files[0];

    if (file.size > 1048576) {
      //Limits file size to 1MB
      setImageError(
        "Oops! The file size exceeds the 1MB limit. Please select a smaller file."
      );
      return;
    }

    if (
      !["image/webp", "image/png", "image/jpg", "image/jpeg"].includes(
        file.type
      )
    ) {
      // Supported file type
      setImageError(
        "Oops! The file type you've selected is not supported. Please upload a valid image in JPG, PNG, or WEBP format."
      );
    }

    //set image preview
    formik.setFieldValue("image", file);
    setImagePreview(URL.createObjectURL(file));
  };

  //Remove Image Handler
  const removeImageHandler = () => {
    formik.setFieldValue("image", null);
    setImagePreview(null);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      {isPending && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-[200]">
          <LoadingAlert
            loading="Loading"
            loadingMsg="Hang tight! We're getting things ready for you..."
          />
        </div>
      )}
      {showError && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-[200]">
          <DangerAlert
            error="Error"
            errorMsg={error?.message || error?.response?.data?.message}
          />
        </div>
      )}
      {showSuccess && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-[200]">
          <SuccessAlert success="Success" successMsg={data?.message} />
        </div>
      )}
      <h2 className="mt-0 font-bold text-white" id="profilePicture">
        Profile picture
      </h2>
      <p className="mt-1 text-slate-400">
        Upload a picture to make your profile stand out and help others easily
        recognize your comments and contributions!
      </p>
      {/* picture */}
      <div className="relative mt-6 flex">
        <div className="absolute left-0 top-0 flex w-full">
          <div className="w-full max-w-[19.25rem]">
            <div className="group relative flex items-center justify-center overflow-hidden border border-gray-600 w-full h-24 rounded-3xl border-0 bg-background-subtle hover:bg-gray-900">
              <input
                id="images"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="images"
                className="absolute text-white hover:block cursor-pointer"
              >
                <span className="text-theme-label-secondary ml-16 mr-3 flex flex-wrap items-center justify-center">
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-8 h-8 pointer-events-none"
                  >
                    <path
                      d="M12.833 4a4.83 4.83 0 013.781 1.823l.146.192.069.01a4.834 4.834 0 014.151 4.346l.015.223.005.218v4.046a4.833 4.833 0 01-4.171 4.788c-1.721.238-3.33.357-4.829.357-1.498 0-3.108-.12-4.829-.357a4.833 4.833 0 01-4.166-4.57L3 14.858v-4.046a4.833 4.833 0 013.956-4.753l.283-.044a4.835 4.835 0 013.454-1.992l.248-.018.226-.005h1.666zm0 1.5h-1.666a3.331 3.331 0 00-3.015 1.91c-.255.03-.514.064-.775.1a3.333 3.333 0 00-2.872 3.118l-.005.184v4.046a3.333 3.333 0 002.877 3.302 33.88 33.88 0 004.623.343 33.88 33.88 0 004.623-.343 3.333 3.333 0 002.872-3.118l.005-.184v-4.046a3.333 3.333 0 00-2.877-3.302c-.261-.036-.52-.07-.774-.099a3.335 3.335 0 00-2.807-1.905l-.209-.006zM12 9.5a3.333 3.333 0 110 6.667A3.333 3.333 0 0112 9.5zm0 1.5a1.833 1.833 0 100 3.667A1.833 1.833 0 0012 11zm5-1.333a.833.833 0 110 1.666.833.833 0 010-1.666z"
                      fill="currentcolor"
                      fill-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="ml-1.5 font-bold text-sm">
                    Upload cover image
                  </span>
                </span>
              </label>
            </div>
          </div>
        </div>
        {/* image container */}
        <div className="relative z-1 flex w-min">
          <label className="group cursor-pointer relative flex items-center justify-center overflow-hidden border-[#0E1217] w-24 h-24 rounded-3xl border-4 !border-background-default">
            <input
              id="profilePicture"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="File upload preview"
                className="h-full w-full object-cover group-hover:opacity-50"
                loading="lazy"
              />
            ) : (
              <img
                src="https://github.com/shadcn.png"
                alt="File upload preview"
                className="h-full w-full object-cover group-hover:opacity-50"
                loading="lazy"
              />
            )}
            <label
              htmlFor="images"
              className="text-white absolute hidden group-hover:block cursor-pointer"
            >
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                class="w-8 h-8 pointer-events-none"
              >
                <path
                  d="M12.833 4a4.83 4.83 0 013.781 1.823l.146.192.069.01a4.834 4.834 0 014.151 4.346l.015.223.005.218v4.046a4.833 4.833 0 01-4.171 4.788c-1.721.238-3.33.357-4.829.357-1.498 0-3.108-.12-4.829-.357a4.833 4.833 0 01-4.166-4.57L3 14.858v-4.046a4.833 4.833 0 013.956-4.753l.283-.044a4.835 4.835 0 013.454-1.992l.248-.018.226-.005h1.666zm0 1.5h-1.666a3.331 3.331 0 00-3.015 1.91c-.255.03-.514.064-.775.1a3.333 3.333 0 00-2.872 3.118l-.005.184v4.046a3.333 3.333 0 002.877 3.302 33.88 33.88 0 004.623.343 33.88 33.88 0 004.623-.343 3.333 3.333 0 002.872-3.118l.005-.184v-4.046a3.333 3.333 0 00-2.877-3.302c-.261-.036-.52-.07-.774-.099a3.335 3.335 0 00-2.807-1.905l-.209-.006zM12 9.5a3.333 3.333 0 110 6.667A3.333 3.333 0 0112 9.5zm0 1.5a1.833 1.833 0 100 3.667A1.833 1.833 0 0012 11zm5-1.333a.833.833 0 110 1.666.833.833 0 010-1.666z"
                  fill="currentcolor"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </label>
          </label>
          {/* Remove button */}
          {imagePreview && (
            <Button
              variant="outline"
              className="h-6 w-6 p-0 rounded-lg absolute -right-2 -top-2 !shadow-2 z-40"
              onClick={removeImageHandler}
            >
              <Cancel01Icon className="w-4 h-4 pointer-events-none" />
            </Button>
          )}
        </div>
        {/* Display error message */}
        {formik.touched.image && formik.errors.image && (
          <div className="flex mt-1 text-red-500 text-xs ml-4">
            {formik.errors.image}
          </div>
        )}

        {/* error message */}
        {imageError && (
          <div className="flex mt-1 text-red-500 text-xs ml-4">
            {imageError}
          </div>
        )}

        {/* Next Addition */}
      </div>
      <div className="h-[65%] w-full"></div>
      <Button
        type="submit"
        variant="outline"
        className="font-bold h-10 px-5 rounded-xl ml-auto hover:shadow-2xl"
      >
        Save changes
      </Button>
    </form>
  );
};
export default Profile;
