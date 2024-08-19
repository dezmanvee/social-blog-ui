import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { postAPI, updatePostAPI } from "../../API/posts/postAPIs";
import ReactQuill from "react-quill";
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
// import Select from "react-select";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { LuUpload } from "react-icons/lu";
import { FaTimesCircle } from "react-icons/fa";
import LoadingAlert from "../../components/alerts/LoadingAlert";
import DangerAlert from "../../components/alerts/DangerAlert";
import SuccessAlert from "../../components/alerts/SuccessAlert";
import { allCatgegoryAPI } from "../../API/categories/categoryAPIs";
import { useNavigate, useParams } from "react-router-dom";
import {
  Camera01Icon,
  Cancel01Icon,
  CheckmarkCircle01Icon,
  GroupItemsIcon,
} from "hugeicons-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

const UpdatePost = () => {
  //*Get post ID
  const { postId } = useParams();
  const navigate = useNavigate();

  //*Fetch the post details
  const { data: postDetails } = useQuery({
    queryKey: ["single-post"],
    queryFn: () => postAPI(postId),
  });

  const [description, setDescription] = useState("");
  const [imageError, setImageError] = useState(""); //local state for image errors
  const [imagePreview, setImagePreview] = useState(null); //local state for image preview

  const postMutation = useMutation({
    mutationKey: ["update-post"],
    mutationFn: updatePostAPI,
  });

  //*Form data
  const formik = useFormik({
    //*initial values
    initialValues: {
      description: postDetails?.post?.description || "",
      image: postDetails?.post?.image?.path || "",
      category: postDetails?.post?.category?._id || "",
    },
    enableReinitialize: true,
    //*validation
    validationSchema: Yup.object({
      description: Yup.string().required("Description is required*"),
      image: Yup.string().required("Image is required*"),
      category: Yup.string().required("Category is required*"),
    }),
    //*submit
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("description", values.description);
      formData.append("image", values.image);
      formData.append("category", values.category);
      postMutation.mutate({ formData, postId });
      // .then(() => {
      //   navigate("/dashboard/posts");
      // })
      // .catch((e) => console.log(e));
    },
  });

  //* Fetch Category data
  const fetchedCategories = useQuery({
    queryKey: ["all-categories"],
    queryFn: allCatgegoryAPI,
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

  // Custom style for react-select
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "bg-gray-800" : "bg-background-subtle",
      border: "none",
      boxShadow: state.isFocused ? "ring-2 ring-white" : "shadow-md",
      padding: "0.5rem", // Tailwind p-2
      borderRadius: "0.375rem", // Tailwind rounded-md
      width: "100%",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "text-white",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "slate-400",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "bg-background-subtle",
      // marginTop: '0.5rem', // Tailwind mt-2
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)", // Tailwind shadow-lg
      border: "1px solid #94A3B8",
      width: "100%",
      zIndex: "60",
      // borderRadius: '0.75rem',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#2D323B" : "#1C1F26",
      color: state.isFocused ? "#ffffff" : "#94A3B8", // Tailwind white
      cursor: "pointer",
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      backgroundColor: "#94A3B8", // Customize the color of the separator
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: state.isFocused ? "#ffffff" : "#94A3B8", // Change the color of the dropdown icon
    }),
  };

  const { data, isPending, isError, error, isSuccess } = postMutation;

  return (
    // <section className="py-16 px-8 m-auto">
    //   <Card className="max-w-md w-full mx-auto">
    //     <CardHeader>
    //       <CardTitle>Edit Post</CardTitle>
    //       <CardDescription>Description</CardDescription>
    //     </CardHeader>
    //     <CardContent>
    //       <form onSubmit={formik.handleSubmit}>
    //         <div className="grid w-full items-center gap-4">
    //           <div className="flex flex-col space-y-1.5">
    //             {/* Status display */}

    //             {isPending && (
    //               <LoadingAlert loading="Updating" loadingMsg="Please wait..." />
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
    //               Upload an image
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
    //                   className="mt-2 h-24 w-24 object-cover rounded-full border-2 border-gray-400"
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
    //               formik.setFieldValue("category", option.value)
    //             }
    //           />
    //         </div>
    //         <Button className="mt-6 w-full" type="submit">
    //           Update
    //         </Button>
    //       </form>
    //     </CardContent>
    //   </Card>
    // </section>

    <article className="!p-0 lg:min-h-page h-full !max-w-[100vw] lg:!max-w-[42.5rem] lg:border-r lg:border-l border-gray-600 px-4 md:px-8 relative z-1 flex w-full flex-col">
      <div className="flex flex-col">
        <header className="flex flex-row px-1 border-b border-gray-600 bg-color md:bg-[unset]">
          <ul className="relative flex flex-row">
            <button className="relative p-2 py-4 text-center font-bold text-base ">
              <span className="inline rounded-xl px-3 py-1.5 bg-theme-active text-white">
                Edit post
              </span>
            </button>
            <button
              className="relative p-2 py-4 text-center font-bold text-base"
              onClick={() => navigate("/dashboard/posts")}
            >
              <span className="inline rounded-xl px-3 py-1.5 bg-theme-active text-white">
                Back
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
            {/* <div className="mt-6 lg:w-[280px]">
              <div className="focus-outline px-3 cursor-pointer select-none flex-row items-center border border-transparent active:border-slate-400 no-underline shadow-none transition duration-200 ease-in-out justify-center font-bold h-12 rounded-xl btn-tertiaryFloat group flex w-full bg-background-subtle text-slate-400 text-base hover:bg-surface-hover hover:text-white gap-x-4">
                <GroupItemsIcon />
                <div className="flex-1"></div>
                <Select
                  styles={customStyles}
                  name="category"
                  placeholder="Select Category"
                  options={fetchedCategories?.data?.allCategories.map(
                    (category) => ({
                      value: category._id,
                      label: category.categoryName,
                    })
                  )}
                  value={fetchedCategories?.data?.allCategories.find(
                    (option) => option.value === formik.values.category
                  )}
                  onChange={(option) =>
                    formik.setFieldValue("category", option.value)
                  }
                />
              </div>
            </div> */}
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
                    <Camera01Icon className="w-5 h-5 pointer-events-none" />
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
              {/* Status display */}

              {isPending && (
                <LoadingAlert loading="Updating" loadingMsg="Please wait..." />
              )}
              {isError && (
                <DangerAlert
                  error="Caution"
                  errorMsg={error?.response?.data?.message || error?.message}
                />
              )}
              {isSuccess && (
                <SuccessAlert success="Success" successMsg={data?.message} />
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

            {/* category */}
            <Select
              value={formik.values.category} // Bind the formik value to the Select
              onValueChange={(value) => formik.setFieldValue("category", value)} // Handle value change
            >
              <SelectTrigger className="w-full mt-10 text-slate-400 h-12 rounded-xl bg-background-subtle hover:bg-gray-800 text-md font-bold border-l-4 border-transparent hover:border-white hover:text-white">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-slate-400 border-gray-600 rounded-lg">
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
              <div className="flex mt-1 text-red-500 text-xs ml-4">
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
                        Rewrite
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
                variant="outline"
                className="ml-auto border-none w-full md:mt-0 md:w-32 flex lg:text-white lg:bg-purple-600 lg:hover:bg-purple-700"
              >
                Update
              </Button>
            </span>
          </form>
        </div>
      </div>
    </article>
  );
};
export default UpdatePost;
