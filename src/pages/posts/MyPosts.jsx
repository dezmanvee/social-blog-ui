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
import { Edit01Icon, Delete01Icon, ArrowLeft01Icon } from "hugeicons-react";
import { deletePostAPI } from "../../API/posts/postAPIs";
import { Link, useNavigate } from "react-router-dom";
import LoadingAlert from "../../components/alerts/LoadingAlert";
import DangerAlert from "../../components/alerts/DangerAlert";
import SuccessAlert from "../../components/alerts/SuccessAlert";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../../components/ui/dialog";
import { useState } from "react";
import { format } from "date-fns";

const MyPosts = () => {
  const navigate = useNavigate();

  const [selectedPostId, setSelectedPostId] = useState(null);

  const { data, refetch } = useQuery({
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
  const {
    data: errorData,
    isError,
    error,
    isPending,
    isSuccess,
  } = deletePostMutation;
  return (
    <>
      {/* {isPending && (
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
      )} */}

      <article className="!p-0 lg:min-h-full h-full !max-w-[100vw] lg:border-r lg:border-l border-gray-600 px-4 md:px-8 relative z-1 flex w-full flex-col">
        {/* header */}
        <div className="flex flex-row items-center gap-2 ml-0 w-full border-b-4 border-purple-500 bg-background-subtle px-6 py-4 opacity-100 mb-10">
          <form method="dialog" className="w-full">
            <div className="flex w-full items-center">
              <div className="flex-1 text-lg font-bold text-center" />
              <div className="flex ml-auto items-center">
                <Button
                  className="w-10 h-10 p-0 text-slate-400 hover:text-white bg-transparent hover:bg-gray-700 rounded-xl"
                  onClick={() => navigate("/dashboard/all-posts")}
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-7 h-7 pointer-events-none"
                  >
                    <path
                      d="M16.804 6.147a.75.75 0 011.049 1.05l-.073.083L13.061 12l4.72 4.72a.75.75 0 01-.977 1.133l-.084-.073L12 13.061l-4.72 4.72-.084.072a.75.75 0 01-1.049-1.05l.073-.083L10.939 12l-4.72-4.72a.75.75 0 01.977-1.133l.084.073L12 10.939l4.72-4.72.084-.072z"
                      fill="currentcolor"
                      fill-rule="evenodd"
                    ></path>
                  </svg>
                </Button>
              </div>
            </div>
          </form>
        </div>
        <Table className="text-slate-400 px-4">
          <TableCaption className="font-bold text-white">
            A list of your posts.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4">Post content</TableHead>
              <TableHead className="text-right">Created on</TableHead>
              {/* <TableHead className="text-right">Current Earnings ($)</TableHead> */}
              <TableHead className="text-right">Earnings ($)</TableHead>
              {/* <TableHead className="text-right">Next Earning</TableHead> */}
              <TableHead className="text-right">Update</TableHead>
              <TableHead className="text-right pr-4">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.user?.posts?.map((post) => (
              <TableRow key={post._id}>
                <TableCell className="font-medium flex justify-start items-center gap-4 pl-4">
                  <Avatar className="hidden md:flex">
                    <AvatarImage
                      src={post?.image?.path}
                      className="!w-10 !h-10 pointer-events-none rounded"
                    />
                  </Avatar>
                  <div>
                    {truncateString(
                      htmlToText(post?.description),
                      18
                    ).toUpperCase()}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {new Date(post?.createdAt).toDateString()}
                </TableCell>
               
                <TableCell className="text-right">
                  {post?.totalEarnings?.toFixed(2)}
                </TableCell>
               
                <TableCell className="text-right">
                  <Link to={`/dashboard/update-post/${post?._id}`}>
                    <Badge
                      variant="outlined"
                      className="cursor-pointer w-10 h-10 border-none bg-surface-float hover:bg-color hover:text-violet-500"
                    >
                      <Edit01Icon className="text-sm" />
                    </Badge>
                  </Link>
                </TableCell>
                <TableCell className="text-right pr-4">
                  {/* Here is the dialog to delete a post */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Badge
                        variant="outlined"
                        className="cursor-pointer w-10 h-10 border-none bg-surface-float hover:bg-color hover:text-[#FC538D]"
                        onClick={() => setSelectedPostId(post?._id)}
                      >
                        <Delete01Icon className="text-sm" />
                      </Badge>
                    </DialogTrigger>
                    <DialogContent className="max-w-[40rem]">
                      <DialogHeader>
                        <DialogTitle className="text-[#FC538D]">
                          Delete post
                        </DialogTitle>
                        <DialogDescription className="text-white text-base">
                          Are you sure you want to delete this post? This action
                          cannot be undone and you will lose all associated
                          data. Please confirm your decision.
                        </DialogDescription>
                      </DialogHeader>
                      {/* post content */}
                      <article className="flex flex-col rounded-3xl p-4 hover:bg-surface-hover focus:outline border-gray-600">
                        <header className="z-1 flex w-full flex-row self-start items-center">
                          <img
                            src={post?.image?.path}
                            alt="Post image"
                            className="object-cover w-10 h-10 rounded-lg"
                            loading="lazy"
                            onError={(e) => {
                              e.target.onerror = null; // Prevent infinite loop if fallback fails
                              e.target.src = "https://github.com/shadcn.png";
                            }}
                          />

                          <div className="ml-1 rounded-lg flex min-w-0 flex-1 flex-col text-sm justify-end bg-background-subtle py-1 pl-1">
                            <span className="text-white font-semibold">
                              #{post?.category?.categoryName}
                            </span>
                            <span className="text-slate-400 max-w-full shrink truncate text-xs">
                              {post?.createdAt
                                ? format(new Date(post?.createdAt), "MMMM d yyyy") //For date format "Aug 21"
                                : `invalid time`}
                            </span>
                          </div>
                        </header>
                        <div className="break-words-overflow z-1 mt-3 text-sm">
                          <p className="text-slate-400">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: truncateString(post?.description, 500),
                              }}
                            />
                          </p>
                        </div>
                      </article>
                      <DialogFooter>
                        <Button
                          type="submit"
                          className="bg-[#FC538D] text-white hover:bg-white hover:text-[#FC538D]"
                          onClick={() => deletePostHandler(post?._id)}
                        >
                          Confirm
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </article>
    </>
  );
};
export default MyPosts;
