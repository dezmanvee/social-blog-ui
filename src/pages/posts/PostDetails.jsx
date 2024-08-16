import { dislikePostAPI, likePostAPI, postAPI } from "../../API/posts/postAPIs";
import {
  userFollowAPI,
  userProfileAPI,
  userUnfollowAPI,
} from "../../API/users/userAPIs";
import { createCommentAPI } from "../../API/comments/commentAPIs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaThumbsDown,
  FaThumbsUp,
  FaEye,
  FaComment,
  FaTrashAlt,
  FaEdit,
} from "react-icons/fa";
import { RiUserFollowLine, RiUserUnfollowFill } from "react-icons/ri";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "../../components/ui/button";
import { EyeIcon, ArrowLeft01Icon } from "hugeicons-react";
import { format, formatDistanceToNow } from "date-fns";

const PostDetails = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  //* Post read time
  const readTime = Math.floor(Math.random() * 2) + 1;
  const message = `${readTime}min read time`;

  //* Fetch data from single post
  const {
    isError,
    isLoading,
    isSuccess,
    data,
    error,
    refetch: refetchPost,
  } = useQuery({
    queryKey: ["single-post"],
    queryFn: () => postAPI(postId),
  });

  //* fetch user data
  const { data: loggedInUser, refetch: refetchUser } = useQuery({
    queryKey: ["login-user-profile"],
    queryFn: userProfileAPI,
  });

  //* Fetch created comment of posts
  const commentMutation = useMutation({
    mutationKey: ["create-comment"],
    mutationFn: createCommentAPI,
  });

  //* Get user who the made post
  const postAuthorId = data?.post?.author;

  const followUserMutation = useMutation({
    mutationKey: ["follow-user"],
    mutationFn: userFollowAPI,
  });

  const unFollowUserMutation = useMutation({
    mutationKey: ["unfollow-user"],
    mutationFn: userUnfollowAPI,
  });

  //* Like post API
  const likePostMutation = useMutation({
    mutationKey: ["follow-user"],
    mutationFn: likePostAPI,
  });

  //*Dislike post API
  const dislikePostMutation = useMutation({
    mutationKey: ["follow-user"],
    mutationFn: dislikePostAPI,
  });

  //* Handler for following post
  const followUserHandler = () => {
    followUserMutation
      .mutateAsync(postAuthorId)
      .then(() => {
        //Refetch user to update action
        refetchUser();
      })
      .catch((e) => console.log(e));
  };

  //* Handler for unfollowing post
  const unFollowUserHandler = () => {
    unFollowUserMutation
      .mutateAsync(postAuthorId)
      .then(() => {
        //Refetch user to update action
        refetchUser();
      })
      .catch((e) => console.log(e));
  };

  //* Handler for like post
  const likePostHandler = () => {
    likePostMutation
      .mutateAsync(postId)
      .then(() => {
        //Refetch post details to update action
        refetchPost();
      })
      .catch((e) => console.log(e));
  };

  //* Handler for dislike post
  const dislikePostHandler = () => {
    dislikePostMutation
      .mutateAsync(postId)
      .then(() => {
        //Refetch post details to update action
        refetchPost();
      })
      .catch((e) => console.log(e));
  };
  //* Check if loginUser following array is populated
  const isFollowing = loggedInUser?.user?.following?.find(
    (user) => user?.toString() === postAuthorId?.toString()
  );

  //config formik
  const formik = useFormik({
    //set values
    initialValues: {
      content: "",
    },
    // //validation
    // validationSchema: Yup.object({
    //   content: Yup.string().required("Comment content is required."),
    // }),
    //submit
    onSubmit: (values, { resetForm }) => {
      const commentData = {
        content: values.content,
        postId,
      };
      commentMutation
        .mutateAsync(commentData)
        .then(() => {
          refetchPost();
          resetForm();
        })
        .catch((e) => console.log(e));
    },
  });

  return (
    // <div className="container mx-auto sm:px-64 sm:py-16 p-4">
    //   <div className="bg-white rounded-lg shadow-lg p-5">
    //     <div className="relative" style={{ height: 480 }}>
    //       <img
    //         src={data?.post?.image?.path}
    //         alt={data?.post?.description}
    //         className="w-full h-full object-cover rounded-lg mb-4"
    //       />
    //     </div>
    //     {/* Show messages */}

    //     <div className="flex gap-4 items-center mb-4">
    //       {/* like icon */}
    //       <span
    //         className="flex items-center gap-1 cursor-pointer"
    //         onClick={likePostHandler}
    //       >
    //         <FaThumbsUp />
    //         {data?.post?.likes?.length || 0}
    //       </span>

    //       {/* Dislike icon */}
    //       <span
    //         className="flex items-center gap-1 cursor-pointer"
    //         onClick={dislikePostHandler}
    //       >
    //         <FaThumbsDown />

    //         {data?.post?.dislikes?.length || 0}
    //       </span>
    //       {/* views icon */}
    //       <span className="flex items-center gap-1">
    //         <FaEye />
    //         {data?.post?.viewers?.length || 0}
    //       </span>
    //     </div>

    //     {/* follow icon */}
    //     {isFollowing ? (
    //       <button
    //         onClick={unFollowUserHandler}
    //         className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-400 hover:bg-red-500 focus:outline-none"
    //       >
    //         Unfollow
    //         <RiUserUnfollowFill className="mr-2" />
    //       </button>
    //     ) : (
    //       <button
    //         onClick={followUserHandler}
    //         className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-400 hover:bg-orange-500 focus:outline-none"
    //       >
    //         Follow
    //         <RiUserFollowLine className="ml-2" />
    //       </button>
    //     )}

    //     {/* author */}
    //     <span className="ml-2">{/* {postData?.author?.username} */}</span>

    //     {/* post details */}
    //     <div className="flex justify-between items-center mb-3">
    //       <div
    //         className="rendered-html-content mb-2"
    //         dangerouslySetInnerHTML={{ __html: data?.post?.description }}
    //       />
    //     </div>

    //     {/* Comment Form */}
    //     <form onSubmit={formik.handleSubmit}>
    //       <textarea
    //         className="w-full border border-gray-300 p-2 rounded-lg mb-2"
    //         rows="3"
    //         placeholder="Add a comment..."
    //         // value={comment}
    //         {...formik.getFieldProps("content")}
    //       ></textarea>
    //       {/* comment error */}
    //       {formik.touched.content && formik.errors.content && (
    //         <div className="text-red-500 mb-4 mt-1">
    //           {formik.errors.content}
    //         </div>
    //       )}
    //       <button
    //         type="submit"
    //         className="bg-blue-500 text-white rounded-lg px-4 py-2"
    //       >
    //         <FaComment className="inline mr-1" /> Comment
    //       </button>
    //     </form>
    //     {/* Comments List */}
    //     <div>
    //       <p className="text-medium font-semibold mb-2 cursor-pointer">
    //         view comments
    //       </p>
    //       {/* Make an accordion to view comments */}
    //       {data?.post?.comments?.map((comment, index) => (
    //         <div key={index} className="border-b border-gray-300 mb-2 pb-2">
    //           <p className="text-gray-800">{comment.content}</p>
    //           <span className="text-gray-600 text-sm font-semibold">
    //             - {comment.author?.username}
    //           </span>
    //           <small className="text-gray-600 text-sm ml-2">
    //             {new Date(comment.createdAt).toLocaleDateString()}
    //           </small>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </div>

    <div className="!p-0 lg:min-h-page h-full !max-w-[100vw] lg:!max-w-[42.5rem] lg:border-r lg:border-l border-gray-600 px-4 md:px-8 relative z-1 flex w-full flex-col">
      {/* wrapper */}
      <div className="flex flex-col">
        {/* header */}
        <div className="flex flex-row items-center gap-2 fixed z-[125] ml-0 w-full border-b border-r border-gray-600 bg-background-subtle px-6 py-4 lg:left-[unset] top-[unset] lg:!max-w-[42.5rem] opacity-100 md:w-[calc(100vw-theme(space.16))]">
          <form method="dialog" className="w-full">
            <div className="flex w-full">
              <div className="flex items-center mr-auto">
                <Button
                  className="w-10 h-10 p-0 text-slate-400 hover:text-white bg-transparent hover:bg-gray-700 rounded-xl"
                  onClick={() => navigate("/dashboard/all-posts")}
                >
                  <ArrowLeft01Icon className="w-7 h-7 pointer-events-none" />
                </Button>
              </div>
              <div className="flex-1"></div>
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
        {/*Content Start */}
        <div className="flex flex-1 px-4 lg:px-8 max-lg:min-w-full max-lg:min-h-full max-w-full flex-col border-gray-600 bg-color shadow-2 focus:outline-none md:bg-color h-full w-full md:h-auto md:rounded-2xl md:w-[40.75rem] lg:mt-24 max-lg:mt-24 lg:mb-10 lg:mx-auto !bg-color lg:h-auto">
          {/* discription */}
          <div className="relative mb-6 text-slate-300 border-l border-purple-500 pl-4">
            <div className="overflow-hidden">
              <p className="select-text break-words text-lg">
                <span className="pr-1 font-bold text-purple-500">TLDR</span>
                <div
                  dangerouslySetInnerHTML={{ __html: data?.post?.description }}
                />
              </p>
            </div>
          </div>
          {/* category */}
          <div className="relative flex flex-1">
            <div className="rounded-lg border mt-4 bg-background-subtle border-slate-500 py-3 px-2 h-4 flex items-center justify-center text-xs font-bold text-slate-400 my-2">
              #{data?.post?.category?.categoryName}
            </div>
          </div>
          {/* Date of post */}
          <div className="flex items-center mb-2">
            <span className="text-slate-400 text-sm max-w-full shrink truncate">
              {message}
            </span>
            <span className="mx-1 text-gray-400">•</span>
            <div className="text-gray-400 text-xs">
              {data?.post?.createdAt
                ? format(new Date(data?.post?.createdAt), "MMMM d") //For date format "Aug 21"
                : `invalid time`}
            </div>
          </div>
          {/* Thumbnail */}
          <div className="mb-10 block rounded-2xl">
            <div className="relative overflow-hidden">
              <div className="pt-[49%] -z-[1]"></div>
              <img
                src={data?.post?.image?.path}
                alt={data?.post?.image?.description}
                className="absolute block inset-0 w-full h-full m-auto object-cover"
              />
            </div>
          </div>
          {/* #Likes and comments */}
          <div className="mb-5 flex items-center gap-x-4 text-slate-400 text-sm">
            <span>{`${data?.post?.likes?.length || 0} likes`}</span>
            <span>{`${data?.post?.dislikes?.length || 0} dislikes`}</span>
            <span>{`${data?.post?.comments?.length || 0} comments`}</span>
            <span>{`${data?.post?.viewers?.length || 0} views`}</span>
          </div>
          {/* Buttons for activities */}
          <div className="flex items-center rounded-2xl border border-gray-600">
            <div className="flex flex-row gap-2 hover:border-border-subtlest-tertiary relative max-h-cardLarge h-full p-2 rounded-2xl bg-background-subtle border border-gray-600 hover:border-gray-500">
              <div className="flex flex-row items-stretch select-none">
                <Button
                  className="w-10 h-10 p-0 text-slate-400 bg-transparent hover:text-green-400 hover:bg-green-950 rounded-xl"
                  onClick={likePostHandler}
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-7 h-7 pointer-events-none"
                  >
                    <path
                      d="M9.456 4.216l-5.985 7.851c-.456.637-.583 1.402-.371 2.108l.052.155a2.384 2.384 0 002.916 1.443l2.876-.864.578 4.042a2.384 2.384 0 002.36 2.047h.234l.161-.006a2.384 2.384 0 002.2-2.041l.576-4.042 2.877.864a2.384 2.384 0 002.625-3.668L14.63 4.33a3.268 3.268 0 00-5.174-.115zm3.57.613c.16.114.298.253.411.411l5.897 7.736a.884.884 0 01-.973 1.36l-3.563-1.069a.884.884 0 00-1.129.722l-.678 4.75a.884.884 0 01-.875.759h-.234a.884.884 0 01-.875-.76l-.679-4.75a.884.884 0 00-1.128-.72l-3.563 1.068a.884.884 0 01-.973-1.36L10.56 5.24a1.767 1.767 0 012.465-.41z"
                      fill="currentcolor"
                      fill-rule="evenodd"
                    ></path>
                  </svg>
                </Button>
              </div>

              <div className="flex flex-row items-stretch select-none">
                <Button
                  className="w-10 h-10 p-0 text-slate-400 bg-transparent hover:text-red-500 hover:bg-red-950 rounded-xl"
                  onClick={dislikePostHandler}
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-7 h-7 pointer-events-none rotate-180"
                  >
                    <path
                      d="M9.456 4.216l-5.985 7.851c-.456.637-.583 1.402-.371 2.108l.052.155a2.384 2.384 0 002.916 1.443l2.876-.864.578 4.042a2.384 2.384 0 002.36 2.047h.234l.161-.006a2.384 2.384 0 002.2-2.041l.576-4.042 2.877.864a2.384 2.384 0 002.625-3.668L14.63 4.33a3.268 3.268 0 00-5.174-.115zm3.57.613c.16.114.298.253.411.411l5.897 7.736a.884.884 0 01-.973 1.36l-3.563-1.069a.884.884 0 00-1.129.722l-.678 4.75a.884.884 0 01-.875.759h-.234a.884.884 0 01-.875-.76l-.679-4.75a.884.884 0 00-1.128-.72l-3.563 1.068a.884.884 0 01-.973-1.36L10.56 5.24a1.767 1.767 0 012.465-.41z"
                      fill="currentcolor"
                      fill-rule="evenodd"
                    ></path>
                  </svg>
                </Button>
              </div>
            </div>
            {/* comment and view */}
            <div className="flex flex-1 items-center justify-start gap-6 px-4 py-2 text-slate-400">
              <div className="flex flex-row items-stretch select-none hover:text-cyan-400">
                <Button
                  id="comment post"
                  className="w-10 h-10 p-0 text-slate-400 bg-transparent hover:text-cyan-400 hover:bg-cyan-950 rounded-xl"
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-7 h-7 pointer-events-none"
                  >
                    <path
                      d="M8.084 3.217a35.447 35.447 0 017.05-.078l.782.078.279.031c1.089.121 1.885.372 2.606.828a4.516 4.516 0 011.664 1.86c.336.69.5 1.423.53 2.361l.005.321v3.975a4.493 4.493 0 01-3.545 4.392l-.207.04-2.089.346-2.86 2.992-.147.135c-.986.789-2.399.623-3.205-.324-.532-.625-.616-1.34-.51-2.29l.029-.224.038-.254.033-.187-1.332-.189a5.011 5.011 0 01-1.677-.55l-.253-.146-.243-.16a4.777 4.777 0 01-1.491-1.721 4.935 4.935 0 01-.532-1.972l-.009-.3V8.618c0-1.096.162-1.915.535-2.683.375-.77.94-1.4 1.664-1.859.649-.41 1.359-.655 2.288-.788l.318-.04.28-.031zm7.666 1.491a33.948 33.948 0 00-6.752-.075l-.748.075-.28.031c-.915.102-1.481.297-1.97.606a3.016 3.016 0 00-1.116 1.247c-.228.468-.357.989-.38 1.76l-.004.266v3.563c0 .577.134 1.116.375 1.587.242.471.592.874 1.024 1.18.37.263.801.453 1.276.554l.242.043 1.98.283c.339.048.457.096.575.175.119.078.262.187.27.386l-.002.024-.013.08-.164.741-.064.333c-.111.63-.167 1.332.09 1.634.263.309.7.39 1.037.187l.089-.062 2.998-3.135.13-.101.092-.063.077-.04.08-.03.035-.01.087-.02L17 15.545a2.993 2.993 0 002.495-2.77l.005-.182V8.618c0-.921-.13-1.506-.384-2.026A3.016 3.016 0 0018 5.345c-.44-.278-.943-.464-1.706-.572l-.265-.034-.279-.03zm-.55 6.294l.093.005c.398.044.707.36.707.746 0 .38-.301.693-.691.743l-.109.007H8.8l-.093-.005c-.398-.044-.707-.36-.707-.745 0-.38.301-.694.691-.744l.109-.007h6.4zm0-3.5l.093.004c.398.044.707.36.707.746 0 .38-.301.693-.691.743l-.109.007H8.8l-.093-.005C8.309 8.953 8 8.637 8 8.252c0-.38.301-.694.691-.744l.109-.007h6.4z"
                      fill="currentcolor"
                      fill-rule="evenodd"
                    ></path>
                  </svg>
                </Button>
                <label
                  htmlFor="comment post"
                  className="cursor-pointer items-center font-bold text-sm ml-1 hidden lg:flex"
                >
                  Comment
                </label>
              </div>

              {/* Views */}
              <div className="flex flex-row items-stretch select-none hover:text-orange-400">
                <Button
                  id="view post"
                  className="w-10 h-10 p-0 text-slate-400 bg-transparent hover:text-orange-400 hover:bg-orange-950 rounded-xl"
                >
                  <EyeIcon className="w-6 h-6 pointer-events-none" />
                </Button>
                <label
                  htmlFor="view post"
                  className="cursor-pointer items-center font-bold text-sm ml-1 hidden lg:flex"
                >
                  View
                </label>
              </div>
            </div>
            {/* Follow and Unfollow */}
            <div className="flex flex-row items-stretch select-none">
              {isFollowing ? (
                <Button
                  className="rounded-xl mr-2 bg-transparent border border-white text-white"
                  onClick={unFollowUserHandler}
                >
                  Following
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="rounded-xl mr-2"
                  onClick={followUserHandler}
                >
                  Follow
                </Button>
              )}
            </div>
          </div>
          {/* End of activities */}

          {/* form for comment */}
          <form
            className="w-full items-center gap-4 rounded-2xl border-t border-gray-600 bg-blur-highlight p-3 text-sm hover:border-slate-400 hover:bg-gray-700 md:border md:bg-surface-float mt-6 flex"
            onSubmit={formik.handleSubmit}
          >
            {/* Avatar for logged in user*/}
            <img
              src={loggedInUser?.user?.profilePicture}
              alt={`${
                loggedInUser?.user?.username || "User"
              }'s profile picture`}
              className="object-cover w-10 h-10 rounded-lg hidden md:flex"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop if fallback fails
                e.target.src = "https://github.com/shadcn.png";
              }}
            />

            <textarea
              className="flex-1 h-full border-none bg-transparent placeholder:text-slate-400 outline-none text-white m-4"
              rows="1"
              placeholder="Share your comment"
              id="comment post"
              {...formik.getFieldProps("content")}
            ></textarea>
            <Button
              className="rounded-xl bg-transparent border border-white text-white"
              type="submit"
            >
              Share
            </Button>
          </form>

          {/* Comments Wrapper */}
          <div className="flex flex-col mb-12 mt-6 gap-y-4">
            {/* comment card */}
            {data?.post?.comments?.map((commenter, idx) => {
              return (
                <div className="flex flex-col gap-4" key={idx}>
                  <section className="flex scroll-mt-16 flex-col items-stretch rounded-3xl border-gray-600 border">
                    <article className="flex flex-col rounded-3xl p-4 hover:bg-surface-hover focus:outline border-gray-600 hover:bg-gray-700">
                      <header className="z-1 flex w-full flex-row self-start">
                        <img
                          src={commenter?.author?.profilePicture?.path || commenter?.author?.profilePicture}
                          alt={`${
                            commenter?.author?.username || "User"
                          }'s profile picture`}
                          className="object-cover w-10 h-10 rounded-lg"
                          loading="lazy"
                          onError={(e) => {
                            e.target.onerror = null; // Prevent infinite loop if fallback fails
                            e.target.src = "https://github.com/shadcn.png";
                          }}
                        />
                  
                        <div className="ml-3 flex min-w-0 flex-1 flex-col text-sm justify-end">
                          <span className="text-white font-semibold">
                            {commenter?.author?.username}
                          </span>
                          <span className="text-slate-400 max-w-full shrink truncate">
                            {formatDistanceToNow(
                              new Date(commenter?.createdAt)
                            )}{" "}
                            ago
                          </span>
                        </div>
                      </header>
                      <div className="break-words-overflow z-1 mt-3 text-sm">
                        <p className="text-white">{commenter?.content}</p>
                      </div>
                    </article>
                  </section>
                </div>
              );
            })}
          </div>
          {/*Content End */}
        </div>
      </div>
    </div>
  );
};
export default PostDetails;
