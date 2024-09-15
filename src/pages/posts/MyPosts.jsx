import { useMutation, useQuery } from "@tanstack/react-query";
import { userListAPI, userProfileAPI } from "../../API/users/userAPIs";
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
import {
  Edit01Icon,
  Delete01Icon,
  ArrowLeft01Icon,
  WhatsappIcon,
  Facebook01Icon,
  Facebook02Icon,
  Linkedin01Icon,
  Linkedin02Icon,
  NewTwitterIcon,
  Cancel01Icon,
} from "hugeicons-react";
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
  DialogClose,
} from "../../components/ui/dialog";
import {
  FacebookShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";

import { useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import Like from "../../components/svg/Like";
import Dislike from "../../components/svg/Dislike";
import { HOME_URL } from "../../utils/baseURL";
import Comment from "../../components/svg/Comment";
import {} from "@radix-ui/react-dialog";

const MyPosts = () => {
  const postURL = `${HOME_URL}/dashboard/post-details/`;

  const navigate = useNavigate();

  const [selectedPostId, setSelectedPostId] = useState(null);

  const { data, refetch } = useQuery({
    //* Get user profile data
    queryKey: ["user-profile"],
    queryFn: userProfileAPI,
  });

  //* Get users list data
  const {
    data: userList,
    isError,
    error,
    isPending,
    isSuccess,
  } = useQuery({
    queryKey: ["user-list"],
    queryFn: userListAPI,
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

  return (
    // <article className="!p-0 lg:min-h-full h-full !max-w-[100vw] lg:border-r lg:border-l border-gray-600 px-4 md:px-8 relative z-1 flex w-full flex-col">
    //   {/* header */}
    //   <div className="flex flex-row items-center gap-2 ml-0 w-full border-b-4 border-purple-500 bg-background-subtle px-6 py-4 opacity-100 mb-10">
    //     <form method="dialog" className="w-full">
    //       <div className="flex w-full items-center">
    //         <div className="flex-1 text-lg font-bold text-center" />
    //         <div className="flex ml-auto items-center">
    //           <Button
    //             className="w-10 h-10 p-0 text-slate-400 hover:text-white bg-transparent hover:bg-gray-700 rounded-xl"
    //             onClick={() => navigate("/dashboard/all-posts")}
    //           >
    //             <svg
    //               width="1em"
    //               height="1em"
    //               viewBox="0 0 24 24"
    //               xmlns="http://www.w3.org/2000/svg"
    //               class="w-7 h-7 pointer-events-none"
    //             >
    //               <path
    //                 d="M16.804 6.147a.75.75 0 011.049 1.05l-.073.083L13.061 12l4.72 4.72a.75.75 0 01-.977 1.133l-.084-.073L12 13.061l-4.72 4.72-.084.072a.75.75 0 01-1.049-1.05l.073-.083L10.939 12l-4.72-4.72a.75.75 0 01.977-1.133l.084.073L12 10.939l4.72-4.72.084-.072z"
    //                 fill="currentcolor"
    //                 fill-rule="evenodd"
    //               ></path>
    //             </svg>
    //           </Button>
    //         </div>
    //       </div>
    //     </form>
    //   </div>
    //   <Table className="text-slate-400 px-4">
    //     <TableCaption className="font-bold text-white">
    //       A list of your posts.
    //     </TableCaption>
    //     <TableHeader>
    //       <TableRow>
    //         <TableHead className="pl-4">Post content</TableHead>
    //         <TableHead className="text-right">Created on</TableHead>
    //         {/* <TableHead className="text-right">Current Earnings ($)</TableHead> */}
    //         <TableHead className="text-right">Earnings ($)</TableHead>
    //         {/* <TableHead className="text-right">Next Earning</TableHead> */}
    //         <TableHead className="text-right">Update</TableHead>
    //         <TableHead className="text-right pr-4">Delete</TableHead>
    //       </TableRow>
    //     </TableHeader>
    //     <TableBody>
    //       {data?.user?.posts?.map((post) => (
    //         <TableRow key={post._id}>
    //           <TableCell className="font-medium flex justify-start items-center gap-4 pl-4">
    //             <Avatar className="hidden md:flex">
    //               <AvatarImage
    //                 src={post?.image?.path}
    //                 className="!w-10 !h-10 pointer-events-none rounded"
    //               />
    //             </Avatar>
    //             <div>
    //               {truncateString(
    //                 htmlToText(post?.description),
    //                 18
    //               ).toUpperCase()}
    //             </div>
    //           </TableCell>
    //           <TableCell className="text-right">
    //             {new Date(post?.createdAt).toDateString()}
    //           </TableCell>

    //           <TableCell className="text-right">
    //             {post?.totalEarnings?.toFixed(2)}
    //           </TableCell>

    //           <TableCell className="text-right">
    //             <Link to={`/dashboard/update-post/${post?._id}`}>
    //               <Badge
    //                 variant="outlined"
    //                 className="cursor-pointer w-10 h-10 border-none bg-surface-float hover:bg-color hover:text-violet-500"
    //               >
    //                 <Edit01Icon className="text-sm" />
    //               </Badge>
    //             </Link>
    //           </TableCell>
    //           <TableCell className="text-right pr-4">
    //             {/* Here is the dialog to delete a post */}
    //             <Dialog>
    //               <DialogTrigger asChild>
    //                 <Badge
    //                   variant="outlined"
    //                   className="cursor-pointer w-10 h-10 border-none bg-surface-float hover:bg-color hover:text-[#FC538D]"
    //                   onClick={() => setSelectedPostId(post?._id)}
    //                 >
    //                   <Delete01Icon className="text-sm" />
    //                 </Badge>
    //               </DialogTrigger>
    //               <DialogContent className="max-w-[40rem]">
    //                 <DialogHeader>
    //                   <DialogTitle className="text-[#FC538D]">
    //                     Delete post
    //                   </DialogTitle>
    //                   <DialogDescription className="text-white text-base">
    //                     Are you sure you want to delete this post? This action
    //                     cannot be undone and you will lose all associated data.
    //                     Please confirm your decision.
    //                   </DialogDescription>
    //                 </DialogHeader>
    //                 {/* post content */}
    //                 <article className="flex flex-col rounded-3xl p-4 hover:bg-surface-hover focus:outline border-gray-600">
    //                   <header className="z-1 flex w-full flex-row self-start items-center">
    //                     <img
    //                       src={post?.image?.path}
    //                       alt="Post image"
    //                       className="object-cover w-10 h-10 rounded-lg"
    //                       loading="lazy"
    //                       onError={(e) => {
    //                         e.target.onerror = null; // Prevent infinite loop if fallback fails
    //                         e.target.src = "https://github.com/shadcn.png";
    //                       }}
    //                     />

    //                     <div className="ml-1 rounded-lg flex min-w-0 flex-1 flex-col text-sm justify-end bg-background-subtle py-1 pl-1">
    //                       <span className="text-white font-semibold">
    //                         #{post?.category?.categoryName}
    //                       </span>
    //                       <span className="text-slate-400 max-w-full shrink truncate text-xs">
    //                         {post?.createdAt
    //                           ? format(new Date(post?.createdAt), "MMMM d yyyy") //For date format "Aug 21"
    //                           : `invalid time`}
    //                       </span>
    //                     </div>
    //                   </header>
    //                   <div className="break-words-overflow z-1 mt-3 text-sm">
    //                     <p className="text-slate-400">
    //                       <div
    //                         dangerouslySetInnerHTML={{
    //                           __html: truncateString(post?.description, 500),
    //                         }}
    //                       />
    //                     </p>
    //                   </div>
    //                 </article>
    //                 <DialogFooter>
    //                   <Button
    //                     type="submit"
    //                     className="bg-[#FC538D] text-white hover:bg-white hover:text-[#FC538D]"
    //                     onClick={() => deletePostHandler(post?._id)}
    //                   >
    //                     Confirm
    //                   </Button>
    //                 </DialogFooter>
    //               </DialogContent>
    //             </Dialog>
    //           </TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </article>

    <article className="relative !mx-auto md:!max-w-full lg:!mt-0 md:!mt-4 px-4 md:px-8 z-1 flex w-full flex-col lg:!max-w-[42.5rem]">
      <div className="relative flex flex-col w-full">
        {!data?.user?.posts ? (
          <section className="flex scroll-mt-16 flex-col items-stretch border-gray-700 rounded-none md:border-x border">
            <h1 className="text-3xl text-white font-bold">
              Your have no post yet!
            </h1>
          </section>
        ) : (
          <section className="flex scroll-mt-16 flex-col items-stretch border-gray-700 rounded-none md:border-x border">
            {data?.user?.posts?.map((post) => {
              return (
                <article
                  key={post?._id}
                  className="flex flex-col p-4 hover:bg-background-subtle focus:outline border-gray-700 relative border-0 border-b rounded-none pointer-events-auto"
                  // onClick={() => navigate(`/dashboard/post-details/${post?._id}`)}
                >
                  <div className="focus:outline inset-0 h-full w-full">
                    <header className="mb-4 line-clamp-1 text-slate-300 text-sm">
                      <p>
                        Post relating to <strong>catgoryName</strong>
                      </p>
                    </header>
                    <header className="z-1 flex w-full flex-row self-start">
                      <div className="flex min-w-0 shrink items-center no-underline">
                        <img
                          src={post?.image?.path}
                          alt=""
                          className="object-cover w-10 h-10 rounded-lg"
                          loading="lazy"
                        />
                      </div>
                      <div className="ml-3 flex min-w-0 flex-1 flex-col text-sm">
                        <span className="flex flex-row">
                          <div className="w-fit font-bold text-white flex min-w-0 shrink items-center no-underline">
                            <p className="max-w-full shrink truncate">
                              Earnings by views
                            </p>
                          </div>
                          <div className="flex items-center">
                            <span className="flex items-center font-bold capitalize md:gap-0.5 md:text-sm ml-1 text-white">
                              <svg
                                width="1em"
                                height="1em"
                                viewBox="0 0 16 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-5 h-5 pointer-events-none text-purple-600"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M8 13.605A5.333 5.333 0 108 2.938a5.333 5.333 0 000 10.667zm1.213-8.672a.494.494 0 00-.812-.517L4.944 7.922a.494.494 0 00.35.843H7.82l-1.034 2.844a.494.494 0 00.812.518l3.456-3.507a.494.494 0 00-.348-.842H8.179l1.034-2.845z"
                                  fill="currentcolor"
                                ></path>
                              </svg>
                              $ {post?.totalEarnings?.toFixed(2)}
                            </span>
                          </div>
                        </span>

                        <span className="items-center text-slate-400 flex flex-row">
                          <p className="flex min-w-0 shrink items-center no-underline">
                            #{post?.category?.categoryName.toLowerCase()}
                          </p>
                          <div className="mx-2 h-0.5 w-0.5 bg-slate-400"></div>
                          <p>
                            {new Date(post?.createdAt)
                              .toDateString()
                              .toLowerCase()}
                          </p>
                        </span>
                      </div>
                    </header>

                    <div className="break-words z-[1px] mt-3 pointer-events-none">
                      <p className="text-white">
                        {" "}
                        {truncateString(htmlToText(post?.description), 180)}
                      </p>
                      <div className="flex flex-row items-center pointer-events-none mt-3">
                        <Button className="h-8 w-8 p-0 rounded-lg text-slate-400 bg-transparent pointer-events-auto hover:bg-green-950 hover:text-green-500">
                          <Like />
                        </Button>
                        <Button className="h-8 w-8 p-0 rounded-lg text-slate-400 bg-transparent pointer-events-auto hover:bg-pink-950 hover:text-pink-500">
                          <Dislike />
                        </Button>
                        {/* comments */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="h-8 w-8 p-0 rounded-lg text-slate-400 bg-transparent pointer-events-auto hover:bg-cyan-950 hover:text-cyan-500 ml-4">
                              <svg
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-6 h-6 pointer-events-none"
                              >
                                <path
                                  d="M8.084 3.217a35.447 35.447 0 017.05-.078l.782.078.279.031c1.089.121 1.885.372 2.606.828a4.516 4.516 0 011.664 1.86c.336.69.5 1.423.53 2.361l.005.321v3.975a4.493 4.493 0 01-3.545 4.392l-.207.04-2.089.346-2.86 2.992-.147.135c-.986.789-2.399.623-3.205-.324-.532-.625-.616-1.34-.51-2.29l.029-.224.038-.254.033-.187-1.332-.189a5.011 5.011 0 01-1.677-.55l-.253-.146-.243-.16a4.777 4.777 0 01-1.491-1.721 4.935 4.935 0 01-.532-1.972l-.009-.3V8.618c0-1.096.162-1.915.535-2.683.375-.77.94-1.4 1.664-1.859.649-.41 1.359-.655 2.288-.788l.318-.04.28-.031zm7.666 1.491a33.948 33.948 0 00-6.752-.075l-.748.075-.28.031c-.915.102-1.481.297-1.97.606a3.016 3.016 0 00-1.116 1.247c-.228.468-.357.989-.38 1.76l-.004.266v3.563c0 .577.134 1.116.375 1.587.242.471.592.874 1.024 1.18.37.263.801.453 1.276.554l.242.043 1.98.283c.339.048.457.096.575.175.119.078.262.187.27.386l-.002.024-.013.08-.164.741-.064.333c-.111.63-.167 1.332.09 1.634.263.309.7.39 1.037.187l.089-.062 2.998-3.135.13-.101.092-.063.077-.04.08-.03.035-.01.087-.02L17 15.545a2.993 2.993 0 002.495-2.77l.005-.182V8.618c0-.921-.13-1.506-.384-2.026A3.016 3.016 0 0018 5.345c-.44-.278-.943-.464-1.706-.572l-.265-.034-.279-.03zm-.55 6.294l.093.005c.398.044.707.36.707.746 0 .38-.301.693-.691.743l-.109.007H8.8l-.093-.005c-.398-.044-.707-.36-.707-.745 0-.38.301-.694.691-.744l.109-.007h6.4zm0-3.5l.093.004c.398.044.707.36.707.746 0 .38-.301.693-.691.743l-.109.007H8.8l-.093-.005C8.309 8.953 8 8.637 8 8.252c0-.38.301-.694.691-.744l.109-.007h6.4z"
                                  fill="currentcolor"
                                  fill-rule="evenodd"
                                ></path>
                              </svg>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-[32rem] !rounded-sm max-h-[24rem] px-0 pt-0 overflow-x-hidden overflow-y-scroll border-none">
                            <header className="top-0 left-0 sticky w-full h-16 bg-gray-700 border-b border-gray-700 flex justify-center items-center">
                              <div className="flex-1"></div>
                              <DialogClose className="w-7 h-7 mr-4 bg-white rounded-lg flex items-center justify-center z-[300px] opacity-70 hover:opacity-100">
                                <Cancel01Icon />
                              </DialogClose>
                            </header>
                            <section className="flex m-auto justify-start items-center p-6 w-full">
                              {/* comments wrapper */}
                              <div className="flex flex-col">
                                {/* comment card */}
                                {post?.comments?.map((comment) => {
                                  return (
                                    <div
                                      key={comment?._id}
                                      className="flex flex-col gap-2 -z-[1px]"
                                    >
                                      <section className="flex scroll-mt-16 flex-col items-stretch border-gray-600 border-b">
                                        <article className="flex flex-col p-4 hover:bg-surface-hover focus:outline border-gray-600 hover:bg-background-subtle">
                                          <header className="z-1 flex w-full flex-row self-start items-center">
                                            <img
                                              src={
                                                comment?.author?.profilePicture
                                                  ?.path ||
                                                comment?.author
                                                  ?.profilePicture ||
                                                "https://github.com/shadcn.png"
                                              }
                                              alt={`${
                                                comment?.author?.username ||
                                                "User"
                                              }'s profile picture`}
                                              className="object-cover w-10 h-10 rounded-lg"
                                              loading="lazy"
                                              onError={(e) => {
                                                e.target.onerror = null; // Prevent infinite loop if fallback fails
                                                e.target.src =
                                                  "https://github.com/shadcn.png";
                                              }}
                                            />

                                            <div className="ml-1 flex min-w-0 flex-1 flex-col text-sm justify-end py-1 pl-3">
                                              <span className="text-white font-semibold">
                                                {comment?.author?.username}
                                              </span>
                                              <span className="text-slate-400 max-w-full shrink truncate text-xs">
                                                {formatDistanceToNow(
                                                  new Date(comment?.createdAt)
                                                )}{" "}
                                                ago
                                              </span>
                                            </div>
                                          </header>
                                          <div className="break-words-overflow z-1 mt-3 text-sm">
                                            <p className="text-white">
                                              {comment?.content}
                                            </p>
                                          </div>
                                        </article>
                                      </section>
                                    </div>
                                  );
                                })}
                              </div>
                            </section>
                          </DialogContent>
                        </Dialog>

                        <Popover>
                          <PopoverTrigger asChild>
                            <Button className="h-8 w-8 p-0 rounded-lg text-slate-400 bg-transparent pointer-events-auto hover:bg-purple-950 hover:text-purple-500 ml-4">
                              <svg
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-6 h-6 pointer-events-none"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M14.302 3.805a2.75 2.75 0 10-3.89 3.89L11.5 8.78h-1.142a7.367 7.367 0 00-7.078 5.323l-1.233 4.271c-.315 1.09 1.068 1.849 1.818.999l2.287-2.59a5.25 5.25 0 013.935-1.775h1.422l-1.095 1.095a2.75 2.75 0 103.889 3.889l6.149-6.15a2.75 2.75 0 000-3.889l-6.15-6.149zm-.473 9.92a.75.75 0 01.012 1.073l-2.367 2.366a1.25 1.25 0 101.767 1.768l6.15-6.15a1.25 1.25 0 000-1.767l-6.15-6.149a1.25 1.25 0 10-1.768 1.768L13.74 8.9a.75.75 0 01-.396 1.38.753.753 0 01-.065 0h-2.922a5.867 5.867 0 00-5.637 4.24l-.694 2.403 1-1.133a6.75 6.75 0 015.06-2.283h3.216c.205 0 .391.083.527.216z"
                                  fill="currentcolor"
                                ></path>
                              </svg>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="!p-0 w-auto border-none">
                            <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-4 rounded-lg w-auto p-4">
                              <h3 className="text-lg font-bold">Share on:</h3>
                              <WhatsappShareButton
                                className="!w-auto"
                                url={`${postURL}/${post?._id}`}
                              >
                                <WhatsappIcon className="text-[#25D366] w-8 h-8 lg:w-12 lg:h-12" />
                              </WhatsappShareButton>
                              <FacebookShareButton
                                className="!w-auto"
                                url={`${postURL}/${post?._id}`}
                              >
                                <Facebook02Icon className="text-[#1877F2] w-8 h-8 lg:w-12 lg:h-12" />
                              </FacebookShareButton>
                              <TwitterShareButton
                                className="!w-auto"
                                url={`${postURL}/${post?._id}`}
                              >
                                <NewTwitterIcon className="text-[#000000] w-8 h-8 lg:w-12 lg:h-12" />
                              </TwitterShareButton>

                              <LinkedinShareButton
                                className="!w-auto"
                                url={`${postURL}/${post?._id}`}
                              >
                                <Linkedin02Icon className="text-[#0077B5] w-8 h-8 lg:w-12 lg:h-12" />
                              </LinkedinShareButton>
                            </div>
                          </PopoverContent>
                        </Popover>
                        {/* Here is the dialog to delete a post */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              className="h-8 w-8 p-0 rounded-lg text-slate-400 bg-transparent pointer-events-auto hover:bg-red-950 hover:text-red-500 ml-4"
                              onClick={() => setSelectedPostId(post?._id)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke-width="1.8"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                color="currentColor"
                                class="w-5 h-5 pointer-events-none"
                              >
                                <path
                                  d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
                                  stroke="currentColor"
                                ></path>
                                <path
                                  d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
                                  stroke="currentColor"
                                ></path>
                              </svg>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-[40rem]">
                            <DialogHeader>
                              {/* text-[#FC538D] */}
                              <DialogTitle className="text-red-500 text-lg font-bold">
                                Delete post ?
                              </DialogTitle>
                              <DialogDescription className="text-white text-base">
                                Are you sure you want to delete this post? This
                                action cannot be undone and you will lose all
                                associated data. Please confirm your decision.
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
                                    e.target.src =
                                      "https://github.com/shadcn.png";
                                  }}
                                />

                                <div className="ml-1 rounded-lg flex min-w-0 flex-1 flex-col text-sm justify-end bg-background-subtle py-1 pl-1">
                                  <span className="text-white font-semibold">
                                    #{post?.category?.categoryName}
                                  </span>
                                  <span className="text-slate-400 max-w-full shrink truncate text-xs">
                                    {post?.createdAt
                                      ? format(
                                          new Date(post?.createdAt),
                                          "MMMM d yyyy"
                                        ) //For date format "Aug 21"
                                      : `invalid time`}
                                  </span>
                                </div>
                              </header>
                              <div className="break-words-overflow z-1 mt-3 text-sm">
                                <p className="text-slate-400">
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: truncateString(
                                        post?.description,
                                        300
                                      ),
                                    }}
                                  />
                                </p>
                              </div>
                            </article>
                            <DialogFooter className="flex gap-4">
                              <DialogClose className="btn-w-dialog">
                                <Button
                                  variant="outline"
                                  type="button"
                                  className="rounded-lg font-bold !w-full"
                                >
                                  Close
                                </Button>
                              </DialogClose>
                              <Button
                                type="submit"
                                className="bg-red-500 rounded-lg text-white hover:bg-red-600 font-bold"
                                onClick={() => deletePostHandler(post?._id)}
                              >
                                Confirm
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button className="h-8 w-8 p-0 rounded-lg text-slate-400 bg-transparent pointer-events-auto hover:bg-gray-700 hover:text-white ml-4">
                              <svg
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-6 h-6 pointer-events-none"
                              >
                                <path
                                  d="M12 17a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0-6.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM12 4a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"
                                  fill="currentcolor"
                                  fill-rule="evenodd"
                                ></path>
                              </svg>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="!p-0 w-auto rounded-lg border-0 bg-gray-700 hover:bg-white hover:text-black text-white">
                            <Button
                              className="h-8 rounded-lg bg-transparent pointer-events-auto hover:bg-white hover:text-black"
                              onClick={() =>
                                navigate(`/dashboard/update-post/${post?._id}`)
                              }
                            >
                              Edit this post
                            </Button>
                          </PopoverContent>
                        </Popover>
                        <div className="flex-1"></div>
                        <p className="text-sm text-slate-400 ">
                          {post?.likes?.length || 0} likes
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </div>
    </article>
  );
};
export default MyPosts;
