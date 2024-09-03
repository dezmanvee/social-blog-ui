import { useMutation } from "@tanstack/react-query";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { createPlanAPI } from "../../API/plans/planAPIs";
import LoadingAlert from "../../components/alerts/LoadingAlert";
import DangerAlert from "../../components/alerts/DangerAlert";
import SuccessAlert from "../../components/alerts/LoadingAlert";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { DollarCircleIcon, ProfitIcon } from "hugeicons-react";
import { Button } from "../../components/ui/button";

const CreatePlan = () => {
  const navigate = useNavigate();

  const planMutation = useMutation({
    mutationKey: ["create-plan"],
    mutationFn: createPlanAPI,
  });
  //!Formik Configuration
  const formik = useFormik({
    //*Initail values
    initialValues: {
      planName: "",
      features: "Limited features, No supports, 50 Posts",
      price: "0.00",
    },

    //*schema for validation
    validationSchema: Yup.object({
      planName: Yup.string().required("Plan name is required*"),
      features: Yup.string().required("features are required*"),
      price: Yup.string().required("price is required*"),
    }),

    //* Submit form
    onSubmit: async (values) => {
      const postData = {
        planName: values?.planName,
        features: values?.features.split(",").map((feature) => feature.trim()),
        price: values?.price,
      };
      planMutation
        .mutateAsync(postData)
        .then(() => {
          //Navigate to user dashboard
          navigate("/dashboard");
        })
        .catch((err) => console.log(err));
    },
  });
  const { data, isError, isSuccess, isPending, error } = planMutation;
  return (
    <article className="!p-0 lg:min-h-page h-[100vh] !max-w-[100vw] lg:!max-w-[42.5rem] lg:border-r lg:border-l border-gray-600 px-4 md:px-8 relative z-1 flex w-full flex-col">
      <div className="flex flex-col">
        <header className="flex flex-row px-1 border-b border-gray-600 bg-color md:bg-[unset]">
          <ul className="relative flex flex-row">
            <button className="relative p-2 py-4 text-center font-bold text-base ">
              <span className="inline rounded-xl px-3 py-1.5 bg-theme-active text-white">
                Add plan
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
            <LoadingAlert loading="Loading" loadingMsg="Please wait..." />
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
          <div className="flex flex-col w-full justify-start">
            <Select className="mt-10">
              <SelectTrigger className="w-full mt-10 text-slate-400 h-12 rounded-xl bg-background-subtle hover:bg-gray-800 text-md font-bold border-l-4 border-transparent hover:border-white hover:text-white">
                <SelectValue placeholder="Select a plan" />
              </SelectTrigger>
              <SelectContent className="bg-background-subtle text-slate-400 border-gray-600 rounded-lg">
                <SelectGroup
                  id="planName"
                  {...formik.getFieldProps("planName")}
                >
                  <SelectLabel className="font-bold text-slate-200">
                    Plans
                  </SelectLabel>
                  <SelectItem value="Free">Free</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {formik.touched.planName && formik.errors.planName && (
              <div className="text-red-500 text-xs ml-2">
                {formik.errors.planName}
              </div>
            )}
          </div>
          {/* Plan benefits */}
          <div className="flex flex-col w-full justify-start">
            <div className="mt-6 flex w-full rounded-xl flex-row items-center pl-2 h-12 px-4 overflow-hidden bg-background-subtle hover:bg-gray-800 border border-transparent cursor-text border-l-4 hover:border-l-white hover:text-white text-slate-400">
              <ProfitIcon className="mr-2" />
              <div className="flex max-w-full flex-1 flex-col items-start">
                <input
                  type="text"
                  placeholder="Plan benefits (comma separated values)"
                  name="features"
                  id="features"
                  size="1"
                  className="self-stretch text-ellipsis hover:field-placeholder-color min-w-0  bg-transparent typo-body caret-text-link focus:outline-none"
                  required
                  {...formik.getFieldProps("features")}
                />
              </div>
            </div>
            {formik.touched.features && formik.errors.features && (
              <div className="text-red-500 text-xs ml-2">
                {formik.errors.features}
              </div>
            )}
          </div>
          {/* Price */}
          <div className="flex flex-col w-full justify-start">
            <div className="mt-6 flex w-full rounded-xl flex-row items-center pl-2 h-12 px-4 overflow-hidden bg-background-subtle hover:bg-gray-800 border border-transparent cursor-text border-l-4 hover:border-l-white hover:text-white text-slate-400">
              <DollarCircleIcon className="mr-2" />
              <div className="flex max-w-full flex-1 flex-col items-start">
                <input
                  type="number"
                  placeholder="Price"
                  name="price"
                  id="price"
                  size="1"
                  className="self-stretch text-ellipsis hover:field-placeholder-color min-w-0 bg-transparent caret-text-link focus:outline-none"
                  required
                  {...formik.getFieldProps("price")}
                />
              </div>
            </div>
            {formik.touched.price && formik.errors.price && (
              <div className="text-red-500 text-xs ml-2">
                {formik.errors.price}
              </div>
            )}
          </div>
          {/* Submit */}
          <Button
            variant="outline"
            className="w-full h-10 rounded-xl mt-10 font-bold"
            type="submit"
          >
            Add plan
          </Button>
        </form>
      </div>
    </article>
  );
};

export default CreatePlan;
