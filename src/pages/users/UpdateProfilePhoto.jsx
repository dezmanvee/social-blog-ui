import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { uploadPhotoAPI } from "../../API/users/userAPIs";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Label } from "@radix-ui/react-label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { LuUpload } from "react-icons/lu";
import { FaTimesCircle } from "react-icons/fa";
import LoadingAlert from "../../components/alerts/LoadingAlert";
import DangerAlert from "../../components/alerts/DangerAlert";
import SuccessAlert from "../../components/alerts/SuccessAlert";

const UpdateProfilePhoto = () => {
  const [imageError, setImageError] = useState(""); //local state for image errors
  const [imagePreview, setImagePreview] = useState(null); //local state for image preview

  const uploadMutation = useMutation({
    mutationKey: ["upload-photo"],
    mutationFn: uploadPhotoAPI,
  });

  // get all states from useMutation hook
  const { data, isPending, isError, error, isSuccess } = uploadMutation;
  const formik = useFormik({
    //*initial values
    initialValues: {
      image: "",
    },
    //*validation
    // validationSchema: Yup.object({
    //   image: Yup.string().required("Image is required"),
    // }),
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
      return;
    }

    if (!["image/png", "image/jpg", "image/jpeg"].includes(file.type)) {
      // Supported file type
      setImageError(
        "This file type is not supported. Only png, jpg, or jpeg is allowed."
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
    <section className="py-16 px-8 m-auto">
      <Card className="max-w-md w-full mx-auto">
        <CardHeader>
          <CardTitle>Upload Profile Photo</CardTitle>
          <CardDescription>
            Upload a picture to make your profile stand out and let people
            recognize your comments and contributions easily!
          </CardDescription>
          {isPending && (
            <LoadingAlert loading="Uploading" loadingMsg="Please wait..." />
          )}
          {isError && (
            <DangerAlert
              error="Error"
              errorMsg={error?.response?.data?.message || error?.message}
            />
          )}
          {isSuccess && (
            <SuccessAlert success="Success" successMsg={data?.message} />
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid w-full items-center gap-4">
              {/* Image upload */}
              <div className="flex flex-col items-center justify-center bg-gray-50 p-4 shadow rounded-lg">
                <label
                  htmlFor="images"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Upload photo
                </label>
                <div className="flex justify-center items-center w-full">
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
                    className="cursor-pointer text-white px-4 py-1.5 rounded shadow bg-black flex items-center"
                  >
                    <LuUpload className="mr-2" />
                    select a file
                  </label>
                </div>
                {/* Display error message */}
                {formik.touched.image && formik.errors.image && (
                  <div className="bg-red-100 w-full rounded-md py-2 px-4 mx-auto mt-4">
                    <small className="text-tiny text-red-600 text-center">
                      {formik.errors.image}
                    </small>
                  </div>
                )}

                {/* error message */}
                {imageError && (
                  <div className="bg-red-100 w-full rounded-md py-2 px-4 mx-auto mt-4">
                    <small className="text-tiny text-red-600 text-center">
                      {imageError}
                    </small>
                  </div>
                )}
                {/* Preview image */}
                {imagePreview && (
                  <div className="mt-2 relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mt-2 h-24 w-24 object-cover rounded-full"
                    />
                    <button
                      onClick={removeImageHandler}
                      className="absolute right-0 top-0 transform translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1"
                    >
                      <FaTimesCircle className="text-red-500" />
                    </button>
                  </div>
                )}
              </div>
            </div>
            <CardFooter className="flex justify-between mt-6">
              <Button onClick={removeImageHandler} variant="outline">
                Cancel
              </Button>
              <Button type="submit">Upload</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};
export default UpdateProfilePhoto;
