import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
// import { PlusIcon } from "@radix-ui/react-icons";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  DashboardSquare02Icon,
  SwimmingIcon,
  Logout03Icon,
  PlusSignIcon,
  Search02Icon,
  SearchDollarIcon,
} from "hugeicons-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAPI } from "../../API/users/userAPIs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { logout } from "../../redux/features/user/authSlice";
import NotificationCounts from "../notificationCount/NotificationCounts";
import { allNotificationsAPI } from "../../API/notifications/notificationAPIs";

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

const PublicNavbar = () => {
  const navigate = useNavigate();
  const { authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

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
    <header className="sticky top-0 z-50 flex h-14 flex-row content-center items-center justify-center gap-3 border-b border-gray-600 px-4 py-3 md:px-8 lg:left-0 lg:h-16 lg:w-full lg:px-4 xl:grid xl:auto-cols-fr xl:grid-flow-col bg-color">
      {/* Logo */}
      <div className="flex flex-1  lg:flex-none lg:justify-start justify-center">
        <Link
          to="/"
          className="flex items-center absolute left-1/2 top-4 mt-0.5 -translate-x-1/2 lg:relative lg:left-[unset] lg:top-[unset] lg:mt-0 lg:translate-x-[unset]"
          aria-label="Home"
        >
          <SwimmingIcon className="h-8 w-auto text-gray-500" />
          <div className="text-white text-2xl font-bold">
            <span>Dev</span>
            <span className="text-gray-400 text-xl font-semibold">ware</span>
          </div>
        </Link>
      </div>
      {/* Search bar */}
      {/* <div className="left-0 top-0 z-50 mr-auto items-center py-3 md:left-16 lg:left-0 xl:mx-auto xl:w-full hidden lg:flex flex flex-col">
        
      </div> */}
      {/* Profile Wrapper*/}
      <div className="ml-auto flex justify-end gap-3">
        {/* Add post */}
        <Button
          aria-label="New Post"
          variant="outline"
          className="w-10 h-10 p-0 rounded-xl"
        >
          <PlusSignIcon className="text-lg" />
        </Button>

        {/* Notification */}
        <div className="relative lg:flex" aria-label="Notifications">
          <Button className="w-10 h-10 p-0 rounded-xl text-gray-400 hover:text-white bg-surface-float hover:bg-slate-800">
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
          <span className="-right-1.5 -top-1.5 cursor-pointer px-1 absolute flex justify-center items-center min-w-[1.25rem] min-h-[1.25rem] font-normal text-white rounded-lg bg-accent-cabbage-default text-[14px]">
            1
          </span>
        </div>

        {/* Leaderboard, totalNumber of personal post & Profile pix */}
        <div className="flex h-10 items-center rounded-xl bg-surface-float px-1">
          {/* Leaderboard */}
          <Button className="h-8 px-3 rounded-lg text-[#FC538D] text-base gap-1 hover:bg-slate-800">
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
            <span className="font-bold">0</span>
          </Button>
          {/* totalNumber of personal post */}
          <Button className="text-base gap-2 p-0 hidden lg:flex text-white">
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
            {/* profile picture */}
            <img
              src="https://res-console.cloudinary.com/dkc0j221n/thumbnails/v1/image/upload/v1718528996/c29jaWFsX2Jsb2dfYXBwL3VpZmQ1c2N5Zm5qd3I2M2loNTNt/drilldown"
              alt="Sam Bade"
              className="object-cover w-8 h-8 rounded-lg"
              loading="lazy"
              type="avatar"
            />
          </Button>
        </div>
      </div>
    </header>
  );
};
export default PublicNavbar;
