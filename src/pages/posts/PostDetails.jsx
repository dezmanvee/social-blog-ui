import { dislikePostAPI, likePostAPI, postAPI } from "../../API/posts/postAPIs";
import {
  userFollowAPI,
  userProfileAPI,
  userUnfollowAPI,
} from "../../API/users/userAPIs";
import { createCommentAPI } from "../../API/comments/commentAPIs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
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

const PostDetails = () => {
  const { postId } = useParams();

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

  //* Get user the made post
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
    //validation
    validationSchema: Yup.object({
      content: Yup.string().required("Comment content is required."),
    }),
    //submit
    onSubmit: (values) => {
      const commentData = {
        content: values.content,
        postId,
      };
      commentMutation
        .mutateAsync(commentData)
        .then(() => {
          refetchPost()
        })
        .catch((e) => console.log(e));
    },
  });

  return (
    <div className="container mx-auto sm:px-64 sm:py-16 p-4">
      <div className="bg-white rounded-lg shadow-lg p-5">
        <div className="relative" style={{ height: 480 }}>
          <img
            src={data?.post?.image?.path}
            alt={data?.post?.description}
            className="w-full h-full object-cover rounded-lg mb-4"
          />
        </div>
        {/* Show messages */}

        <div className="flex gap-4 items-center mb-4">
          {/* like icon */}
          <span
            className="flex items-center gap-1 cursor-pointer"
            onClick={likePostHandler}
          >
            <FaThumbsUp />
            {data?.post?.likes?.length || 0}
          </span>

          {/* Dislike icon */}
          <span
            className="flex items-center gap-1 cursor-pointer"
            onClick={dislikePostHandler}
          >
            <FaThumbsDown />

            {data?.post?.dislikes?.length || 0}
          </span>
          {/* views icon */}
          <span className="flex items-center gap-1">
            <FaEye />
            {data?.post?.viewers?.length || 0}
          </span>
        </div>

        {/* follow icon */}
        {isFollowing ? (
          <button
            onClick={unFollowUserHandler}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-400 hover:bg-red-500 focus:outline-none"
          >
            Unfollow
            <RiUserUnfollowFill className="mr-2" />
          </button>
        ) : (
          <button
            onClick={followUserHandler}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-400 hover:bg-orange-500 focus:outline-none"
          >
            Follow
            <RiUserFollowLine className="ml-2" />
          </button>
        )}

        {/* author */}
        <span className="ml-2">{/* {postData?.author?.username} */}</span>

        {/* post details */}
        <div className="flex justify-between items-center mb-3">
          <div
            className="rendered-html-content mb-2"
            dangerouslySetInnerHTML={{ __html: data?.post?.description }}
          />
        </div>

        {/* Comment Form */}
        <form onSubmit={formik.handleSubmit}>
          <textarea
            className="w-full border border-gray-300 p-2 rounded-lg mb-2"
            rows="3"
            placeholder="Add a comment..."
            // value={comment}
            {...formik.getFieldProps("content")}
          ></textarea>
          {/* comment error */}
          {formik.touched.content && formik.errors.content && (
            <div className="text-red-500 mb-4 mt-1">
              {formik.errors.content}
            </div>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg px-4 py-2"
          >
            <FaComment className="inline mr-1" /> Comment
          </button>
        </form>
        {/* Comments List */}
        <div>
          <p className="text-medium font-semibold mb-2 cursor-pointer">
            view comments
          </p>
          {/* Make an accordion to view comments */}
          {data?.post?.comments?.map((comment, index) => (
            <div key={index} className="border-b border-gray-300 mb-2 pb-2">
              <p className="text-gray-800">{comment.content}</p>
              <span className="text-gray-600 text-sm font-semibold">
                - {comment.author?.username}
              </span>
              <small className="text-gray-600 text-sm ml-2">
                {new Date(comment.createdAt).toLocaleDateString()}
              </small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default PostDetails;
