import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { BsPeople } from "react-icons/bs";
import { Link, Outlet, useNavigate } from "react-router-dom";

import {
  CatalogueIcon,
  Tag01Icon,
  UserListIcon,
  UserIcon,
  UserSettings01Icon,
  PlusSignIcon,
  DollarCircleIcon,
  DashboardSquareSettingIcon
} from "hugeicons-react";
import { PiUsersFour, PiUsersThree, PiLadderBold } from "react-icons/pi";
import { MdOutlineLeaderboard } from "react-icons/md";
import { AiOutlineSetting } from "react-icons/ai";
import { RiFeedbackLine } from "react-icons/ri";
import { Button } from "../../components/ui/button";
import { FcFeedback } from "react-icons/fc";
import Home from "../../components/svg/Home";
import Search from "../../components/svg/Search";
import Explore from "../../components/svg/Explore";
import Profile from "../../components/svg/Profile";
import Bell from "../../components/svg/Bell";
import { useSelector } from "react-redux";
import FireIcon from "../../components/svg/FireIcon";

const connectionsNavigation = [
  {
    name: "Followers",
    href: "/dashboard/followers",
    icon: PiUsersFour,
    current: false,
  },
  {
    name: "Following",
    href: "/dashboard/following",
    icon: PiUsersThree,
    current: false,
  },
];

const discoverNavigation = [
  {
    name: "Subscription",
    href: "/dashboard/subscription",
    icon: Tag01Icon,
    current: false,
  },
  {
    name: "Leaderboard",
    href: "/dashboard/my-earnings",
    icon: MdOutlineLeaderboard,
    current: false,
  },
];

const adminNavigation = [
  {
    name: "Add new category",
    href: "/dashboard/add-category",
    icon: CatalogueIcon,
    current: false,
  },
  {
    name: "List of all users",
    href: "/dashboard/users-list",
    icon: UserListIcon,
    current: false,
  },
  {
    name: "Add new plan",
    href: "/dashboard/add-plan",
    icon: DollarCircleIcon,
    current: false,
  },
];

const settingsNavigation = [
  {
    name: "Settings",
    href: "/dashboard/account/profile/profile",
    icon: AiOutlineSetting,
    current: false,
  },
  {
    name: "Feedback",
    href: "/dashboard/account/feedback/feedback",
    icon: FcFeedback,
    current: false,
  },
];

// Tablet static data
const sidebarNavigation = [
  {
    name: "Home",
    href: "/",
    icon: Home,
    current: true,
  },
  {
    name: "Explore",
    href: "/dashboard/all-posts",
    icon: Search,
    current: false,
  },
  {
    name: "Posts",
    href: "/dashboard/posts",
    icon: Explore,
    current: false,
  },
  {
    name: "Profile",
    href: "/dashboard/account/profile/profile",
    icon: UserSettings01Icon,
    current: false,
  },
];

