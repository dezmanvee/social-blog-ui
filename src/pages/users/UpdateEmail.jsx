import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { updateEmailAPI } from "../../API/users/userAPIs";
import "react-quill/dist/quill.snow.css";
import { Button } from "../../components/ui/button";
import { Mail01Icon } from "hugeicons-react";

// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import LoadingAlert from "../../components/alerts/LoadingAlert";
import DangerAlert from "../../components/alerts/DangerAlert";
import SuccessAlert from "../../components/alerts/SuccessAlert";
import { useEffect, useState } from "react";

const UpdateEmail = () => {
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const emailMutation = useMutation({
    mutationKey: ["update-email"],
    mutationFn: updateEmailAPI,
  });

  // get all states from useMutation hook
  const { data, isPending, isError, error, isSuccess } = emailMutation;

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

  const formik = useFormik({
    //*initial values
    initialValues: {
      email: "",
    },
    //*validation
    validationSchema: Yup.object({
      email: Yup.string().required("Email is required"),
    }),
    //*submit
    onSubmit: (values) => {
      emailMutation.mutate(values.email);
    },
  });

  return (
    // <section className="py-16 px-8 m-auto">
    //   <Card className="max-w-md w-full mx-auto">
    //     <CardHeader>
    //       <CardTitle>Update Account Email</CardTitle>
    //       <CardDescription>Add email to complete the registration process.</CardDescription>
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
    //             {/* form Input */}
    //             <div className="flex flex-col space-y-1.5">
    //               <Input id="email" placeholder="Enter email" {...formik.getFieldProps("email")}/>
    //             </div>
    //             {formik.touched.email && formik.errors.email && (
    //               <div
    //                 style={{
    //                   display: "flex",
    //                   marginBlock: "10px",
    //                   color: "red",
    //                   fontSize: "12px",
    //                 }}
    //               >
    //                 {formik.errors.email}
    //               </div>
    //             )}
    //           </div>
    //         </div>
    //         <Button className="mt-6 w-full" type="submit">
    //           Update Email
    //         </Button>
    //       </form>
    //     </CardContent>
    //   </Card>
    // </section>

    <form onSubmit={formik.handleSubmit}>
      {isPending && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-[200]">
          <LoadingAlert loading="Loading" loadingMsg="Hang tight! We're getting things ready for you..." />
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
        Account Email
      </h2>
      <p className="mt-1 text-slate-400">
        Please add or update your email address to ensure you receive important
        notifications and account-related updates
      </p>
      {/* Input Element */}
      <div className="flex flex-col w-full justify-start h-[120px]">
        <div className="mt-6 flex w-full rounded-xl flex-row items-center pl-2 h-12 px-4 overflow-hidden bg-background-subtle hover:bg-gray-800 border border-transparent cursor-text border-l-4 hover:border-l-white hover:text-white text-slate-400">
          <Mail01Icon className="mr-2" />
          <div className="flex max-w-full flex-1 flex-col items-start">
            <input
              type="email"
              placeholder="Add email"
              name="email"
              id="email"
              size="1"
              className="self-stretch text-ellipsis hover:field-placeholder-color min-w-0  bg-transparent typo-body caret-text-link focus:outline-none"
              required
              {...formik.getFieldProps("email")}
            />
          </div>
        </div>
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500 text-xs ml-2">{formik.errors.email}</div>
        )}
      </div>
      <div className="h-[60%] w-full"></div>
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
export default UpdateEmail;
