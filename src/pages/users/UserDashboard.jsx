import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { BsPeople } from "react-icons/bs";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";

import {
  CatalogueIcon,
  Tag01Icon,
  UserListIcon,
  UserIcon,
  UserSettings01Icon,
  PlusSignIcon,
  DollarCircleIcon,
  DashboardSquareSettingIcon,
  ArrowLeft01Icon,
  ChartIncreaseIcon,
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
import { useDispatch, useSelector } from "react-redux";
import FireIcon from "../../components/svg/FireIcon";
import { setIsSidebarCollapsed } from "../../redux/features/user/asideSlice";

const UserAvatar = ({ user }) => {
  return (
    <img
      src={
        user?.profilePicture ||
        user?.profilePicture?.path ||
        "https://github.com/shadcn.png"
      }
      alt={`${user?.username || "User"}'s profile`}
      className="absolute block inset-0 w-full h-full m-auto object-cover"
      loading="lazy"
      onError={(e) => {
        e.target.onerror = null; // Prevent infinite loop if fallback also fails
        e.target.src =
          user?.profilePicture?.path || "https://github.com/shadcn.png";
      }}
    />
  );
};

const connectionsNavigation = [
  {
    name: "Followers",
    href: "/dashboard/followers/followers",
    icon: PiUsersFour,
    current: "followers",
  },
  {
    name: "Following",
    href: "/dashboard/following/following",
    icon: PiUsersThree,
    current: "following",
  },
];

const discoverNavigation = [
  {
    name: "Subscription",
    href: "/dashboard/subscription/subscription",
    icon: Tag01Icon,
    current: "subscription",
  },
  {
    name: "Leaderboard",
    href: "/dashboard/leaderboard/leaderboard",
    icon: ChartIncreaseIcon,
    current: "leaderboard",
  },
];

const adminNavigation = [
  {
    name: "Add new category",
    href: "/dashboard/add-category/add-category",
    icon: CatalogueIcon,
    current: "add-category",
  },
  {
    name: "List of all users",
    href: "/dashboard/users-list/users-list",
    icon: UserListIcon,
    current: "users-list",
  },
  {
    name: "Add new plan",
    href: "/dashboard/add-plan/add-plan",
    icon: DollarCircleIcon,
    current: "add-plan",
  },
];

const settingsNavigation = [
  {
    name: "Settings",
    href: "/dashboard/account/account/profile/profile",
    icon: AiOutlineSetting,
    current: "account",
  },
  {
    name: "Feedback",
    href: "/dashboard/account/account/feedback/feedback",
    icon: FcFeedback,
    current: "account",
  },
];

// Tablet static data
const sidebarNavigation = [
  {
    name: "Home",
    href: "/dashboard/account-summary/account-summary",
    icon: Home,
    current: "account",
  },
  {
    name: "Explore",
    href: "/dashboard/all-posts/all-posts",
    icon: Search,
    current: "all-posts",
  },
  {
    name: "Posts",
    href: "/dashboard/posts/posts",
    icon: Explore,
    current: "posts",
  },
  {
    name: "Profile",
    href: "/dashboard/account/account/profile/profile",
    icon: UserSettings01Icon,
    current: "account",
  },
];

// Phone static data
const footerNavigation = [
  {
    name: "Home",
    href: "/dashboard/account-summary/account-summary",
    icon: Home,
    current: "account",
  },
  {
    name: "Explore",
    href: "/dashboard/all-posts/all-posts",
    icon: Search,
    current: "all-posts",
  },
  {
    name: "",
    href: "/dashboard/create-post/create-post",
    icon: PlusSignIcon,
    current: "create-post",
  },
  {
    name: "Alert",
    href: "/dashboard/account/account/notifications/notifications",
    icon: Bell,
    current: "notifications",
  },
  {
    name: "My posts",
    href: "/dashboard/posts/posts",
    icon: UserIcon,
    current: "posts",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function UserDashbaord() {
  const navigate = useNavigate();
  const { pathname } = useParams();

  const [current, setCurrent] = useState(false);
  const dispatch = useDispatch();
  //Get the auth user from redux store
  const { authUser } = useSelector((state) => state.auth);

  const activityNavigation = [
    {
      name: "Account summary",
      href: "/dashboard/account-summary/account-summary",
      icon: <DashboardSquareSettingIcon className="h-4 w-4" />,
      current: "account-summary",
    },
    {
      name: "Explore",
      href: "/dashboard/all-posts/all-posts",
      icon: <FireIcon className="h-5 w-5" />,
      current: "all-posts",
    },
    {
      name: "Create post",
      href: "/dashboard/create-post/create-post",
      icon: <PlusSignIcon className="h-5 w-5" />,
      current: "create-post",
    },
    {
      name: "My posts",
      href: "/dashboard/posts/posts",
      icon: <UserAvatar className="h-5 w-5" user={authUser} />,
      current: "posts",
    },
  ];

  //Get the auth isSidebarCollapsed from redux store
  const { isSidebarCollapsed } = useSelector((state) => state.global);

  // Sidebar toggle handler
  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  return (
    <>
      <aside
        className={`max-lg:hidden lg:top-16 lg:h-[calc(100vh-theme(space.16))] flex flex-col z-[77] lg:z-sidebar lg:-translate-x-0 left-0 bg-color border-r border-gray-600 transition-[width,transform] duration-300 ease-in-out group fixed top-0 h-full ${
          isSidebarCollapsed
            ? "md:w-12 -translate-x-12"
            : "md:w-[280px] -translate-x-[280px] lg:w-60"
        }`}
      >
        {/* Toggle Sidebar Here */}

        <Button
          aria-label="close sidebar"
          variant="outline"
          className="focus-outline inline-flex cursor-pointer select-none flex-row
        items-center border no-underline shadow-none
        duration-200 ease-in-out justify-center bg-white px-2 w-7 h-7 rounded-lg absolute -right-3 top-3 z-[100] opacity-0 transition-opacity group-hover:visible group-hover:opacity-100"
          onClick={toggleSidebar}
        >
          <ArrowLeft01Icon
            stroke-width="4.0"
            className={`w-7 h-7 pointer-events-none text-lg ${
              isSidebarCollapsed && "-rotate-180"
            }`}
          />
        </Button>

        {/* Content */}
        <div className="flex overflow-x-hidden overflow-y-auto flex-col h-full no-scrollbar">
          <nav className="my-4 mt-10 lg:mt-8">
            {!isSidebarCollapsed && (
              <li className="hidden lg:flex px-3 opacity-100 text-sm text-slate-400 h-7 flex items-center font-bold  transition-opacity">
                Activity
              </li>
            )}

            <ul>
              {activityNavigation?.map((item) => {
                return (
                  <li
                    className={classNames(
                      item.current === pathname
                        ? "bg-theme-active text-white"
                        : "bg-transparent text-slate-400 hover:bg-background-subtle hover:text-white transition-colors",
                      `cursor-pointer flex items-center text-slate-400 ${
                        isSidebarCollapsed ? "justify-center" : "justify-start"
                      }`
                    )}
                  >
                    <Link
                      to={item.href}
                      className={`h-10 lg:h-7 flex flex-1 items-center ${
                        !isSidebarCollapsed && "pl-2 lg:pl-0 pr-5 lg:pr-3"
                      }`}
                    >
                      {/* Icon */}
                      <span className="relative px-3">
                        <div className="object-cover w-5 h-5 rounded-sm relative overflow-hidden">
                          {item.icon}
                        </div>
                      </span>

                      <span
                        className={`flex-1 truncate text-left transition-opacity opacity-100 delay-150 ${
                          isSidebarCollapsed ? "hidden" : "flex"
                        }`}
                        title={item.name}
                      >
                        {item.name}
                      </span>
                      <span className="relative"></span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Discover Group */}
            <ul className="mt-0 lg:mt-4">
              {!isSidebarCollapsed && (
                <li className="hidden lg:flex px-3 opacity-100 text-sm text-slate-400 h-7 flex items-center font-bold  transition-opacity">
                  Discover
                </li>
              )}
              <ul>
                {discoverNavigation.map((item) => (
                  <li
                    className={classNames(
                      item.current === pathname
                        ? "bg-theme-active text-white"
                        : "bg-transparent text-slate-400 hover:bg-background-subtle hover:text-white transition-colors",
                      `cursor-pointer flex items-center text-slate-400 ${
                        isSidebarCollapsed ? "justify-center" : "justify-start"
                      }`
                    )}
                  >
                    <Link
                      to={item?.href}
                      className={`h-10 lg:h-7 flex flex-1 items-center ${
                        !isSidebarCollapsed && "pl-2 lg:pl-0 pr-5 lg:pr-3"
                      }`}
                    >
                      <span className="relative px-3">
                        <div className="rounded-sm bg-background-subtle">
                          <item.icon
                            fontVariant="bulk"
                            className="object-cover w-5 h-5 rounded-sm relative overflow-hidden"
                          />
                        </div>
                      </span>
                      <span
                        className={`flex-1 truncate text-left transition-opacity opacity-100 delay-150 ${
                          isSidebarCollapsed ? "hidden" : "flex"
                        }`}
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
              {!isSidebarCollapsed && (
                <li className="lg:flex px-3 opacity-100 text-sm text-slate-400 h-7 flex items-center font-bold  transition-opacity">
                  Connection
                </li>
              )}
              <ul>
                {connectionsNavigation.map((item) => (
                  <li
                    className={classNames(
                      item.current === pathname
                        ? "bg-theme-active text-white"
                        : "bg-transparent text-slate-400 hover:bg-background-subtle hover:text-white transition-colors",
                      `cursor-pointer flex items-center text-slate-400 ${
                        isSidebarCollapsed ? "justify-center" : "justify-start"
                      }`
                    )}
                  >
                    <Link
                      to={item?.href}
                      className={`h-10 lg:h-7 flex flex-1 items-center ${
                        !isSidebarCollapsed && "pl-2 lg:pl-0 pr-5 lg:pr-3"
                      }`}
                    >
                      <span className="relative px-3">
                        <div className="rounded-sm bg-background-subtle">
                          <item.icon className="object-cover w-5 h-5 rounded-sm relative overflow-hidden" />
                        </div>
                      </span>
                      <span
                        className={`flex-1 truncate text-left transition-opacity opacity-100 delay-150 ${
                          isSidebarCollapsed ? "hidden" : "flex"
                        }`}
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
            {authUser?.role === "admin" ? (
              <ul className="mt-0 lg:mt-4">
                {!isSidebarCollapsed && (
                  <li className="lg:flex px-3 opacity-100 text-sm text-slate-400 h-7 flex items-center font-bold  transition-opacity">
                    Admin
                  </li>
                )}
                <ul>
                  {adminNavigation.map((item) => (
                    <li
                      className={classNames(
                        item.current === pathname
                          ? "bg-theme-active text-white"
                          : "bg-transparent text-slate-400 hover:bg-background-subtle hover:text-white transition-colors",
                        `cursor-pointer flex items-center text-slate-400 ${
                          isSidebarCollapsed
                            ? "justify-center"
                            : "justify-start"
                        }`
                      )}
                    >
                      <Link
                        to={item?.href}
                        className={`h-10 lg:h-7 flex flex-1 items-center ${
                          !isSidebarCollapsed && "pl-2 lg:pl-0 pr-5 lg:pr-3"
                        }`}
                      >
                        <span className="relative px-3">
                          <div className="rounded-sm bg-background-subtle">
                            <item.icon className="object-cover w-5 h-5 rounded-sm relative overflow-hidden" />
                          </div>
                        </span>
                        <span
                          className={`flex-1 truncate text-left transition-opacity opacity-100 delay-150 ${
                            isSidebarCollapsed ? "hidden" : "flex"
                          }`}
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
                      item.current === pathname
                        ? "bg-theme-active text-white"
                        : "bg-transparent text-slate-400 hover:bg-background-subtle hover:text-white transition-colors",
                      `cursor-pointer flex items-center text-slate-400 ${
                        isSidebarCollapsed ? "justify-center" : "justify-start"
                      }`
                    )}
                  >
                    <Link
                      to={item?.href}
                      className={`h-10 lg:h-7 flex flex-1 items-center ${
                        !isSidebarCollapsed && "pl-2 lg:pl-0 pr-5 lg:pr-3"
                      }`}
                    >
                      <span className="relative px-3">
                        <div className="rounded-sm bg-background-subtle">
                          <item.icon className="object-cover w-5 h-5 rounded-sm relative overflow-hidden" />
                        </div>
                      </span>
                      <span
                        className={`flex-1 truncate text-left transition-opacity opacity-100 delay-150 ${
                          isSidebarCollapsed ? "hidden" : "flex"
                        }`}
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
