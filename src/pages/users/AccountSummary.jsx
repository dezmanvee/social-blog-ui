import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { authUserStatusAPI } from "../../API/users/userAPIs";
import { isAuthenticated } from "../../redux/features/user/authSlice";
import { Button } from "../../components/ui/button";
import { ArrowRight04Icon, EyeIcon } from "hugeicons-react";
import SuccessAlert from "../../components/alerts/SuccessAlert";
import DangerAlert from "../../components/alerts/DangerAlert";
import LoadingAlert from "../../components/alerts/LoadingAlert";
import { Link, useNavigate } from "react-router-dom";
import Like from "../../components/svg/Like";
import { PiUsersFour, PiUsersThree } from "react-icons/pi";
import Comment from "../../components/svg/Comment";
import FireIcon from "../../components/svg/FireIcon";
import {
  generateEmailTokenAPI,
  userProfileAPI,
} from "../../API/users/userAPIs";
import Dislike from "../../components/svg/Dislike";
import { format } from "date-fns";

const AccountSummary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { data: authStatusData } = useQuery({
    queryKey: ["auth-user-status"],
    queryFn: authUserStatusAPI,
  });

  const { data, error, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["user-profile"],
    queryFn: userProfileAPI,
  });

  const generateEmailTokenMutation = useMutation({
    mutationKey: ["generate-email-token"],
    mutationFn: generateEmailTokenAPI,
  });

  const {
    isError: isErrorEmail,
    isPending: isPendingEmail,
    isSuccess: isSuccessEmail,
    error: errorEmail,
    data: dataEmail,
  } = generateEmailTokenMutation;

  const handleSendVerificationEmail = () => {
    generateEmailTokenMutation.mutate();
  };

  useEffect(() => {
    if (isErrorEmail) {
      setShowError(true);

      // Set a timeout to hide the error after 5 seconds
      const timer = setTimeout(() => {
        setShowError(false);
      }, 5000);

      // Clean up the timer on unmount or when isError changes
      return () => clearTimeout(timer);
    }
  }, [isErrorEmail]);

  // Handle success state
  useEffect(() => {
    if (isSuccessEmail) {
      setShowSuccess(true);

      // Set a timeout to hide the success message after 5 seconds
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isSuccessEmail]);

  //Dispatching actions
  useEffect(() => {
    dispatch(isAuthenticated(authStatusData));
  }, [authStatusData]);

  const handleCopyLink = () => {
    const urlText = "http://localhost:3000/"; // The devware URL to copy

    // Copy the link to the clipboard
    navigator.clipboard.writeText(urlText).then(() => {
      // Show the alert
      setShowAlert(true);

      // Hide the alert after 3 seconds
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    });
  };

  //check if user has email

  const hasEmail = data?.user?.email;

  //check if user has plan

  const hasPlan = data?.user?.hasSelectedPlan;
  //check if user has verified account
  const isEmailVerified = data?.user?.isEmailVerified;

  //total followers
  const totalFollowers = data?.user?.followers.length;

  //total following
  const totalFollowing = data?.user?.following.length;

  //get user posts

  const userPosts = data?.user?.posts.length;

  //calculate total views, likes, dislikes, comments
  let totalViews = 0;
  let totalLikes = 0;
  let totalComments = 0;
  let totalDislikes = 0;

  //Iterate through the all postss and get each property and add
  data?.user?.posts?.forEach((post) => {
    totalViews += post?.viewers.length;
    totalLikes += post?.likes?.length;
    totalDislikes += post?.dislikes?.length;
    totalComments += post?.comments?.length;
  });

  //Calculate the  gross earnings of a user of all posts
  const totalEarnings = data?.user?.posts?.reduce(
    (acc, currPost) => acc + currPost?.totalEarnings,
    0
  );

  // Account Stats Data
  const stats = [
    {
      icon: <FireIcon className="w-5 h-5 text-purple-400" />,
      label: "Posts",
      value: userPosts || 0,
    },
    {
      icon: <EyeIcon className="w-4 h-4 text-purple-500" />,
      label: "Views",
      value: totalViews,
    },
    {
      icon: <Comment className="w-5 h-5 text-blue-300" />,
      label: "Comments",
      value: totalComments,
    },
  ];

  const categories = [
    {
      name: "Finance",
      percentage: "37%",
    },
    {
      name: "Backend",
      percentage: "15%",
    },
    {
      name: "Software Dev.",
      percentage: "35%",
    },
    {
      name: "Dev Ops",
      percentage: "50%",
    },
    {
      name: "React",
      percentage: "10%",
    },
  ];
  return (
    <div className="relative m-auto flex w-full max-w-screen-lg flex-col pb-12 md:pb-0 lg:min-h-full lg:flex-row lg:border-gray-600 lg:pb-6 xl:pb-0">
      {/* display account verification status */}
      {isPendingEmail ? (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-[200]">
          <LoadingAlert
            loading="Loading"
            loadingMsg="Hang tight! We're getting things ready for you..."
          />
        </div>
      ) : showError ? (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-[200]">
          <DangerAlert
            error="Error"
            errorMsg={
              errorEmail?.message || errorEmail?.response?.data?.message
            }
          />
        </div>
      ) : showSuccess ? (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-[200]">
          <SuccessAlert success="Success" successMsg={dataEmail?.message} />
        </div>
      ) : null}
      {/* show alert for copied link */}
      {showAlert && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-[200]">
          <SuccessAlert successMsg="Invite link copied to clipboard!" />
        </div>
      )}
      <article className="!p-0 lg:min-h-page h-[100vh] lg:ml-1 !max-w-[100vw] lg:!max-w-[42.5rem] lg:border-r lg:border-l border-gray-600 px-4 md:px-8 relative z-1 flex w-full flex-col">
        <div className="flex flex-col">
          <header className="flex flex-row px-1 border-b border-gray-600 bg-color md:bg-[unset]">
            <ul className="relative flex flex-row">
              <button className="relative p-2 py-4 text-center font-bold text-base ">
                <span className="inline rounded-xl px-3 py-1.5 bg-theme-active text-white">
                  Summary
                </span>
              </button>
              <div
                className="absolute bottom-0 mx-auto h-0.5 w-12 -translate-x-1/2 rounded-4 bg-white transition-[left] ease-linear"
                style={{ left: "53.4896px" }}
              />
            </ul>
          </header>

          {/* !Our account summary in a grand style */}
          <div className="flex flex-col gap-6 px-4 md:px-6">
            {/* Account verification wrapper */}
            <div className="flex flex-col gap-6 py-6">
              {/* choose a plan */}
              {!hasPlan && (
                <div className="relative flex rounded-2xl flex-row items-center TextField_field__sbF77 pr-3 h-12 readOnly px-4 overflow-hidden bg-surface-float border-transparent border-l-4 border-yellow-300 cursor-text fields_field__Mnwg4">
                  <p className="text-slate-300">
                    Kindly{" "}
                    <Link to="/dashboard/subscription" className="underline">
                      select a plan
                    </Link>{" "}
                    to continue enjoying devware.
                  </p>
                </div>
              )}
              {/* Add Email */}
              {!hasEmail && (
                <div className="relative flex rounded-2xl flex-row items-center TextField_field__sbF77 pr-3 h-12 readOnly px-4 overflow-hidden bg-surface-float  border-l-4 border-blue-300 cursor-text fields_field__Mnwg4">
                  <p className="text-slate-300">
                    Kindly{" "}
                    <Link
                      to="/dashboard/update-account-email"
                      className="underline"
                    >
                      add an email
                    </Link>{" "}
                    for important notifications.
                  </p>
                </div>
              )}
              {/* Verify email address */}
              {!isEmailVerified && (
                <div className="relative flex rounded-2xl flex-row items-center TextField_field__sbF77 pr-3 h-12 readOnly px-4 overflow-hidden bg-surface-float border-l-4 border-teal-300 cursor-text fields_field__Mnwg4">
                  <p className="text-slate-300">
                    Kindly{" "}
                    <button
                      role="alert"
                      className="underline"
                      onClick={handleSendVerificationEmail}
                    >
                      verify your account
                    </button>{" "}
                    to continue enjoying devware.
                  </p>
                </div>
              )}

              {/* Account Settings */}
              {hasPlan && isEmailVerified && hasEmail ? (
                <span className="flex flex-1 items-center flex-row">
                  <span className="mr-auto flex w-full flex-row gap-3 border-gray-800 pr-3 lg:w-auto">
                    <Link
                      to="/dashboard/account/account/profile/profile"
                      className="flex items-center h-10 px-5 rounded-lg mr-auto bg-background-subtle hover:bg-theme-active text-slate-400 hover:text-white"
                    >
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        class="pointer-events-none !h-6 !w-6 text-base -ml-2 mr-1"
                      >
                        <path
                          d="M16.5 12a3 3 0 013 3v1.5a3 3 0 01-3 3H15a3 3 0 01-3-3H5.25a.75.75 0 110-1.5H12a3 3 0 013-3h1.5zm0 1.5H15a1.5 1.5 0 00-1.493 1.356L13.5 15v1.5a1.5 1.5 0 001.356 1.493L15 18h1.5a1.5 1.5 0 001.493-1.356L18 16.5V15a1.5 1.5 0 00-1.356-1.493L16.5 13.5zM9 4.5a3 3 0 013 3h6.75a.75.75 0 110 1.5H12a3 3 0 01-3 3H7.5a3 3 0 01-3-3V7.5a3 3 0 013-3H9zM7.5 6a1.5 1.5 0 00-1.493 1.356L6 7.5V9a1.5 1.5 0 001.356 1.493l.144.007H9a1.5 1.5 0 001.493-1.356L10.5 9V7.5a1.5 1.5 0 00-1.356-1.493L9 6H7.5z"
                          fill="currentcolor"
                          fill-rule="evenodd"
                        ></path>
                      </svg>
                      Account settings
                    </Link>
                  </span>
                </span>
              ) : null}
            </div>
            {/* short discription */}
            <p className="text-slate-400">
              Here's an overview of your account details along with some of the
              most popular categories that other users are exploring!
            </p>
            {/* Account summary */}
            <section className="flex flex-col">
              <h2 className="flex items-center mb-4 font-bold text-base">
                <span className="flex flex-col">
                  <span className="flex align-middle text-white">
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-6 h-6 pointer-events-none mr-2"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm1.09-18.665l-.603-.77a.698.698 0 00-1.14.031c-1.12 1.635-.986 3.612-.206 5.09l.332.634.275.54.22.444.115.244.09.202.074.199c.192.6.134 1.221-.163 1.747-.449.78-1.178.963-1.864.845-1.123-.193-1.463-1.473-1.566-2.947l-.022-.388-.013-.394-.009-.593-.001-.585-.004-.136c-.037-.686-.377-.694-1.017-.025-1.796 1.875-2.099 4.749-.753 7.175 1.01 1.85 3.058 3.067 5.152 3.067.088 0 .178-.003.27-.007 2.166-.11 4.255-1.544 5.183-3.56a5.99 5.99 0 00.468-3.566c-.283-1.556-1.096-2.587-2.18-3.96a112.52 112.52 0 01-.392-.499l-.526-.663-.839-1.032-.88-1.093z"
                        fill="#FC538D"
                      ></path>
                    </svg>
                    Your Post Performance Insights
                  </span>
                </span>
              </h2>
              <div className="flex flex-wrap items-center justify-start max-sm:justify-center gap-5">
                {stats?.map((stat) => {
                  return (
                    <div
                      key={stat?.label}
                      className="relative flex gap-4 w-40 flex-col rounded-2xl border border-b-[3px] bg-surface-float border-gray-700 p-3 border-b-slate-300"
                    >
                      <div className="flex items-center flex-1 text-emerald-400">
                        <span className="font-bold h-7 w-7 p-0 rounded-lg bg-transparent">
                          {stat?.icon}
                        </span>
                      </div>
                      <h3 className="flex items-center gap-4 font-semibold text-slate-300 text-sm">
                        <span>{stat?.label}</span>
                        <ArrowRight04Icon />
                        <span>{stat?.value}</span>
                      </h3>
                    </div>
                  );
                })}
              </div>
            </section>
            {/* Top Categories of posts */}
            <section className="flex flex-col">
              <h2 className="flex items-center mb-4 text-white font-bold">
                <span className="flex flex-col">
                  <span className="align-middle flex">
                    Top categories based on people's interest{" "}
                  </span>
                  <span className="flex flex-row mt-1 text-slate-400 text-xs font-normal">
                    Join other users in exploring these trending topics and
                    categories!{" "}
                    <Link
                      to="/dashboard/create-post/create-post"
                      className="text-blue-400 ml-1"
                    >
                      add post
                    </Link>
                  </span>
                </span>
              </h2>
              {/* category wrapper */}
              <div className="grid max-w-[17rem] grid-cols-1 gap-3 md:max-w-full md:grid-cols-2 md:gap-x-10">
                {categories?.map((category) => {
                  return (
                    <div
                      key={category?.name}
                      className="relative flex flex-row overflow-hidden rounded-xl border border-gray-800 p-1 px-3 pb-2 font-bold text-slate-400 text-sm"
                    >
                      #{category?.name}
                      <span className="ml-auto text-white">
                        {category?.percentage}
                      </span>
                      <div
                        className="absolute bottom-0 left-0 h-1 overflow-hidden rounded-lg bg-white"
                        style={{ width: `${category?.percentage}` }}
                      ></div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      </article>
      <aside className="hidden !px-0 lg:flex lg:max-w-[21.25rem] flex-col gap-6 px-4 w-full max-w-full border-r border-gray-600">
        <div className="my-4 flex flex-col gap-6 lg:my-0 w-full">
          <header className="flex h-12 items-center px-4 -mb-2">
            <h2 className="font-bold text-base text-white">Profile</h2>
            <div className="flex items-center flex-1">
              <Button
                className="h-8 px-3 rounded-lg bg-background-subtle text-slate-400 hover:text-white hover:bg-gray-700 ml-auto mr-2 hidden lg:flex"
                onClick={() => navigate("/dashboard/account/account/profile/profile")}
              >
                Edit profile
              </Button>
            </div>
            <Button
              className="h-8 !px-1 rounded-lg bg-background-subtle text-slate-400 hover:text-white hover:bg-gray-700 ml-auto mr-2 hidden lg:flex"
              onClick={() => navigate("/dashboard/all-posts/all-posts")}
            >
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
          </header>
          {/* Image container */}
          <div className="relative flex h-24 mx-4">
            <div className="absolute left-0 top-0 -z-1 size-full rounded-2xl bg-background-subtle border-4 border-[#0e1217]">
              <img
                src={
                  data?.user?.profilePicture ||
                  data?.user?.profilePicture?.path ||
                  "https://github.com/shadcn.png"
                }
                alt={`${data?.user?.username || "User"}'s profile`}
                className="object-cover w-24 h-full rounded-2xl"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite loop if fallback also fails
                  e.target.src =
                    data?.user?.profilePicture?.path ||
                    "https://github.com/shadcn.png";
                }}
              />
            </div>
          </div>
          {/* Name and stat container*/}
          <div className="relative flex flex-col gap-6 px-4 text-slate-400">
            <div className="flex flex-col items-start">
              <h2 className="max-w-full shrink truncate font-bold text-white text-lg">
                {data?.user?.username}
              </h2>
              {/* @Profile name and date joined */}
              <div className="flex items-center">
                <span className="text-slate-400 text-xs max-w-full shrink truncate">
                  @{data?.user?.username}
                </span>
                <span className="mx-1 text-gray-400">•</span>
                <div className="text-gray-400 text-xs">
                  Joined&nbsp;
                  {data?.user?.createdAt
                    ? format(new Date(data?.user?.createdAt), "MMMM d yyyy") //For date format "Aug 21 2024"
                    : `invalid time`}
                </div>
              </div>
            </div>
            {/* Stat */}
            <div className="flex text-slate-400 flex-wrap text-xs gap-2">
              <div className="flex items-center gap-1 text-xs">
                <b className="text-white">{userPosts}</b>
                <span className="capitalize">posts</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <b className="text-white">{totalViews}</b>
                <span className="capitalize">views</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <b className="text-white">$ {totalEarnings}</b>
                <span className="capitalize">earnings</span>
              </div>
            </div>
            {/* Update bio */}
            <div className="flex items-center">
              <Button
                className="font-bold h-8 px-3 rounded-xl bg-transparent border border-white text-white hover:bg-background-subtle"
                onClick={() => navigate("/dashboard/account/account/profile/profile")}
              >
                Update bio
              </Button>
              <div className="flex-1"></div>
            </div>
          </div>
          {/* Invite friends */}
          <div className="flex-col px-4 hidden lg:flex">
            <h3 className="mb-2 font-bold text-base text-white">
              Invite friends
            </h3>
            <p className="text-sm text-slate-400">
              Invite others to experience the sleek and seamless Devware
              platform, where they can effortlessly share their thoughts.
            </p>
            <div className="flex flex-col items-stretch my-5">
              <div className="relative flex rounded-2xl flex-row items-center TextField_field__sbF77 pr-3 h-12 readOnly px-4 overflow-hidden bg-surface-float border border-transparent border-l-[3px] hover:border-white hover:border-y-slate-600 hover:border-r-slate-600 cursor-text fields_field__Mnwg4">
                <div className="flex max-w-full flex-1 justify-between items-center mr-2">
                  <p className="flex flex-1 text-ellipsis text-xs text-white min-w-0 bg-transparent">
                    Your unique invite URL
                  </p>
                  <Button
                    variant="outline"
                    className="text-xs justify-center font-bold h-8 px-3 rounded-xl"
                    onClick={handleCopyLink}
                  >
                    Copy link
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default AccountSummary;
