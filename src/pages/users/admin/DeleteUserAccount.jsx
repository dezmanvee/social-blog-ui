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
import { deleteUserAPI, userProfileAPI } from "../../../API/users/userAPIs";
import { useParams } from "react-router-dom";
import SuccessAlert from "../../../components/alerts/SuccessAlert";
import DangerAlert from "../../../components/alerts/DangerAlert";
import LoadingAlert from "../../../components/alerts/LoadingAlert";

const DeleteUserAccount = () => {
  //Get the user ID
  const { userId } = useParams();

  //* Fetch the user data
  const {data: userData} = useQuery({
    queryKey: ['user'],
    queryFn: userProfileAPI
  })


  //* Deleting of post
  const deleteUserMutation = useMutation({
    mutationKey: ["delete-user"],
    mutationFn: deleteUserAPI,
  });
  console.log(deleteUserMutation, userId);

  const deleteUserHandler = () => {
    deleteUserMutation.mutate(userId);
  };

  const {
    data,
    isError,
    error,
    isPending,
    isSuccess,
  } = deleteUserMutation;

  return (
    <section className="py-16 px-8 m-auto">
      <Card className="max-w-md w-full mx-auto">
        <CardHeader>
          <CardTitle>Delete User Account</CardTitle>
         {/* Alert Message */}
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
        </CardHeader>
        <CardContent>
          <p>
            You are about to delete this user from our database. Note that this action cannot be undone once it is
            completed. Click the "delete" button to confirm or "cancel" to go
            back.
          </p>
          <CardFooter className="flex justify-between mt-6">
            <Button onClick={() => {}} variant="outline">
              Return
            </Button>
            <Button onClick={deleteUserHandler}>Delete</Button>
          </CardFooter>
        </CardContent>
      </Card>
    </section>
  );
};
export default DeleteUserAccount;
