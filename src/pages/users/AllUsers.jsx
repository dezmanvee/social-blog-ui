import { useMutation, useQuery } from "@tanstack/react-query";
import { blockOrUnBlockUserAPI, userListAPI } from "../../API/users/userAPIs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Delete01Icon, UserIcon } from "hugeicons-react";
import { deletePostAPI } from "../../API/posts/postAPIs";
import LoadingAlert from "../../components/alerts/LoadingAlert";
import DangerAlert from "../../components/alerts/DangerAlert";
import SuccessAlert from "../../components/alerts/SuccessAlert";

import { BASE_URL } from "../../utils/baseURL";
import { Link } from "react-router-dom";

const AllUsers = () => {
  const { data, refetch } = useQuery({
    //* Get user profile data
    queryKey: ["users-list"],
    queryFn: userListAPI,
  });

  //* Fetch the user to be blocked or unblocked
  const userBlockingMutation = useMutation({
    mutationKey: ["user-blocking"],
    mutationFn: blockOrUnBlockUserAPI,
  });

  const {
    data: DataUserBlock,
    isError: isErrorUserBlock,
    error: errorUserBlock,
    isPending: isPendingUserBlock,
    isSuccess: isSuccessUserBlock,
  } = userBlockingMutation;

  const toggleUserBlockingHandler = (user) => {
    const actionURL = user?.isBlocked
      ? `${BASE_URL}/users/account-active`
      : `${BASE_URL}/users/account-inactive`;
    const userId = user._id;
    //Payload
    const data = {
      actionURL,
      userId,
    };
    userBlockingMutation
      .mutateAsync(data)
      .then(() => {
        refetch(); // refetch the users
      })
      .catch((e) => console.log(e));
  };

  //* Deleting of post
  const deletePostMutation = useMutation({
    mutationKey: ["delete-post"],
    mutationFn: deletePostAPI,
  });

  const deletePostHandler = (postId) => {
    deletePostMutation
      .mutateAsync(postId)
      .then(() => {
        refetch();
      })
      .catch((e) => console.log(e));
  };

  const {
    data: errorData,
    isError,
    error,
    isPending,
    isSuccess,
  } = deletePostMutation;
  console.log(data)

  return (
    <>
      {/* Alerts for deleting users */}
      <div className="max-w-96 m-auto">
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
          <SuccessAlert success="Success" successMsg={errorData?.message} />
        )}

        {/* Alerts for blocking and unBlocking users */}

        {isErrorUserBlock && (
          <DangerAlert
            error="Caution"
            errorMsg={
              errorUserBlock?.response?.data?.message || errorUserBlock?.message
            }
          />
        )}
        {isSuccessUserBlock && (
          <SuccessAlert success="Success" successMsg={DataUserBlock?.message} />
        )}
      </div>
      <Table className="text-slate-400 px-4">
        <TableCaption className="font-bold text-white">A list of all users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Users</TableHead>
            <TableHead className="text-right">Joined Since</TableHead>
            <TableHead className="text-right">Total Posts</TableHead>
            <TableHead className="text-right">Total Earnings</TableHead>
            <TableHead className="text-right">Subcription Plan</TableHead>
            <TableHead className="text-right">Status</TableHead>
            <TableHead className="text-right">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.users?.map((user) => (
            <TableRow key={user?._id}>
              <TableCell className="font-medium flex justify-start items-center gap-4">
                <img
                  src={user?.profilePicture || "https://github.com/shadcn.png"}
                  alt={`${user?.username || "User"}'s profile picture`}
                  className="!w-10 !h-10 pointer-events-none rounded hidden md:flex"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop if fallback also fails
                    e.target.src = "https://github.com/shadcn.png";
                  }}
                />
                <div className="flex items-center justify-between w-full">
                  <div>{user?.username}</div>

                  {user?.role === "admin" ? (
                    <Badge className="text-xs bg-purple-500 hover:bg-purple-500 py-0 px-1">
                      <small>admin</small>
                    </Badge>
                  ) : (
                    ""
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right">
                {new Date(user?.createdAt).toDateString()}
              </TableCell>
              <TableCell className="text-right">
                {user?.posts?.length}
              </TableCell>
              <TableCell className="text-right">
                {user?.totalEarnings?.toFixed(2)}
              </TableCell>
              <TableCell className="text-right">
                {user?.plan?.planName || user?.planName || "Nill"}
              </TableCell>
              <TableCell className="text-right">
                <Badge
                  variant="outlined"
                  className="cursor-pointer border-none bg-surface-float hover:bg-color hover:text-[#FC538D]"
                  onClick={() => {
                    toggleUserBlockingHandler(user);
                  }}
                >
                  {user?.isBlocked ? (
                    <small className="text-red-500">Suspended</small>
                  ) : (
                    <small className="text-green-500 ">Active</small>
                  )}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Link to={`/dashboard/delete-user-account/${user?._id}`}>
                  <Badge
                    variant="outlined"
                    className="cursor-pointer w-10 h-10 border-none bg-surface-float hover:bg-color hover:text-[#FC538D]"
                    // onClick={() => setSelectedPostId(post?._id)}
                  >
                    <Delete01Icon className="text-sm" />
                  </Badge>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
export default AllUsers;