// Phone static data
const footerNavigation = [
  {
    name: "Home",
    href: "/",
    icon: Home,
    current: true,
  },
  {
    name: "Explore",
    href: "/dashboard/all-posts",
    icon: Search,
    current: false,
  },
  {
    name: "",
    href: "/dashboard/create-post",
    icon: PlusSignIcon,
    current: false,
  },
  {
    name: "Alert",
    href: "/dashboard/notifications",
    icon: Bell,
    current: false,
  },
  {
    name: "My posts",
    href: "/dashboard/posts",
    icon: UserIcon,
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// For Admin Nav Group
const role = "admin";

export default function UserDashbaord() {
  const navigate = useNavigate();

  const [current, setCurrent] = useState(false);
  //Get the auth user from redux store
  const { authUser } = useSelector((state) => state.auth);
  // return (
  //   <>
  //     <div>
  //       <Transition.Root show={sidebarOpen} as={Fragment}>
  //         <Dialog
  //           as="div"
  //           className="relative z-50 lg:hidden"
  //           onClose={setSidebarOpen}
  //         >
  //           <Transition.Child
  //             as={Fragment}
  //             enter="transition-opacity ease-linear duration-300"
  //             enterFrom="opacity-0"
  //             enterTo="opacity-100"
  //             leave="transition-opacity ease-linear duration-300"
  //             leaveFrom="opacity-100"
  //             leaveTo="opacity-0"
  //           >
  //             <div className="fixed inset-0 bg-gray-900/80" />
  //           </Transition.Child>

  //           <div className="fixed inset-0 flex">
  //             <Transition.Child
  //               as={Fragment}
  //               enter="transition ease-in-out duration-300 transform"
  //               enterFrom="-translate-x-full"
  //               enterTo="translate-x-0"
  //               leave="transition ease-in-out duration-300 transform"
  //               leaveFrom="translate-x-0"
  //               leaveTo="-translate-x-full"
  //             >
  //               <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
  //                 <Transition.Child
  //                   as={Fragment}
  //                   enter="ease-in-out duration-300"
  //                   enterFrom="opacity-0"
  //                   enterTo="opacity-100"
  //                   leave="ease-in-out duration-300"
  //                   leaveFrom="opacity-100"
  //                   leaveTo="opacity-0"
  //                 >
  //                   <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
  //                     <button
  //                       type="button"
  //                       className="-m-2.5 p-2.5"
  //                       onClick={() => setSidebarOpen(false)}
  //                     >
  //                       <span className="sr-only">Close sidebar</span>
  //                       <XMarkIcon
  //                         className="h-6 w-6 text-white"
  //                         aria-hidden="true"
  //                       />
  //                     </button>
  //                   </div>
  //                 </Transition.Child>

  //                 <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
  //                   <div className="flex h-16 shrink-0 items-center">
  //                     {/* Logo */}
  //                     <Link to="/">
  //                       <SwimmingIcon className="h-8 w-auto text-orange-500" />
  //                       <span className=" text-teal-700 text-xl font-bold self-end animate-pulse">
  //                         Blog
  //                       </span>
  //                     </Link>
  //                   </div>
  //                   <nav className="flex flex-1 flex-col">
  //                     <ul role="list" className="flex flex-1 flex-col gap-y-7">
  //                       <li>
  //                         <ul role="list" className="-mx-2 space-y-1">
  //                           {navigation.map((item) => (
  //                             <li key={item.name}>
  //                               <Link
  //                                 to={item.href}
  //                                 className={classNames(
  //                                   item.current
  //                                     ? "bg-gray-50 text-teal-700"
  //                                     : "text-teal-700 hover:text-teal-600 hover:bg-gray-50",
  //                                   "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
  //                                 )}
  //                               >
  //                                 <item.icon
  //                                   className={classNames(
  //                                     item.current
  //                                       ? "text-teal-600"
  //                                       : "text-gray-400 group-hover:text-teal-600",
  //                                     "h-6 w-6 shrink-0"
  //                                   )}
  //                                   aria-hidden="true"
  //                                 />
  //                                 {item.name}
  //                               </Link>
  //                             </li>
  //                           ))}
  //                         </ul>
  //                       </li>
  //                     </ul>
  //                   </nav>
  //                 </div>
  //               </Dialog.Panel>
  //             </Transition.Child>
  //           </div>
  //         </Dialog>
  //       </Transition.Root>

  //       {/* Static sidebar for desktop */}
  //       <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
  //         <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
  //           <div
  //             className="flex h-16 shrink-0 items-center cursor-pointer "
  //             onClick={() => navigate("/")}
  //           >
  //             {/* Logo */}

  //             <SwimmingIcon className="h-8 w-auto text-orange-500" />
  //             <span className=" text-teal-700 text-xl font-bold self-end animate-pulse">
  //               Blog
  //             </span>
  //           </div>
  //           <hr />
  //           <nav className="flex flex-1 flex-col">
  //             <ul role="list" className="flex flex-1 flex-col gap-y-7">
  //               <li>
  //                 <ul role="list" className="-mx-2 space-y-1">
  //                   {navigation.map((item) => (
  //                     <li key={item.name}>
  //                       <Link
  //                         to={item.href}
  //                         className={classNames(
  //                           item.current
  //                             ? "bg-gray-50 text-teal-700"
  //                             : "text-gray-700 hover:text-teal-600 hover:bg-gray-50",
  //                           "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
  //                         )}
  //                       >
  //                         <item.icon
  //                           className={classNames(
  //                             item.current
  //                               ? "text-teal-700"
  //                               : "text-gray-400 group-hover:text-teal-700",
  //                             "h-6 w-6 shrink-0"
  //                           )}
  //                           aria-hidden="true"
  //                         />
  //                         {item.name}
  //                       </Link>
  //                     </li>
  //                   ))}
  //                 </ul>
  //               </li>

  //               <li className="mt-auto">
  //                 <Link
  //                   to="/dashboard/settings"
  //                   className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-red-50 hover:text-red-600"
  //                 >
  //                   <ConnectIcon
  //                     className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-red-600"
  //                     aria-hidden="true"
  //                     variant="bulk"
  //                   />
  //                   Settings
  //                 </Link>
  //               </li>
  //             </ul>
  //           </nav>
  //         </div>
  //       </div>

  //       <div className="lg:pl-72">
  //         <main className="py-10">
  //           <div className="px-4 sm:px-6 lg:px-8">
  //             {/* Your content */}

  //             <Outlet />
  //           </div>
  //         </main>
  //       </div>
  //     </div>
  //   </>
  // )
  return (
    <>
      <aside className="max-lg:hidden w-[280px] lg:w-60 -translate-x-[280px] lg:top-16 lg:h-[calc(100vh-theme(space.16))] flex flex-col z-[77] lg:z-sidebar lg:-translate-x-0 left-0 bg-color border-r border-gray-600 transition-[width,transform] duration-300 ease-in-out group fixed top-0 h-full">
        {/* Toggle Sidebar Here */}

        {/* <Button
        aria-label="close sidebar"
        variant="outline"
        className="focus-outline inline-flex cursor-pointer select-none flex-row
        items-center border no-underline shadow-none transition
        duration-200 ease-in-out typo-callout justify-center font-bold h-6 px-2 rounded-8 btn-primary absolute -right-3 top-3 z-3 h-6 w-6 invisible opacity-0 transition-opacity group-hover:visible group-hover:opacity-100"
      >
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 pointer-events-none typo-title3 -rotate-90"
        >
          <path
            d="M12.56 7.23l6.752 6.604c.254.254.253.694-.018.965a.695.695 0 01-.983 0L12 8.68l-6.29 6.098c-.294.293-.734.294-1.005.022a.695.695 0 010-.983l6.716-6.568a.8.8 0 011.14-.018z"
            fill="white"
            fill-rule="evenodd"
          ></path>
        </svg>
      </Button> */}

        {/* Content */}
        <div className="flex overflow-x-hidden overflow-y-auto flex-col h-full no-scrollbar">
          <nav className="my-4 mt-10 lg:mt-8">
            <li className="hidden lg:flex px-3 opacity-100 text-sm text-slate-400 h-7 flex items-center font-bold  transition-opacity">
              Activity
            </li>
            <li className="text-white bg-theme-active flex items-center hover:bg-theme-active">
              <Link
                className="flex flex-1 items-center pl-2 lg:pl-0 pr-5 lg:pr-3 h-10 lg:h-7"
                to="/dashboard/account/summary"
              >
                <span className="relative px-3">
                  <div className="rounded-sm bg-background-subtle">
                    <DashboardSquareSettingIcon className="h-5 w-5"/>
                  </div>
                </span>
                <span
                  className="flex-1 truncate text-left transition-opacity opacity-100 delay-150"
                  title="Explore"
                >
                  Account Summary{" "}
                </span>
                <span className="relative"></span>
              </Link>
            </li>
            {/* Explore all posts */}
            <li className="hover:text-white text-slate-400 flex items-center hover:bg-theme-active">
              <Link
                className="flex flex-1 items-center pl-2 lg:pl-0 pr-5 lg:pr-3 h-10 lg:h-7"
                to="/dashboard/all-posts"
              >
                <span className="relative px-3">
                  <div className="rounded-sm bg-background-subtle">
                  <FireIcon />
                  </div>
                </span>
                <span
                  className="flex-1 truncate text-left transition-opacity opacity-100 delay-150"
                  title="Explore"
                >
                  Explore{" "}
                </span>
                <span className="relative"></span>
              </Link>
            </li>

            {/* My post */}
            <li className="hover:text-white text-slate-400 flex items-center hover:bg-theme-active">
              <Link
                className="flex flex-1 items-center pl-2 lg:pl-0 pr-5 lg:pr-3 h-10 lg:h-7"
                to="/dashboard/posts"
              >
                <span className="relative px-3">
                  <div className="object-cover w-5 h-5 rounded-sm relative overflow-hidden">
                    <img
                      src={authUser?.profilePicture || authUser?.profilePicture?.path ||
                        "https://github.com/shadcn.png"}
                      alt={`${authUser?.username || "User"}'s profile`}
                      className="absolute block inset-0 w-full h-full m-auto object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null; // Prevent infinite loop if fallback also fails
                        e.target.src =
                          authUser?.profilePicture?.path ||
                          "https://github.com/shadcn.png";
                      }}
                    />
                  </div>
                </span>
                <span
                  className="flex-1 truncate text-left transition-opacity opacity-100 delay-150"
                  title="My posts"
                >
                  My posts
                </span>
              </Link>
            </li>

            {/* Create post */}
            <li className="hover:text-white text-slate-400 flex items-center hover:bg-theme-active">
              <Link
                to="/dashboard/create-post"
                className="flex flex-1 items-center pl-2 lg:pl-0 pr-5 lg:pr-3 h-10 lg:h-7"
              >
                <span className="relative px-3">
                  <div className="rounded-sm bg-background-subtle">
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-5 h-5 pointer-events-none"
                    >
                      <path
                        d="M18.361 11.259a.75.75 0 01-.009 1.484l-.102.007h-5.5v5.5a.75.75 0 01-1.491.111l-.009-.11V12.75h-5.5l-.111-.009a.75.75 0 01.009-1.484l.102-.007h5.5v-5.5a.75.75 0 011.491-.111l.009.11v5.501h5.5l.111.009z"
                        fill="currentcolor"
                        fill-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </span>
                <span
                  className="flex-1 truncate text-left transition-opacity opacity-100 delay-150"
                  title="Create new post"
                >
                  Create new post{" "}
                </span>
                <span className="relative"></span>
              </Link>
            </li>

            {/* Discover Group */}
            <ul className="mt-0 lg:mt-4">
              <li className="hidden lg:flex px-3 opacity-100 text-sm text-slate-400 h-7 flex items-center font-bold  transition-opacity">
                Discover
              </li>
              <ul>
                {discoverNavigation.map((item) => (
                  <li
                    className={classNames(
                      item.current
                        ? "text-white bg-theme-active"
                        : "text-slate-400 bg-transparent hover:text-white hover:bg-theme-active",
                      "flex items-center"
                    )}
                  >
                    <Link
                      to={item?.href}
                      className="flex flex-1 items-center pl-2 lg:pl-0 pr-5 lg:pr-3 h-10 lg:h-7"
                    >
                      <span className="relative px-3">
                        <div className="rounded-sm bg-background-subtle">
                          <item.icon
                            fontVariant="bulk"
                            className={classNames(
                              item.current
                                ? "text-white"
                                : "text-slate-400 bg-transparent hover:text-white hover:bg-theme-active",
                              "w-5 h-5 pointer-events-none"
                            )}
                          />
                        </div>
                      </span>
                      <span
                        className="flex-1 truncate text-left transition-opacity opacity-100 delay-150"
                        title="Create new post"
                      >
                        {item.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </ul>

            {/* Connections Group */}
            <ul className="mt-0 lg:mt-4">
              <li className="hidden lg:flex px-3 opacity-100 text-sm text-slate-400 h-7 flex items-center font-bold  transition-opacity">
                Connection
              </li>
              <ul>
                {connectionsNavigation.map((item) => (
                  <li
                    className={classNames(
                      item.current
                        ? "text-white bg-theme-active"
                        : "text-slate-400 bg-transparent hover:text-white hover:bg-theme-active",
                      "flex items-center"
                    )}
                  >
                    <Link
                      to={item?.href}
                      className="flex flex-1 items-center pl-2 lg:pl-0 pr-5 lg:pr-3 h-10 lg:h-7"
                    >
                      <span className="relative px-3">
                        <div className="rounded-sm bg-background-subtle">
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-white"
                                : "text-slate-400 bg-transparent hover:text-white hover:bg-gray-400",
                              "w-5 h-5 pointer-events-none"
                            )}
                          />
                        </div>
                      </span>
                      <span
                        className="flex-1 truncate text-left transition-opacity opacity-100 delay-150"
                        title="Create new post"
                      >
                        {item.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </ul>

            {/* Admin Group */}
            {role === "admin" ? (
              <ul className="mt-0 lg:mt-4">
                <li className="hidden lg:flex px-3 opacity-100 text-sm text-slate-400 h-7 flex items-center font-bold  transition-opacity">
                  Admin
                </li>
                <ul>
                  {adminNavigation.map((item) => (
                    <li
                      className={classNames(
                        item.current
                          ? "text-white bg-theme-active"
                          : "text-slate-400 bg-transparent hover:text-white hover:bg-theme-active",
                        "flex items-center"
                      )}
                    >
                      <Link
                        to={item?.href}
                        className="flex flex-1 items-center pl-2 lg:pl-0 pr-5 lg:pr-3 h-10 lg:h-7"
                      >
                        <span className="relative px-3">
                          <div className="rounded-sm bg-background-subtle">
                            <item.icon
                              className={classNames(
                                item.current
                                  ? "text-white"
                                  : "text-slate-400 bg-transparent hover:text-white hover:bg-gray-400",
                                "w-5 h-5 pointer-events-none"
                              )}
                            />
                          </div>
                        </span>
                        <span
                          className="flex-1 truncate text-left transition-opacity opacity-100 delay-150"
                          title="Create new post"
                        >
                          {item.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </ul>
            ) : null}
          </nav>
          <div className="flex-1"></div>

          {/* Buttom nav for settings and feedback */}
          <nav className="my-4 mt-10 laptop:mt-8">
            <ul className="mt-0 lg:mt-4">
              <ul>
                {settingsNavigation.map((item) => (
                  <li
                    className={classNames(
                      item.current
                        ? "text-white bg-theme-active"
                        : "text-slate-400 bg-transparent hover:text-white hover:bg-theme-active",
                      "flex items-center"
                    )}
                  >
                    <Link
                      to={item?.href}
                      className="flex flex-1 items-center pl-2 lg:pl-0 pr-5 lg:pr-3 h-10 lg:h-7"
                    >
                      <span className="relative px-3">
                        <div className="rounded-sm bg-background-subtle">
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-white"
                                : "text-slate-400 bg-transparent hover:text-white hover:bg-gray-400",
                              "w-5 h-5 pointer-events-none"
                            )}
                          />
                        </div>
                      </span>
                      <span
                        className="flex-1 truncate text-left transition-opacity opacity-100 delay-150"
                        title="Create new post"
                      >
                        {item.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </ul>
          </nav>
        </div>
      </aside>

      {/* tablet */}
      <aside className="lg:hidden w-16 items-center gap-4 max-md:hidden max-lg:flex flex-col z-[77] lg:z-[79] lg:-translate-x-0 left-0 bg-color border-r border-gray-600 transition-[width,transform] duration-300 ease-in-out group fixed top-14 h-full max-lg:h-[calc(100vh-theme(space.14))]">
        {sidebarNavigation?.map((item) => {
          return (
            <Link
              to={item.href}
              className={classNames(
                item.current
                  ? "text-white hover:text-slate-400"
                  : "text-slate-400 hover:text-slate-400",
                "inline-flex items-center select-none shadow-none transition duration-200 ease-in-out text-xs h-12 px-2 rounded-xl flex-col gap-1 w-full !bg-transparent active:bg-transparent aria-pressed:bg-transparent"
              )}
            >
              <item.icon />
              {item.name}
            </Link>
          );
        })}
        <Button
          aria-label="New Post"
          className="w-10 h-10 p-0 rounded-xl text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700"
          onClick={() => navigate("/dashboard/create-post")}
        >
          <PlusSignIcon className="text-lg" />
        </Button>
      </aside>

      {/* Phone */}
      <aside className="fixed md:hidden !bottom-0 left-0 z-50 w-full footer-navbar bg-gradient-to-t from-black to-transparent px-2 pt-2">
        <nav className="grid w-full auto-cols-fr grid-flow-col items-center justify-between rounded-2xl bg-slate-950 border-t border-slate-500">
          {footerNavigation?.map((item) => {
            return (
              <div
                className={`relative flex h-full flex-col items-center justify-center py-2 ${
                  item.name === "Alert" ? "!p-0" : null
                }`}
              >
                <Link
                  to={item.href}
                  className={classNames(
                    item.current
                      ? "text-white"
                      : "text-slate-400 hover:text-slate-400",
                    `inline-flex items-center select-none shadow-none transition duration-200 ease-in-out text-xs h-12 px-2 rounded-xl flex-col gap-1 w-full bg-transparent active:bg-transparent aria-pressed:bg-transparent
                ${
                  item.href === "/dashboard/create-post"
                    ? "flex items-center justify-center !w-10 !h-10 p-0 rounded-lg border border-slate-400 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700"
                    : null
                }
                `
                  )}
                >
                  <item.icon notificationValue="50" />
                  {item.name}
                </Link>
                {item.current ? (
                  <div className="-top-0.5 w-6 absolute inset-x-0 bottom-0 h-0.5 my-0 mx-auto bg-white rounded-[1.008px]" />
                ) : null}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
