import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import {
  SwimmingIcon,
  Mail01Icon,
  ArrowRight02Icon,
  LockKeyIcon,
  UserIcon,
} from "hugeicons-react";
import { useMutation } from "@tanstack/react-query";
import { registerAPI } from "../API/users/userAPIs";
import { ImSpinner9 } from "react-icons/im";
import { Button } from "../components/ui/button";

const Home = () => {

  //* Update current year for footer
  const currentYear = new Date().getFullYear();

  const navigate = useNavigate();
  const userMutation = useMutation({
    mutationKey: ["user-registration"],
    mutationFn: registerAPI,
  });
 
  //!Formik Configuration
  const formik = useFormik({
    //*Initail values
    initialValues: {
      username: "",
      email: "",
      password: "",
    },

    //*schema for validation
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Enter valid email")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),

    //* Submit form
    onSubmit: (values) => {
      userMutation
        .mutateAsync(values)
        .then(
          //Navigate to user profile
          navigate("/profile")
        )
        .catch((err) => console.log(err));
    },
  });

  const { error, isError, isPending } = userMutation;
  return (
    // Wrapper
    <div className="z-3 flex h-full max-h-screen min-h-screen w-full flex-1 flex-col items-center overflow-x-hidden bg-cover md:bg-center bg-image-mobile md:bg-image-desktop">
      {/* Header */}
      <header className="flew-row mt-6 flex h-full w-full justify-between px-6 md:mt-16 lg:mt-20 max-w-[75rem] xl:max-w-[90rem]">
        {/* <meter className="appearance-none transition-[width] absolute left-1 h-1 bg-accent-cabbage-default"></meter> */}
        <Link
          className="flex items-center relative mt-0.5 lg:mt-0 w-auto pointer-events-none gap-1"
          to="/"
          aria-label="Home"
        >
          <SwimmingIcon className="h-8 w-auto text-white" />
          <div className="text-white text-2xl font-bold hidden xs:block">
            <span>Dev</span>
            <span className="text-gray-400 text-xl font-semibold">ware</span>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <span className="hidden md:block text-gray-400">
            Already using Devware?
          </span>
          <Link to="/login">
            <Button
              variant="outline"
              className="bg-inherit text-white font-extrabold"
            >
              Log in
            </Button>
          </Link>
        </div>
      </header>
      {/* Banner */}
      <div className="flex w-full flex-grow flex-col flex-wrap justify-center px-4 md:flex-row md:gap-10 md:px-6 max-w-[75rem] lg:max-w-[90rem] mt-7.5 flex-1 content-center">
        {/* Left banner */}
        <div className="mt-5 flex flex-1 flex-col md:mt-0 lg:mr-8 lg:max-w-[27.5rem] flex-grow-0 md:flex-grow">
          <h1 className="mb-4 md:text-3xl text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
            Embark on a journey of discovery and growth
          </h1>
          <h2 className="mb-8 text-lg md:text-xl text-white">
            We know how hard it is to be a developer. It doesn't have to be.
            Personalized news feed, dev community and search, much better than
            what's out there.
          </h2>
          {/* Form Wrapper */}
          <div className="z-1 flex w-full max-w-[26.25rem] flex-col overflow-y-auto rounded-16 w-full rounded-none md:max-w-[30rem] max-w-full">
            {/* local auth */}
            <form
              className="flex flex-col mb-8 gap-8"
              onSubmit={formik.handleSubmit}
            >
              <div className="flex flex-col gap-2 items-stretch">
                {/* Username */}
                <div className="relative flex rounded-xl flex-row items-center pl-3 h-12 flex px-4 overflow-hidden bg-surface-float border border-transparent cursor-text border-l-4 hover:border-l-white">
                  <UserIcon className="mr-2 text-gray-400 hover:text-white" />
                  <div className="flex max-w-full flex-1 flex-col items-start">
                    <input
                      type="text"
                      placeholder="Username"
                      name="username"
                      id="username"
                      size="1"
                      className="self-stretch text-ellipsis hover:field-placeholder-color  text-gray-400 hover:text-white min-w-0  bg-transparent typo-body caret-text-link focus:outline-none"
                      required
                      {...formik.getFieldProps("username")}
                    />
                  </div>
                </div>
                  {/* Error alert */}
                  {formik.touched.username && formik.errors.username && (
                    <div
                      className="mt-1 px-2 text-xs h-4 text-red-500"
                      role="alert"
                    >
                      {formik.errors.username}
                    </div>
                  )}
                {/* Email */}
                <div className="relative flex rounded-xl flex-row items-center pl-3 h-12 flex px-4 overflow-hidden bg-surface-float border border-transparent cursor-text border-l-4 hover:border-l-white">
                  <Mail01Icon className="mr-2 text-gray-400 hover:text-white" />
                  <div className="flex max-w-full flex-1 flex-col items-start">
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      id="email"
                      size="1"
                      className="self-stretch text-ellipsis hover:field-placeholder-color  text-gray-400 hover:text-white min-w-0  bg-transparent typo-body caret-text-link focus:outline-none"
                      required
                      {...formik.getFieldProps("email")}
                    />
                  </div>
                </div>
                 {/* Error alert */}
                 {formik.touched.email && formik.errors.email && (
                    <div
                      className="mt-1 px-2 text-xs h-4 text-red-500"
                      role="alert"
                    >
                      {formik.errors.email}
                    </div>
                  )}
                {/* password */}
                <div className="relative flex rounded-xl flex-row items-center pl-3 h-12 flex px-4 overflow-hidden bg-surface-float border border-transparent cursor-text border-l-4 hover:border-l-white">
                  <LockKeyIcon className="mr-2 text-gray-400 hover:text-white" />
                  <div className="flex max-w-full flex-1 flex-col items-start">
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      id="password"
                      size="1"
                      className="self-stretch text-ellipsis hover:field-placeholder-color  text-gray-400 hover:text-white min-w-0  bg-transparent typo-body caret-text-link focus:outline-none"
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

              <Button
                type="submit"
                variant="outline"
                className="h-12 font-extrabold text-base rounded-xl"
              >
                {isPending ? (
                  <ImSpinner9 className="animate-spin text-lg text-purple-800" />
                ) : (
                  <>
                    <span>Sign up - For testing </span>
                    <span className="font-extrabold">
                      <ArrowRight02Icon />
                    </span>
                  </>
                )}
              </Button>
            </form>
          </div>
          {/* Divider */}
          <div className="flex items-center justify-center text-gray-400 text-base mb-8">
            <div className="h-px flex-1 bg-border-subtlest-tertiary" />
            <span className="px-3">Or sign up with</span>
            <div className="h-px flex-1 bg-border-subtlest-tertiary" />
          </div>
          {/* google auth */}
          <div className="flex flex-col gap-8 pb-8 !gap-5 !pb-5 md:gap-8 md:pb-8">
            <a
              href="http://localhost:8000/api/v1/users/auth/google"
              className="inline-flex min-w-full min-h-full rounded-xl"
            >
              <Button
                variant="outline"
                className="h-12 font-extrabold text-base w-full rounded-xl"
              >
                {isPending ? (
                  <ImSpinner9 className="animate-spin text-lg text-purple-800" />
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={21}
                      height={20}
                      viewBox="0 0 21 20"
                      fill="none"
                    >
                      <path
                        d="M10.5003 1.91667C12.5358 1.91667 14.3903 2.67493 15.8117 3.91839L13.8037 5.92643C12.9021 5.19326 11.7542 4.75001 10.5003 4.75001C7.601 4.75001 5.25033 7.10068 5.25033 10C5.25033 12.8993 7.601 15.25 10.5003 15.25C12.7863 15.25 14.7244 13.7867 15.4456 11.7501L15.5636 11.4167H15.2099H10.7503V8.58334H17.7503V8.61792H18.0003H18.4637C18.5415 9.06752 18.5837 9.52907 18.5837 10C18.5837 14.464 14.9643 18.0833 10.5003 18.0833C6.03631 18.0833 2.41699 14.464 2.41699 10C2.41699 5.53599 6.03631 1.91667 10.5003 1.91667Z"
                        fill="#FFC107"
                        stroke="#FFC107"
                        strokeWidth="0.5"
                      />
                      <path
                        d="M3.12793 6.12125L5.86585 8.12917C6.60668 6.29501 8.40085 5.00001 10.5004 5.00001C11.775 5.00001 12.9346 5.48084 13.8175 6.26625L16.1746 3.90917C14.6863 2.52209 12.6954 1.66667 10.5004 1.66667C7.2996 1.66667 4.52376 3.47375 3.12793 6.12125Z"
                        fill="#FF3D00"
                      />
                      <path
                        d="M10.4998 18.3333C12.6523 18.3333 14.6081 17.5096 16.0869 16.17L13.5077 13.9875C12.6429 14.6452 11.5862 15.0009 10.4998 15C8.3323 15 6.49189 13.6179 5.79855 11.6892L3.08105 13.7829C4.46022 16.4817 7.26105 18.3333 10.4998 18.3333Z"
                        fill="#4CAF50"
                      />
                      <path
                        d="M18.6713 8.36791H18V8.33333H10.5V11.6667H15.2096C14.8809 12.5902 14.2889 13.3972 13.5067 13.9879L13.5079 13.9871L16.0871 16.1696C15.9046 16.3354 18.8333 14.1667 18.8333 9.99999C18.8333 9.44124 18.7758 8.89583 18.6713 8.36791Z"
                        fill="#1976D2"
                      />
                    </svg>
                    <div className="ml-4">Google</div>
                  </>
                )}
              </Button>
            </a>
          </div>
        </div>
        {/* Footer for mobile devices */}
        <p className="w-full text-center text-gray-400 text-xs mb-0 md:mb-10 md:hidden">
          By signing up I accept the{" "}
          <Link className="font-bold underline" to="/">
            Terms of Service
          </Link>{" "}
          and the{" "}
          <Link className="font-bold underline" to="/">
            Privacy Policy
          </Link>
          .
        </p>
        {/* Right banner which is empty*/}
        <div className="flex md:flex-1 md:ml-auto md:max-w-[37.5rem] flex-1" />
      </div>

      {/* Footer */}
      <footer className="flex h-full max-h-[10rem] w-full px-4 md:px-6 max-w-[75rem] xl:max-w-[90rem]">
        <div className="relative flex flex-1 flex-col gap-6 pb-6 md:mt-auto lg:mr-8 lg:max-w-[27.5rem]"></div>
        <p className="w-full text-center text-gray-400 text-xs mb-0 hidden md:mb-10 md:block">
          By signing up I accept the{" "}
          <Link className="font-bold underline" to="/">
            Terms of Service
          </Link>{" "}
          and the{" "}
          <Link className="font-bold underline" to="/">
            Privacy Policy
          </Link>
          .
        </p>
      </footer>
      <div className="mx-auto pb-6 flex flex-row flex-wrap justify-center gap-3 text-gray-300 text-xs">
        © {currentYear} Devware Ltd. Built with ❤ by Bamidele
      </div>
    </div>
  );
};
export default Home;
