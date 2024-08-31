import { useMutation } from "@tanstack/react-query";
import { createCategoryAPI } from "../../API/categories/categoryAPIs";
import DangerAlert from "../../components/alerts/DangerAlert";
import LoadingAlert from "../../components/alerts/LoadingAlert";
import SuccessAlert from "../../components/alerts/SuccessAlert";
import { useFormik } from "formik";
import * as Yup from "yup";
import { GroupItemsIcon } from "hugeicons-react";
import { Button } from "../../components/ui/button";
import { useEffect, useState } from "react";

const AddCategory = () => {
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);


  const categoryMutation = useMutation({
    mutationKey: ["create-category"],
    mutationFn: createCategoryAPI,
  });

  // get all states from useMutation hook
  const { data, isPending, isError, error, isSuccess } = categoryMutation;


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
      categoryName: "",
    },
    //*validation
    validationSchema: Yup.object({
      categoryName: Yup.string().required("Category is required*"),
    }),
    //*submit
    onSubmit: (values) => {
      categoryMutation.mutate(values);
    },
  });
  return (
    <article className="!p-0 lg:min-h-page h-[100vh] !max-w-[100vw] lg:!max-w-[42.5rem] lg:border-r lg:border-l border-gray-600 px-4 md:px-8 relative z-1 flex w-full flex-col">
      <div className="flex flex-col">
        <header className="flex flex-row px-1 border-b border-gray-600 bg-color md:bg-[unset]">
          <ul className="relative flex flex-row">
            <button className="relative p-2 py-4 text-center font-bold text-base ">
              <span className="inline rounded-xl px-3 py-1.5 bg-theme-active text-white">
                Add category
              </span>
            </button>
            <div
              className="absolute bottom-0 mx-auto h-0.5 w-12 -translate-x-1/2 rounded-4 bg-white transition-[left] ease-linear"
              style={{ left: "53.4896px" }}
            />
          </ul>
        </header>

        <form
          className="w-full max-w-[26.25rem] flex flex-col items-center justify-center px-4 md:px-6 m-auto"
          onSubmit={formik.handleSubmit}
        >
          {/* show mesage */}
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

          {/* Category */}
          <div className="flex flex-col w-full justify-start">
            <div className="mt-6 flex w-full rounded-xl flex-row items-center pl-2 h-12 px-4 overflow-hidden bg-background-subtle hover:bg-gray-800 border border-transparent cursor-text border-l-4 hover:border-l-white hover:text-white text-slate-400">
              <GroupItemsIcon className="mr-2" />
              <div className="flex max-w-full flex-1 flex-col items-start">
                <input
                  type="text"
                  placeholder="Add new category"
                  name="category"
                  id="category"
                  size="1"
                  className="self-stretch text-ellipsis hover:field-placeholder-color min-w-0  bg-transparent typo-body caret-text-link focus:outline-none"
                  required
                  {...formik.getFieldProps("categoryName")}
                />
              </div>
            </div>
            {formik.touched.categoryName && formik.errors.categoryName && (
              <div className="text-red-500 text-xs ml-2">
                {formik.errors.categoryName}
              </div>
            )}
          </div>

          {/* Submit */}
          <Button
            variant="outline"
            className="w-full h-10 rounded-xl mt-10 font-bold"
            type="submit"
          >
            Confirm
          </Button>
        </form>
      </div>
    </article>
  );
};

export default AddCategory;
