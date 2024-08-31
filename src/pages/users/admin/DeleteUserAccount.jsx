import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  deleteUserAPI,
  thirdUserProfileAPI,
  userProfileAPI,
} from "../../../API/users/userAPIs";
import { useParams, useNavigate } from "react-router-dom";
import SuccessAlert from "../../../components/alerts/SuccessAlert";
import DangerAlert from "../../../components/alerts/DangerAlert";
import LoadingAlert from "../../../components/alerts/LoadingAlert";
import { useEffect, useState } from "react";

const DeleteUserAccount = () => {
  //Get the user ID
  const { userId } = useParams();
  const navigate = useNavigate();

  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  //* Fetch the user data to be deleted
  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: () => thirdUserProfileAPI(userId),
  });

  //* Deleting of post
  const deleteUserMutation = useMutation({
    mutationKey: ["delete-user"],
    mutationFn: deleteUserAPI,
  });

  const deleteUserHandler = () => {
    deleteUserMutation.mutate(userId);
  };

  const { data, isError, error, isPending, isSuccess } = deleteUserMutation;

  // Error alert
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

  return (
    <section className="py-16 px-8 m-auto">
      {/* Alert Message */}
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
      <Card className="max-w-md mt-10 w-full mx-auto text-slate-200 rounded-xl bg-background-subtle hover:bg-gray-800 text-md border-gray-600">
        <CardHeader>
          <CardTitle className="text-red-500 font-bold">
            Delete User Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!isSuccess && (
            <p>
              Are you sure you want to delete{" "}
              <strong>{userData?.user?.username}'s</strong> account? This action
              is irreversible. Click 'Delete' to confirm or 'Cancel' to go back.
            </p>
          )}
          {isSuccess && <p>The user's account has been permanently deleted, and all associated data has been removed from the platform. Click 'Cancel' to go back.</p>}
          <CardFooter className="flex justify-between mt-6">
            <Button
              className="bg-white text-gray-800 rounded-xl hover:bg-slate-100 hover:text-gray-600"
              onClick={() => navigate("/dashboard/users-list")}
            >
              Cancel
            </Button>
            {!isSuccess && (
              <Button
                className="bg-red-500 text-white rounded-xl hover:bg-red-600 hover:text-slate-100"
                onClick={deleteUserHandler}
              >
                Delete
              </Button>
            )}
          </CardFooter>
        </CardContent>
      </Card>
    </section>
  );
};
export default DeleteUserAccount;
