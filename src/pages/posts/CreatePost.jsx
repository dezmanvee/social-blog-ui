import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createPostAPI } from "../../API/posts/postAPIs";
import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import LoadingAlert from "../../components/alerts/LoadingAlert";
import DangerAlert from "../../components/alerts/DangerAlert";
import SuccessAlert from "../../components/alerts/SuccessAlert";
import { allCatgegoryAPI } from "../../API/categories/categoryAPIs";
import {
  Camera01Icon,
  Cancel01Icon,
  CheckmarkCircle01Icon,
} from "hugeicons-react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

const CreatePost = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [imageError, setImageError] = useState(""); //local state for image errors
  const [imagePreview, setImagePreview] = useState(null); //local state for image preview

  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const postMutation = useMutation({
    mutationKey: ["create-post"],
    mutationFn: createPostAPI,
  });

  const fetchedCategories = useQuery({
    queryKey: ["all-categories"],
    queryFn: allCatgegoryAPI,
  });

  // get all states from useMutation hook
  const { data, isPending, isError, error, isSuccess } = postMutation;

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
      description: "",
      image: "",
      category: "",
    },
    //*validation
    validationSchema: Yup.object({
      description: Yup.string().required("Description is required"),
      image: Yup.string().required("Image is required"),
      category: Yup.string().required("Category is required"),
    }),
    //*submit
    onSubmit: (values, { setFieldValue }) => {
      const formData = new FormData();
      formData.append("description", values.description);
      formData.append("image", values.image);
      formData.append("category", values.category);
      postMutation
        .mutateAsync(formData)
        .then(() => {
          //Clear input fields
          setFieldValue("description", "");
          setFieldValue("image", "");
          setFieldValue("category", "");
          navigate("/dashboard/all-posts"); //rdirect to all-posts
        })
        .catch((e) => console.log(e));
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
    // <section className="py-16 px-8 m-auto">
    //   <Card className="max-w-md w-full mx-auto">
    //     <CardHeader>
    //       <CardTitle>Add New Post</CardTitle>
    //       <CardDescription>Description</CardDescription>
    //     </CardHeader>
    //     <CardContent>
    //       <form onSubmit={formik.handleSubmit}>
    //         <div className="grid w-full items-center gap-4">
    //           <div className="flex flex-col space-y-1.5">
    //             {/* Status display */}

    //             {isPending && (
    //               <LoadingAlert loading="Loading" loadingMsg="Please wait..." />
    //             )}
    //             {isError && (
    //               <DangerAlert
    //                 error="Error"
    //                 errorMsg={error?.response?.data?.message || error?.message}
    //               />
    //             )}
    //             {isSuccess && (
    //               <SuccessAlert success="Success" successMsg={data?.message} />
    //             )}
    //             <Label htmlFor="name" className="font-semibold text-sm">
    //               Description
    //             </Label>
    //             <ReactQuill
    //               className="h-40"
    //               value={formik.values.description}
    //               onChange={(value) => {
    //                 setDescription(value);
    //                 formik.setFieldValue("description", value);
    //               }}
    //             />
    //             {formik.touched.description && formik.errors.description && (
    //               <div
    //                 style={{
    //                   display: "flex",
    //                   marginBlock: "10px",
    //                   color: "red",
    //                   fontSize: "12px",
    //                 }}
    //               >
    //                 {formik.errors.description}
    //               </div>
    //             )}
    //           </div>
    //           {/* Image upload */}
    //           <div className="flex flex-col items-center justify-center bg-gray-50 p-4 shadow rounded-lg mt-10">
    //             <label
    //               htmlFor="images"
    //               className="block text-sm font-medium text-gray-700 mb-2"
    //             >
    //               Upload Image
    //             </label>
    //             <div className="flex justify-center items-center w-full">
    //               <input
    //                 id="images"
    //                 type="file"
    //                 name="image"
    //                 accept="image/*"
    //                 onChange={handleFileChange}
    //                 className="hidden"
    //               />
    //               <label
    //                 htmlFor="images"
    //                 className="cursor-pointer text-white px-4 py-1.5 rounded shadow bg-black flex items-center"
    //               >
    //                 <LuUpload className="mr-2" />
    //                 Choose a file
    //               </label>
    //             </div>
    //             {/* Display error message */}
    //             {formik.touched.image && formik.errors.image && (
    //               <div className="bg-red-100 w-full rounded-md py-2 px-4 mx-auto mt-4">
    //                 <small className="text-tiny text-red-600 text-center">
    //                   {formik.errors.image}
    //                 </small>
    //               </div>
    //             )}

    //             {/* error message */}
    //             {imageError && (
    //               <div className="bg-red-100 w-full rounded-md py-2 px-4 mx-auto mt-4">
    //                 <small className="text-tiny text-red-600 text-center">
    //                   {imageError}
    //                 </small>
    //               </div>
    //             )}
    //             {/* Preview image */}
    //             {imagePreview && (
    //               <div className="mt-2 relative">
    //                 <img
    //                   src={imagePreview}
    //                   alt="Preview"
    //                   className="mt-2 h-24 w-24 object-cover rounded-full"
    //                 />
    //                 <button
    //                   onClick={removeImageHandler}
    //                   className="absolute right-0 top-0 transform translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1"
    //                 >
    //                   <FaTimesCircle className="text-red-500" />
    //                 </button>
    //               </div>
    //             )}
    //           </div>
    //         </div>

    //         <div className="flex flex-col space-y-1.5 mt-2">
    //           <Label htmlFor="framework" className="font-semibold text-sm">
    //             Category
    //           </Label>
    //           <Select
    //             name="category"
    //             options={fetchedCategories?.data?.allCategories.map(
    //               (category) => ({
    //                 value: category._id,
    //                 label: category.categoryName,
    //               })
    //             )}
    //             value={fetchedCategories?.data?.allCategories.find(
    //               (option) => option.value === formik.values.category
    //             )}

    //             onChange={(option) =>
    //               (formik.setFieldValue("category", option.value))
    //             }

    //           />
    //         </div>
    //         <Button className="mt-6 w-full" type="submit">
    //           Add Post
    //         </Button>
    //       </form>
    //     </CardContent>
    //   </Card>
    // </section>

    <article className="!p-0 mx-auto !pb-12 lg:min-h-page h-full !max-w-[100vw] lg:!max-w-[42.5rem] lg:border-r lg:border-l border-gray-600 px-4 md:px-8 relative z-1 flex w-full flex-col">
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
            errorMsg={error?.response?.data?.message || error?.message}
          />
        </div>
      )}
      {showSuccess && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-[200]">
          <SuccessAlert success="Success" successMsg={data?.message} />
        </div>
      )}
      <div className="flex flex-col">
        <header className="flex flex-row px-1 border-b border-gray-600 bg-color md:bg-[unset]">
          <ul className="relative flex flex-row">
            <button className="relative p-2 py-4 text-center font-bold text-base ">
              <span className="inline rounded-xl px-3 py-1.5 bg-theme-active text-white">
                New post
              </span>
            </button>
            <div
              className="absolute bottom-0 mx-auto h-0.5 w-12 -translate-x-1/2 rounded-4 bg-white transition-[left] ease-linear"
              style={{ left: "53.4896px" }}
            />
          </ul>
        </header>

        <div className="px-5">
          <form className="mt-6 flex flex-col" onSubmit={formik.handleSubmit}>
            {/* Container for thumbnail and message */}
            <div className="flex flex-col max-lg:flex-col-reverse lg:flex-row mt-5 items-end gap-4 justify-start lg:justify-between">
              {/* Thumbnail */}
              <div className="relative w-full md:w-min">
                <div className="group relative flex items-center justify-center overflow-hidden border border-border-subtlest-primary w-24 h-24 rounded-3xl !w-full border-none bg-background-subtle hover:bg-gray-800 text-slate-400 md:!w-[20.25rem] lg:!w-[11.5rem]">
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
                    className={`items-center w-ful cursor-pointer ${
                      imagePreview ? "hidden" : "flex"
                    }`}
                  >
                    {/* <Camera01Icon className="w-5 h-5 pointer-events-none" /> */}
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
                    <span className="ml-1.5 flex flex-row font-bold text-base">
                      Thumbnail
                    </span>
                  </label>
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-full w-full object-cover hover:opacity-65 z-1"
                    />
                  )}
                </div>
                {imagePreview && (
                  <Button
                    variant="outline"
                    className="h-8 w-8 p-0 rounded-lg absolute -right-2 -top-2 !shadow-2 z-40"
                    onClick={removeImageHandler}
                  >
                    <Cancel01Icon className="w-5 h-5 pointer-events-none" />
                  </Button>
                )}
              </div>
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

            {/* category */}
            <Select
              value={formik.values.category} // Bind the formik value to the Select
              onValueChange={(value) => formik.setFieldValue("category", value)} // Handle value change
            >
              <SelectTrigger className="w-full mt-10 text-slate-400 h-12 rounded-xl bg-background-subtle hover:bg-gray-800 text-md font-bold border-l-4 border-transparent hover:border-white hover:text-white">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent className="bg-background-subtle text-slate-400 border-gray-600 rounded-lg">
                <SelectGroup>
                  <SelectLabel className="font-bold text-slate-200">
                    Categories
                  </SelectLabel>
                  {fetchedCategories?.data?.allCategories.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.categoryName}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {/* Error status for category */}
            {formik.touched.category && formik.errors.category && (
              <div className="flex mt-3 text-red-500 text-xs ml-4">
                {formik.errors.category}
              </div>
            )}

            {/* Description/Content */}
            <div className="relative flex flex-col rounded-2xl bg-surface-float mt-10 hover:bg-gray-800">
              <span className="flex flex-row items-center gap-1 px-2 font-bold text-slate-400 absolute right-3 top-3">
                <CheckmarkCircle01Icon className="w-5 h-5 pointer-events-none" />
                Saved
              </span>
              <div className="flex flex-col min-h-[20.5rem]">
                <header className="flex flex-row px-1 border-b border-slate-400 bg-background-default md:bg-[unset]">
                  <ul className="relative flex flex-row">
                    <button className="relative p-2 py-4 text-center font-bold">
                      <span className="inline rounded-xl px-3 py-1.5 bg-theme-active text-white">
                        Write
                      </span>
                    </button>
                    <button className="relative p-2 py-4 text-center font-bold">
                      <span className="inline rounded-xl px-3 py-1.5 bg-theme-active text-slate-400">
                        Preview
                      </span>
                    </button>
                    <div
                      className="absolute bottom-0 mx-auto h-0.5 w-12 -translate-x-1/2 rounded bg-white transition-[left] ease-linear !w-6"
                      style={{ left: "39.6302px" }}
                    />
                  </ul>
                </header>
                <span className="relative flex flex-1">
                  <textarea
                    name="description"
                    rows="11"
                    placeholder="Share your thoughts"
                    className="flex max-h-[292px] flex-1 border-none bg-transparent placeholder:text-slate-400 outline-none text-white m-4"
                    style={{ height: "246px" }}
                    value={formik.values.description}
                    onChange={(e) => {
                      const value = e.target.value;
                      setDescription(value);
                      formik.setFieldValue("description", value);
                    }}
                  ></textarea>
                </span>
                {/* Error message for Post's description */}
                {formik.touched.description && formik.errors.description && (
                  <div className="flex mt-3 text-red-500 text-xs ml-4">
                    {formik.errors.description}
                  </div>
                )}
              </div>
              <span className="flex flex-row items-center gap-3 border-slate-400 p-3 px-4 text-slate-400 lg:justify-end lg:border-t"></span>
            </div>
            <span className="relative flex flex-col items-center md:flex-row mt-5 max-md:mb-8">
              <Button
                type="submit"
                className="ml-auto rounded-xl text-lg border-none font-bold w-full md:mt-0 md:w-32 flex text-white bg-purple-600 hover:bg-purple-700"
              >
                Post
              </Button>
            </span>
          </form>
        </div>
      </div>
    </article>
  );
};
export default CreatePost;
