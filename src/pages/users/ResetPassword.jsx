import { AiOutlineSecurityScan } from "react-icons/ai"
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import LoadingAlert from "../../components/alerts/LoadingAlert";
import DangerAlert from "../../components/alerts/DangerAlert";
import SuccessAlert from "../../components/alerts/SuccessAlert";
import { verifyPasswordResetTokenAPI } from "../../API/users/userAPIs";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {

    const navigate = useNavigate();

    const resetToken = useParams()

    const resetPasswordMutation = useMutation({
      mutationKey: ["reset-password"],
      mutationFn: verifyPasswordResetTokenAPI,
    });

    //!Formik Configuration
  const formik = useFormik({
    //*Initail values
    initialValues: {
      password: "",
    },

    //*schema for validation
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Password is required"),
    }),

    //* Submit form
    onSubmit: (values) => {

        const userData = {
            password: values.password,
            resetToken
        }
        console.log(userData);
      resetPasswordMutation
        .mutateAsync(userData)
        .then(() => {
          navigate('/dashboard')
        })
        .catch((err) => console.log(err));
    },
  });
  console.log(resetPasswordMutation)
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-3">
          Reset Password
        </h2>
        {/* show alert */}
        {resetPasswordMutation?.isError && (
          <DangerAlert
            error="Error"
            errorMsg={
              resetPasswordMutation?.error?.response?.data?.message ||
              resetPasswordMutation?.error?.message
            }
          />
        )}
        {resetPasswordMutation?.isSuccess && (
          <SuccessAlert
            success="Success"
            successMsg={resetPasswordMutation?.data?.message}
          />
        )}
        {resetPasswordMutation?.isPending && (
          <LoadingAlert loading="Loading" loadingMsg="Please wait..." />
        )}

        <form className="mt-4" onSubmit={formik.handleSubmit}>
          <label htmlFor="password" className="block text-gray-700">
          Password:
          </label>
          <div className="flex pt-3 pr-2 items-center justify-center border rounded-md focus:outline-none focus:ring focus:border-orange-300">
            <AiOutlineSecurityScan className="mx-2 text-orange-500" />
            <input
              type="password"
              id="password"
              {...formik.getFieldProps("password")}
              className="w-full rounded-md p-2 outline-none border border-gray-100 shadow placeholder-gray-500 focus:ring focus:ring-white transition duration-200 mb-4"
            />
          </div>
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.password}
            </div>
          )}
          <button
            type="submit"
            className="w-full px-3 py-2 mt-4 text-white bg-orange-500 rounded-md focus:bg-orange-500 focus:outline-none"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  )
}
export default ResetPassword