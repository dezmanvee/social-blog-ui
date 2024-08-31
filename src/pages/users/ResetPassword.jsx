import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import LoadingAlert from "../../components/alerts/LoadingAlert";
import DangerAlert from "../../components/alerts/DangerAlert";
import SuccessAlert from "../../components/alerts/SuccessAlert";
import { verifyPasswordResetTokenAPI } from "../../API/users/userAPIs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CirclePasswordIcon, SwimmingIcon } from "hugeicons-react";
import { Button } from "../../components/ui/button";
import { ImSpinner9 } from "react-icons/im";

const ResetPassword = () => {
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const navigate = useNavigate();

  const resetToken = useParams();

  const resetPasswordMutation = useMutation({
    mutationKey: ["reset-password"],
    mutationFn: verifyPasswordResetTokenAPI,
  });

  const { data, isPending, isError, error, isSuccess } = resetPasswordMutation;
  // Handle Error state
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

  //!Formik Configuration
  const formik = useFormik({
    //*Initail values
    initialValues: {
      password: "",
    },

    //*schema for validation
    validationSchema: Yup.object({
      password: Yup.string().required("Password is required"),
    }),

    //* Submit form
    onSubmit: (values, {resetForm}) => {
      const userData = {
        password: values.password,
        resetToken,
      };
      console.log(userData);
      resetPasswordMutation.mutate(userData);
    },
  });

  //* Update current year for footer
  const currentYear = new Date().getFullYear();

  return (
    // <div className="flex items-center justify-center h-screen">
    //   <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
    //     <h2 className="text-2xl font-semibold text-center text-gray-700 mb-3">
    //       Reset Password
    //     </h2>
    //     {/* show alert */}
    //     {resetPasswordMutation?.isError && (
    //       <DangerAlert
    //         error="Error"
    //         errorMsg={
    //           resetPasswordMutation?.error?.response?.data?.message ||
    //           resetPasswordMutation?.error?.message
    //         }
    //       />
    //     )}
    //     {resetPasswordMutation?.isSuccess && (
    //       <SuccessAlert
    //         success="Success"
    //         successMsg={resetPasswordMutation?.data?.message}
    //       />
    //     )}
    //     {resetPasswordMutation?.isPending && (
    //       <LoadingAlert loading="Loading" loadingMsg="Please wait..." />
    //     )}

    //     <form className="mt-4" onSubmit={formik.handleSubmit}>
    //       <label htmlFor="password" className="block text-gray-700">
    //       Password:
    //       </label>
    //       <div className="flex pt-3 pr-2 items-center justify-center border rounded-md focus:outline-none focus:ring focus:border-orange-300">
    //         <AiOutlineSecurityScan className="mx-2 text-orange-500" />
    //         <input
    //           type="password"
    //           id="password"
    //           {...formik.getFieldProps("password")}
    //           className="w-full rounded-md p-2 outline-none border border-gray-100 shadow placeholder-gray-500 focus:ring focus:ring-white transition duration-200 mb-4"
    //         />
    //       </div>
    //       {formik.touched.password && formik.errors.password && (
    //         <div className="text-red-500 text-sm mt-1">
    //           {formik.errors.password}
    //         </div>
    //       )}
    //       <button
    //         type="submit"
    //         className="w-full px-3 py-2 mt-4 text-white bg-orange-500 rounded-md focus:bg-orange-500 focus:outline-none"
    //       >
    //         Reset Password
    //       </button>
    //     </form>
    //   </div>
    // </div>

    // <form onSubmit={formik.handleSubmit}>
    //   {isPending && (
    //     <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-[200]">
    //       <LoadingAlert
    //         loading="Loading"
    //         loadingMsg="Hang tight! We're getting things ready for you..."
    //       />
    //     </div>
    //   )}
    //   {showError && (
    //     <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-[200]">
    //       <DangerAlert
    //         error="Error"
    //         errorMsg={error?.message || error?.response?.data?.message}
    //       />
    //     </div>
    //   )}
    //   {showSuccess && (
    //     <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-[200]">
    //       <SuccessAlert success="Success" successMsg={data?.message} />
    //     </div>
    //   )}
    //   <h2 className="mt-0 font-bold text-white" id="profilePicture">
    //     Reset Your Password
    //   </h2>
    //   <p className="mt-1 text-slate-400">
    //     Enter your new password below to regain access to your account.
    //   </p>
    //   {/* Input Element */}
    //   <div className="flex flex-col w-full justify-start h-[120px]">
    //     <div className="mt-6 flex w-full rounded-xl flex-row items-center pl-2 h-12 px-4 overflow-hidden bg-background-subtle hover:bg-gray-800 border border-transparent cursor-text border-l-4 hover:border-l-white hover:text-white text-slate-400">
    //       <CirclePasswordIcon className="mr-2" />
    //       <div className="flex max-w-full flex-1 flex-col items-start">
    //         <input
    //           type="password"
    //           placeholder="Enter new password"
    //           name="password"
    //           id="password"
    //           size="1"
    //           className="self-stretch text-ellipsis hover:field-placeholder-color min-w-0  bg-transparent typo-body caret-text-link focus:outline-none"
    //           required
    //           {...formik.getFieldProps("password")}
    //         />
    //       </div>
    //     </div>
    //     {formik.touched.password && formik.errors.password && (
    //       <div className="text-red-500 text-xs ml-2">{formik.errors.password}</div>
    //     )}
    //   </div>
    //   <div className="h-[60%] w-full"></div>
    //   <Button
    //     type="submit"
    //     variant="outline"
    //     className="font-bold h-10 px-5 rounded-xl ml-auto hover:shadow-2xl"
    //   >
    //     Request Password Reset
    //   </Button>
    // </form>

    <div className="z-3 flex h-full max-h-screen min-h-screen w-full flex-1 flex-col items-center overflow-x-hidden bg-color">
      <Link
        className="flex items-center relative mt-0.5 lg:mt-0 w-auto px-10 py-8 lg:w-full"
        to="/"
      >
        <SwimmingIcon className="h-8 w-auto text-slate-300" />
        <div className="text-white text-2xl font-bold">
          <span>Dev</span>
          <span className="text-gray-400 text-xl font-semibold">ware</span>
        </div>
      </Link>
      <div className="flex w-full flex-grow flex-col flex-wrap justify-center px-4 md:flex-row md:gap-10 md:px-6 max-w-[75rem] xl:max-w-[90rem]">
        <div className="z-1 flex w-full max-w-[26.25rem] flex-col overflow-y-auto rounded-16 rounded-none md:max-w-[30rem] h-full">
          <h2 className="text-center font-bold text-2xl text-white">
            Reset Your Password
          </h2>

          <p className="mt-4 text-slate-400 text-center">
            Enter your new password below to regain access to your account.
          </p>

          <div className="px-6 md:px-[3.75rem] flex flex-col gap-3 self-center mt-6 w-full">
            {/* Error Messege */}
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

            {/* Form*/}
            <form
              className="flex flex-col gap-8"
              onSubmit={formik.handleSubmit}
            >
              <div className="flex flex-col items-stretch">
                <div className="relative flex rounded-xl flex-row items-center pl-3 h-12 px-4 overflow-hidden bg-gray-900 hover:bg-gray-800 border border-transparent cursor-text border-l-4 hover:border-l-white">
                  <CirclePasswordIcon className="mr-2 text-gray-400 hover:text-white" />
                  <div className="flex max-w-full flex-1 flex-col items-start">
                    <input
                      type="password"
                      placeholder="Enter new password"
                      name="password"
                      id="password"
                      size="1"
                      className="self-stretch text-ellipsis hover:field-placeholder-color  text-gray-400 hover:text-white min-w-0  bg-transparent text-base caret-text-link focus:outline-none"
                      required
                      {...formik.getFieldProps("password")}
                    />
                  </div>
                </div>
                {/* Error alert */}
                {formik.touched.password && formik.errors.password && (
                  <div
                    className="mt-1 px-2 text-xs h-4 text-red-500"
                    role="alert"
                  >
                    {formik.errors.password}
                  </div>
                )}
              </div>

              <span className="mt-4 flex w-full flex-row">
                {isSuccess ? (
                  <Button
                    type="button"
                    className="flex flex-1 h-10 text-base font-extrabold rounded-xl bg-purple-500 hover:bg-purple-600 text-white"
                    onClick={() => navigate("/login")}
                  >
                    Return to login
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="outline"
                    className="flex flex-1 h-10 text-base font-extrabold rounded-xl"
                  >
                    {isPending ? (
                      <ImSpinner9 className="animate-spin text-lg text-purple-500" />
                    ) : (
                      "Request Password Reset"
                    )}
                  </Button>
                )}
              </span>
            </form>
          </div>

          {/* Empty Container */}
          <div className="flex flex-1"></div>
        </div>
      </div>
      {/* Bottom */}
      <div className="mx-auto pb-6 flex flex-row flex-wrap justify-center gap-3 text-gray-400 text-xs">
        © {currentYear} Devware Ltd. Built with ❤ by Bamidele
      </div>
    </div>
  );
};
export default ResetPassword;
