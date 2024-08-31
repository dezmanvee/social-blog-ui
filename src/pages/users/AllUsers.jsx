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
import { useEffect, useState } from "react";

const AllUsers = () => {
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [showErrorUserBlock, setShowErrorUserBlock] = useState(false);
  const [showSuccessUserBlock, setShowSuccessUserBlock] = useState(false);

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

  // Error for deleting users
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

  // Handle success state for deleting users
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

  // Error for blocking users
  useEffect(() => {
    if (isErrorUserBlock) {
      setShowErrorUserBlock(true);

      // Set a timeout to hide the error after 5 seconds
      const timer = setTimeout(() => {
        setShowErrorUserBlock(false);
      }, 10000);

      // Clean up the timer on unmount or when isError changes
      return () => clearTimeout(timer);
    }
  }, [isErrorUserBlock]);

  // Handle success state for blocking users
  useEffect(() => {
    if (isSuccessUserBlock) {
      setShowSuccessUserBlock(true);

      // Set a timeout to hide the success message after 5 seconds
      const timer = setTimeout(() => {
        setShowSuccessUserBlock(false);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [isSuccessUserBlock]);

  return (
    <>
      {/* Alerts for deleting users */}
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
            errorMsg={error?.message || error?.response?.data?.message}
          />
        </div>
      )}
      {showSuccess && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-[200]">
          <SuccessAlert success="Success" successMsg={data?.message} />
        </div>
      )}

      {/* Alerts for blocking and unBlocking users */}

      {showErrorUserBlock && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-[200]">
          <DangerAlert
            error="Caution"
            errorMsg={
              errorUserBlock?.message || errorUserBlock?.response?.data?.message
            }
          />
        </div>
      )}
      {showSuccessUserBlock && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-[200]">
          <SuccessAlert success="Success" successMsg={DataUserBlock?.message} />
        </div>
      )}

      <Table className="text-slate-400 px-4">
        <TableCaption className="font-bold text-white">
          A list of all users
        </TableCaption>
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
