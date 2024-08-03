import { useMutation, useQuery } from "@tanstack/react-query";
import { userProfileAPI } from "../../API/users/userAPIs";
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
import { htmlToText } from "html-to-text";
import truncateString from "../../lib/truncateString";
import { Edit01Icon, Delete01Icon } from "hugeicons-react";
import { deletePostAPI } from "../../API/posts/postAPIs";
import { Link } from "react-router-dom";
import LoadingAlert from "../../components/alerts/LoadingAlert";
import DangerAlert from "../../components/alerts/DangerAlert";
import SuccessAlert from "../../components/alerts/SuccessAlert";

const MyPosts = () => {
  const { data, refetch,} = useQuery({
    //* Get user profile data
    queryKey: ["user-profile"],
    queryFn: userProfileAPI,
  });

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
  const {data: errorData, isError, error, isPending, isSuccess} = deletePostMutation
  return (
    <>
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
      <Table>
        <TableCaption>A list of your posts.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Post</TableHead>
            <TableHead className="text-right">Created on</TableHead>
            <TableHead className="text-right">Current Earnings ($)</TableHead>
            <TableHead className="text-right">Total Earnings ($)</TableHead>
            <TableHead className="text-right">Next Earning</TableHead>
            <TableHead className="text-right">Update</TableHead>
            <TableHead className="text-right">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.user?.posts?.map((post) => (
            <TableRow key={post._id}>
              <TableCell className="font-medium flex justify-start items-center gap-4">
                <Avatar>
                  <AvatarImage src={post?.image?.path} />
                  <AvatarFallback>{post?.image?.fieldname}</AvatarFallback>
                </Avatar>
                <div>{truncateString(htmlToText(post?.description), 18)}</div>
              </TableCell>
              <TableCell className="text-right">
                {new Date(post?.createdAt).toDateString()}
              </TableCell>
              <TableCell className="text-right">
                {post?.thisMonthEarnings?.toFixed(2)}{" "}
              </TableCell>
              <TableCell className="text-right">
                {post?.totalEarnings?.toFixed(2)}
              </TableCell>
              <TableCell className="text-right">
                {new Date(post?.nextEarningDate).toDateString()}
              </TableCell>
              <TableCell className="text-right">
                <Link to={`/dashboard/update-post/${post?._id}`}>
                  <Badge variant="outlined" className="cursor-pointer">
                    <Edit01Icon className="text-sm" />
                  </Badge>
                </Link>
              </TableCell>
              <TableCell className="text-right">
                <Badge
                  variant="outlined"
                  className="cursor-pointer"
                  onClick={() => deletePostHandler(post?._id)}
                >
                  <Delete01Icon className="text-red-400 text-sm" />
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
export default MyPosts;
