import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { updateEmailAPI } from "../../API/users/userAPIs";
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
import { Input } from "../../components/ui/input" 

// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import LoadingAlert from "../../components/alerts/LoadingAlert";
import DangerAlert from "../../components/alerts/DangerAlert";
import SuccessAlert from "../../components/alerts/SuccessAlert";

const UpdateEmail = () => {

  const emailMutation = useMutation({
    mutationKey: ["update-email"],
    mutationFn: updateEmailAPI,
  });

  // get all states from useMutation hook
  const { data, isPending, isError, error, isSuccess } = emailMutation;

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
    <section className="py-16 px-8 m-auto">
      <Card className="max-w-md w-full mx-auto">
        <CardHeader>
          <CardTitle>Update Account Email</CardTitle>
          <CardDescription>Add email to complete the registration process.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                {/* Status display */}

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
                {/* form Input */}
                <div className="flex flex-col space-y-1.5">
                  <Input id="email" placeholder="Enter email" {...formik.getFieldProps("email")}/>
                </div>
                {formik.touched.email && formik.errors.email && (
                  <div
                    style={{
                      display: "flex",
                      marginBlock: "10px",
                      color: "red",
                      fontSize: "12px",
                    }}
                  >
                    {formik.errors.email}
                  </div>
                )}
              </div>
            </div>
            <Button className="mt-6 w-full" type="submit">
              Update Email
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};
export default UpdateEmail;
