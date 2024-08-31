import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  DashboardSquareSettingIcon,
  DashboardCircleSettingsIcon,
  SwimmingIcon,
  Logout03Icon,
  PlusSignIcon,
  Note01Icon,
  UserSettings01Icon,
} from "hugeicons-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAPI } from "../../API/users/userAPIs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { logout } from "../../redux/features/user/authSlice";
import { allNotificationsAPI } from "../../API/notifications/notificationAPIs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import InviteFriend from "../svg/InviteFriend";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { allPostsAPI } from "../../API/posts/postAPIs";

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

const PublicNavbar = () => {
  const navigate = useNavigate();
  const { authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Fetch all personal posts
  const { data: postData } = useQuery({
    queryKey: ["post-list"],
    queryFn: allPostsAPI,
  });

  // Notification
  const { data, refetch } = useQuery({
    queryKey: ["notification-list"],
    queryFn: allNotificationsAPI,
  });

  const unreadNotifications = data?.allNotifications?.filter(
    (notification) => notification.isRead === false
  );

  //logout
  const logoutMutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: logoutAPI,
  });

  const logoutHandler = async () => {
    logoutMutation
      .mutateAsync()
      .then(() => {
        // dispatch logout action
        dispatch(logout(null));
        // redirect
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    // <Disclosure as="nav" className="bg-teal-50 shadow z-50">
    //   {({ open }) => (
    //     <>
    //       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    //         <div className="flex h-16 justify-between">
    //           <div className="flex">
    //             <div className="-ml-2 mr-2 flex items-center md:hidden">
    //               <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-teal-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500">
    //                 <span className="absolute -inset-0.5" />
    //                 <span className="sr-only">Open main menu</span>
    //                 {open ? (
    //                   <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
    //                 ) : (
    //                   <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
    //                 )}
    //               </Disclosure.Button>
    //             </div>
    //             <div
    //               className="flex flex-shrink-0 items-center"
    //               onClick={() => navigate("/")}
    //             >
    //               {/* Logo */}
    //               <SwimmingIcon className="h-8 w-auto text-orange-500" />
    //               <span className="text-teal-700 text-xl font-bold self-end animate-pulse">
    //                 Blog
    //               </span>
    //             </div>
    //             {/* large screens */}
    //           </div>
    //           <div className="hidden md:ml-6 md:flex md:space-x-8">
    //             {authUser ? null : (
    //               <Link
    //                 to="/"
    //                 className="inline-flex items-center border-b-2 border-transparent focus:border-orange-500 px-1 pt-1 text-sm font-medium hover:text-gray-700 focus:text-gray-900"
    //               >
    //                 Home
    //               </Link>
    //             )}
    //             <Link
    //               to="/dashboard/all-posts"
    //               className="inline-flex items-center text-sm font-medium border-b-2 border-transparent focus:border-orange-500 px-1 pt-1 text-gray-500 hover:border-gray-300 hover:text-gray-700 focus:text-gray-900"
    //             >
    //               Latest Posts
    //             </Link>
    //             <Link
    //               to="/ranking"
    //               className="inline-flex items-center border-b-2 border-transparent focus:border-orange-500 px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 focus:text-gray-900"
    //             >
    //               Creator's Ranking
    //             </Link>
    //             <Link
    //               to="/pricing"
    //               className="inline-flex items-center border-b-2 border-transparent focus:border-orange-500 px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 focus:text-gray-900"
    //             >
    //               Pricing
    //             </Link>
    //             {authUser ? null : (
    //               <Link
    //                 to="/register"
    //                 className="inline-flex items-center border-b-2 border-transparent focus:border-orange-500 px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 focus:text-gray-900"
    //               >
    //                 Create Account
    //               </Link>
    //             )}
    //           </div>
    //           {/* Right-Hand-Container */}
    //           <div className="flex items-center">

    //             <div className="flex-shrink-0">
    //               {authUser ? (
    //                 <div className="flex items-center justify-center gap-2">
    //                   <div className="relative inline-flex items-center justify-center rounded-md border-2 border-teal-700 p-0.5">
    //                     <Link
    //                       to="/dashboard"
    //                       className="relative inline-flex items-center justify-center gap-x-1.5 rounded-sm bg-teal-700 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-teal-700 border-2 border-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
    //                     >
    //                       <DashboardSquare02Icon size="16" />
    //                       Dashboard
    //                     </Link>
    //                   </div>
    //                   <NotificationCounts />
    //                   <button
    //                     onClick={logoutHandler}
    //                     type="button"
    //                     className="relative m-2 inline-flex items-center gap-x-1.5 rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
    //                   >
    //                     <Logout03Icon className="h-5 w-5" aria-hidden="true" />
    //                   </button>
    //                 </div>
    //               ) : (
    //                 <div className="relative inline-flex items-center justify-center rounded-md border-2 border-orange-500 p-0.5">
    //                   <Link
    //                     to="/register"
    //                     className="relative inline-flex items-center justify-center gap-x-1.5 rounded-sm bg-orange-500 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-teal-50 hover:text-orange-500 border-2 border-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
    //                   >
    //                     {/* <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" /> */}
    //                     Create post
    //                   </Link>
    //                 </div>
    //               )}
    //             </div>

    //             <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
    //               <button
    //                 type="button"
    //                 className="relative rounded-full bg-teal-50 p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
    //               >
    //                 <span className="absolute -inset-1.5" />
    //               </button>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       {/* small screens */}
    //       <Disclosure.Panel className="md:hidden">
    //         <div className="space-y-1 pt-2">
    //           {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}

    //           {!authUser && (
    //             <Disclosure.Button
    //               as="a"
    //               href="/"
    //               className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-teal-500 hover:bg-teal-100 hover:text-gray-700 sm:pl-5 sm:pr-6"
    //             >
    //               Home
    //             </Disclosure.Button>
    //           )}
    //           <Disclosure.Button
    //             as="a"
    //             href="/posts"
    //             className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-teal-500 hover:bg-teal-100 hover:text-gray-700 sm:pl-5 sm:pr-6"
    //           >
    //             Latest Posts
    //           </Disclosure.Button>
    //           <Disclosure.Button
    //             as="a"
    //             href="/ranking"
    //             className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-teal-500 hover:bg-teal-100 hover:text-gray-700 sm:pl-5 sm:pr-6"
    //           >
    //             Creator's Ranking
    //           </Disclosure.Button>
    //           <Disclosure.Button
    //             as="a"
    //             href="#"
    //             className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-teal-500 hover:bg-teal-100 hover:text-gray-700 sm:pl-5 sm:pr-6"
    //           >
    //             Pricing
    //           </Disclosure.Button>
    //           <Disclosure.Button
    //             as="a"
    //             href="/pricing"
    //             className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-teal-500 hover:bg-teal-100 hover:text-gray-700 sm:pl-5 sm:pr-6"
    //           >
    //             Create Account
    //           </Disclosure.Button>
    //         </div>
    //       </Disclosure.Panel>
    //     </>
    //   )}
    // </Disclosure>
    <header className="sticky top-0 left-0 right-0 z-50 flex flex-row items-center justify-between gap-3 h-14 border-b border-gray-600 px-4 py-3 md:px-8  lg:h-16 lg:px-4 xl:grid xl:auto-cols-fr xl:grid-flow-col bg-color">
      {/* Logo */}
      <div className="flex lg:flex-none justify-start">
        <Link to="/" className="flex items-center mt-0.5" aria-label="Home">
          <SwimmingIcon className="h-8 w-auto text-slate-300" />
          <div className="text-white text-2xl font-bold">
            <span>Dev</span>
            <span className="text-gray-400 text-xl font-semibold">ware</span>
          </div>
        </Link>
      </div>
      <div className="flex-1 h-8"></div>

      {/* Profile Wrapper*/}
      <div className="flex justify-end gap-3">
        {/* Add post */}
        <Button
          aria-label="New Post"
          variant="outline"
          className="w-10 h-10 p-0 rounded-xl hidden lg:flex"
          onClick={() => navigate("/dashboard/create-post")}
        >
          <PlusSignIcon className="text-lg" />
        </Button>

        {/* Notification */}
        <div
          className="relative hidden md:flex"
          aria-label="Notifications"
          onClick={() =>
            navigate("/dashboard/account/notifications/notifications")
          }
        >
          <Button className="w-10 h-10 p-0 rounded-xl text-slate-400 hover:text-white bg-surface-float hover:bg-gray-700">
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              class="w-7 h-7 pointer-events-none"
            >
              <path
                d="M12 3a2.312 2.312 0 012.25 2.847 6.39 6.39 0 014.106 5.491l.015.264.004.21v2.226l.072.022c.803.28 1.405.988 1.53 1.852l.018.175.005.158c0 1.224-.95 2.226-2.154 2.307l-.159.006-2.046-.001-.013.033a3.94 3.94 0 01-3.216 2.384l-.21.016-.202.005a3.926 3.926 0 01-3.536-2.22l-.083-.183-.015-.035H6.313c-1.171 0-2.139-.87-2.292-1.998l-.016-.156L4 16.245c0-.903.52-1.693 1.325-2.076l.165-.071.135-.048v-2.238A6.377 6.377 0 019.75 5.846 2.312 2.312 0 0112 3zm0 3.938c-.437 0-.86.057-1.262.165l-.148.042a4.876 4.876 0 00-3.46 4.441l-.005.226v2.808c0 .414-.31.756-.71.806l-.197.012a.813.813 0 00-.007 1.613l.101.007h3.25l.005.143a2.438 2.438 0 002.272 2.289l.161.005.16-.005a2.438 2.438 0 002.272-2.265l.005-.168h3.25l.102-.006a.813.813 0 000-1.612l-.196-.012a.813.813 0 01-.712-.704l-.006-.103v-2.807l-.003-.183a4.878 4.878 0 00-3.461-4.485l-.143-.041A4.881 4.881 0 0012 6.937zM12 4.5a.812.812 0 10.788 1.013l.018-.099.007-.101A.812.812 0 0012 4.5z"
                fill="currentcolor"
                fill-rule="evenodd"
              ></path>
            </svg>
          </Button>
          {unreadNotifications?.length > 0 ? (
            <span className="-right-1.5 -top-1.5 cursor-pointer px-1 absolute flex justify-center items-center min-w-[1.25rem] min-h-[1.25rem] font-normal text-white rounded-lg bg-accent-cabbage-default text-[14px]">
              {unreadNotifications?.length}
            </span>
          ) : null}
        </div>

        {/* Leaderboard, totalNumber of personal post & Profile pix */}
        <div className="flex h-10 items-center rounded-xl bg-surface-float px-1">
          {/* Personal posts */}
          <Button
            className="h-8 px-3 rounded-lg text-[#FC538D] text-base gap-1 hover:bg-gray-700 bg-transparent"
            onClick={() => navigate("/dashboard/posts")}
          >
            {postData?.allPosts?.length > 0 ? (
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 pointer-events-none"
              >
                <path
                  d="M15.138 5.624l-.873-1.054-.576-.717a2.24 2.24 0 00-3.592.099l-.15.223c-.667 1.057-.972 1.94-.942 3.219l.009.215-.028-.01c-.745-.235-1.706.106-2.467.878-2.278 2.315-2.659 5.847-.988 8.78 1.273 2.267 3.82 3.741 6.456 3.741.113 0 .227-.002.343-.008 2.72-.134 5.302-1.86 6.466-4.321a7.182 7.182 0 00.586-4.389c-.337-1.805-1.209-2.923-2.868-4.992l-.532-.652-.844-1.012zm-2.654-.82l.6.745.876 1.058.834.999.523.641c1.27 1.585 2.243 2.633 2.557 4.315a5.655 5.655 0 01-.465 3.451c-.922 1.95-3 3.339-5.154 3.445-.09.004-.18.006-.268.006-2.083 0-4.118-1.176-5.123-2.967-1.338-2.348-1.037-5.129.748-6.943.638-.648.975-.64 1.013.023l.003.132.001.566.009.574.013.381.022.376c.102 1.426.44 2.665 1.557 2.852.682.114 1.407-.064 1.853-.818.295-.509.353-1.11.163-1.69l-.073-.193-.09-.195-.115-.236-.218-.431-.275-.522-.33-.614c-.775-1.43-.908-3.343.206-4.925a.707.707 0 011.133-.03z"
                  fill="currentcolor"
                  fill-rule="evenodd"
                ></path>
              </svg>
            ) : (
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 pointer-events-none !h-6 !w-6 text-base -ml-2 mr-1"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M23.772 14.342a12.062 12.062 0 000-4.684l-.49.097-.491.097a11.056 11.056 0 010 4.296l.49.097.49.097zm-1.793 4.325l-.416-.278-.415-.278a11.066 11.066 0 01-3.037 3.037l.278.415.278.416a12.066 12.066 0 003.312-3.312zm-7.637 5.105l-.097-.49-.097-.491a11.057 11.057 0 01-4.296 0l-.097.49-.097.49a12.062 12.062 0 004.684 0zm-9.01-1.793l.279-.416.278-.415a11.066 11.066 0 01-3.037-3.037l-.415.278-.416.278a12.066 12.066 0 003.312 3.312zM.229 14.342a12.058 12.058 0 010-4.684l.49.097.491.097a11.059 11.059 0 000 4.296l-.49.097-.49.097zm1.793-9.01l.416.279.415.278A11.066 11.066 0 015.89 2.852l-.278-.415-.278-.416A12.066 12.066 0 002.02 5.333zM9.658.229l.097.49.097.491a11.059 11.059 0 014.296 0l.097-.49.097-.49a12.058 12.058 0 00-4.684 0zm9.01 1.793l-.279.416-.278.415c1.2.804 2.233 1.837 3.037 3.037l.415-.278.416-.278a12.066 12.066 0 00-3.312-3.312z"
                  fill="#FC538D"
                ></path>
              </svg>
            )}
            <span className="font-bold">{postData?.allPosts?.length || 0}</span>
          </Button>
          {/* totalNumber of personal post */}
          <Button className="text-base gap-2 p-0 flex md:hidden lg:flex text-white hover:bg-gray-700 bg-transparent">
            <div className="flex items-center">
              <span
                className="flex items-center font-bold capitalize text-bold md:gap-0.5 md:text-xs ml-1 !text-base text-white"
                onClick={() => navigate("/dashboard/account/profile/profile")}
              >
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6 pointer-events-none text-purple-500"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8 13.605A5.333 5.333 0 108 2.938a5.333 5.333 0 000 10.667zm1.213-8.672a.494.494 0 00-.812-.517L4.944 7.922a.494.494 0 00.35.843H7.82l-1.034 2.844a.494.494 0 00.812.518l3.456-3.507a.494.494 0 00-.348-.842H8.179l1.034-2.845z"
                    fill="currentcolor"
                  ></path>
                </svg>
                <span>10</span>
              </span>
            </div>
            {/* Account Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <img
                  src={authUser?.profilePicture}
                  alt={`${authUser?.username || "User"}'s profile`}
                  className="object-cover w-8 h-8 rounded-lg"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop if fallback also fails
                    e.target.src =
                      authUser?.profilePicture?.path ||
                      "https://github.com/shadcn.png";
                  }}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="z-[160] overflow-hidden rounded-2xl bg-background-subtle shadow-2 w-full min-w-[230px] max-w-64 border border-slate-500 pb-4">
                {/* Image container */}
                <div className="relative flex h-24">
                  <div className="absolute left-0 top-0 -z-1 size-full rounded-2xl bg-background-subtle border-4 border-[#0e1217]">
                    <img
                      src={authUser?.profilePicture}
                      alt={`${authUser?.username || "User"}'s profile`}
                      className="object-cover w-24 h-full rounded-2xl"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null; // Prevent infinite loop if fallback also fails
                        e.target.src =
                          authUser?.profilePicture?.path ||
                          "https://github.com/shadcn.png";
                      }}
                    />
                  </div>
                </div>
                {/* Profile name and #nos of personal post */}
                <div className="flex flex-col border-b border-slate-500 gap-3 p-4 mb-2">
                  <div className="flex items-center">
                    <h2 className="max-w-full shrink truncate font-bold text-white text-lg">
                      {authUser?.username}
                    </h2>
                    {/* personal post */}
                    <div className="flex items-center">
                      <span className="flex items-center font-bold capitalize text-bold md:gap-0.5 md:text-xs ml-1 !text-base text-white">
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 16 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          class="w-6 h-6 pointer-events-none text-purple-500"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M8 13.605A5.333 5.333 0 108 2.938a5.333 5.333 0 000 10.667zm1.213-8.672a.494.494 0 00-.812-.517L4.944 7.922a.494.494 0 00.35.843H7.82l-1.034 2.844a.494.494 0 00.812.518l3.456-3.507a.494.494 0 00-.348-.842H8.179l1.034-2.845z"
                            fill="currentcolor"
                          ></path>
                        </svg>
                        <span>10</span>
                      </span>
                    </div>
                    {/* @Profile name and date joined */}
                  </div>
                  <div className="flex items-center">
                    <span className="text-slate-400 text-sm max-w-full shrink truncate">
                      @{authUser?.username}
                    </span>
                    <span className="mx-1 text-gray-400">•</span>
                    <div className="text-gray-400 text-xs">
                      Joined&nbsp;{" "}
                      {authUser?.createdAt
                        ? format(new Date(authUser?.createdAt), "MMMM d") //For date format "Aug 21"
                        : `invalid time`}
                    </div>
                  </div>
                </div>

                <Link to="/dashboard/account/summary">
                  <DropdownMenuItem>
                    <DashboardSquareSettingIcon className="w-5 h-5 ml-1 mr-1 pointer-events-none text-base" />
                    Account summary
                  </DropdownMenuItem>
                </Link>
                <Link to="/dashboard/account/profile/profile">
                  <DropdownMenuItem>
                    <UserSettings01Icon className="w-5 h-5 ml-1 mr-1 pointer-events-none text-base" />
                    Profile
                  </DropdownMenuItem>
                </Link>
                <Link to="/dashboard/account/invite/invite">
                  <DropdownMenuItem>
                    <InviteFriend />
                    Invite friends
                  </DropdownMenuItem>
                </Link>
                <Link to="/dashboard/account/feedback/feedback">
                  <DropdownMenuItem>
                    <Note01Icon className="w-5 h-5 ml-1 mr-1 pointer-events-none text-base" />
                    Feedback
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={logoutHandler}>
                  <Logout03Icon className="w-5 h-5 ml-1 mr-1 pointer-events-none text-base" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Button>
        </div>
      </div>
    </header>
  );
};
export default PublicNavbar;
