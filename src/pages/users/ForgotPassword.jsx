import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineMail } from "react-icons/ai";
import { useMutation } from "@tanstack/react-query";
import { passwordResetTokenAPI } from "../../API/users/userAPIs";
import LoadingAlert from "../../components/alerts/LoadingAlert";
import DangerAlert from "../../components/alerts/DangerAlert";
import SuccessAlert from "../../components/alerts/SuccessAlert";


const ForgotPassword = () => {
  const forgotPasswordMutation = useMutation({
    mutationKey: ["forgot-password"],
    mutationFn: passwordResetTokenAPI,
  });

  //!Formik Configuration
  const formik = useFormik({
    //*Initail values
    initialValues: {
      email: "",
    },

    //*schema for validation
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Enter valid email")
        .required("Email is required"),
    }),

    //* Submit form
    onSubmit: (values) => {
      forgotPasswordMutation.mutate(values)
    }
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-3">
          Reset Password
        </h2>
        {/* show alert */}
        {forgotPasswordMutation?.isError && (
          <DangerAlert
            error="Error"
            errorMsg={
              forgotPasswordMutation?.error?.response?.data?.message ||
              forgotPasswordMutation?.error?.message
            }
          />
        )}
        {forgotPasswordMutation?.isSuccess && (
          <SuccessAlert
            success="Success"
            successMsg={forgotPasswordMutation?.data?.message}
          />
        )}
        {forgotPasswordMutation?.isPending && (
          <LoadingAlert loading="Loading" loadingMsg="Please wait..." />
        )}

        <form className="mt-4" onSubmit={formik.handleSubmit}>
          <label htmlFor="email" className="block text-gray-700">
            Email:
          </label>
          <div className="flex pt-3 pr-2 items-center justify-center border rounded-md focus:outline-none focus:ring focus:border-orange-300">
            <AiOutlineMail className="mx-2 text-orange-500" />
            <input
              type="email"
              id="email"
              {...formik.getFieldProps("email")}
              className="w-full rounded-md p-2 outline-none border border-gray-100 shadow placeholder-gray-500 focus:ring focus:ring-white transition duration-200 mb-4"
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.email}
            </div>
          )}
          <button
            type="submit"
            className="w-full px-3 py-2 mt-4 text-white bg-orange-500 rounded-md focus:bg-orange-500 focus:outline-none"
          >
            Submit Email
          </button>
        </form>
      </div>
    </div>
  );
};
export default ForgotPassword;
