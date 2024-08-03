import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { SiBeats } from "react-icons/si";
import { BsPeople } from "react-icons/bs";
import { Link, Outlet, useNavigate } from "react-router-dom";

import {
  UserEdit01Icon,
  File01Icon,
  AddTeamIcon,
  BookmarkAdd01Icon,
  Wallet01Icon,
  CatalogueIcon,
  Tag01Icon,
  ConnectIcon,
  CheckmarkBadge01Icon,
  SwimmingIcon,
  SettingsError01Icon,
  DashboardSquare02Icon,
  PeerToPeer03Icon
} from "hugeicons-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: DashboardSquare02Icon,
    current: true,
  },
  {
    name: "Create New Post",
    href: "/dashboard/create-post",
    icon: UserEdit01Icon,
    current: false,
  },
  {
    name: "My Posts",
    href: "/dashboard/posts",
    icon: CatalogueIcon,
    current: false,
  },
  {
    name: "Followers",
    href: "/dashboard/followers",
    icon: PeerToPeer03Icon,
    current: false,
  },
  {
    name: "Following",
    href: "/dashboard/following",
    icon: AddTeamIcon,
    current: false,
  },
  {
    name: "Create Plan",
    href: "/dashboard/add-plan",
    icon: BookmarkAdd01Icon,
    current: false,
  },
  {
    name: "Earnings",
    href: "/dashboard/my-earnings",
    icon: Wallet01Icon,
    current: false,
  },
  {
    name: "Add Category",
    href: "/dashboard/add-category",
    icon: Tag01Icon,
    current: false,
  },
  {
    name: "User's List",
    href: "/dashboard/users-list",
    icon: PeerToPeer03Icon,
    current: false,
  },

];

const adminNavigation = [
  {
    name: "Add Category",
    href: "/dashboard/add-category",
    icon: Tag01Icon,
    current: false,
  },
  {
    name: "User's List",
    href: "/dashboard/users-list",
    icon: PeerToPeer03Icon,
    current: false,
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function UserDashbaord() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  //Get the auth user from redux store

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>

                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                      {/* Logo */}
                      <Link to="/">
                        <SwimmingIcon className="h-8 w-auto text-orange-500" />
                        <span className=" text-teal-700 text-xl font-bold self-end animate-pulse">
                          Blog
                        </span>
                      </Link>
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <Link
                                  to={item.href}
                                  className={classNames(
                                    item.current
                                      ? "bg-gray-50 text-teal-700"
                                      : "text-teal-700 hover:text-teal-600 hover:bg-gray-50",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      item.current
                                        ? "text-teal-600"
                                        : "text-gray-400 group-hover:text-teal-600",
                                      "h-6 w-6 shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
            <div
              className="flex h-16 shrink-0 items-center cursor-pointer "
              onClick={() => navigate("/")}
            >
              {/* Logo */}

              <SwimmingIcon className="h-8 w-auto text-orange-500" />
              <span className=" text-teal-700 text-xl font-bold self-end animate-pulse">
                Blog
              </span>
            </div>
            <hr />
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-50 text-teal-700"
                              : "text-gray-700 hover:text-teal-600 hover:bg-gray-50",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-teal-700"
                                : "text-gray-400 group-hover:text-teal-700",
                              "h-6 w-6 shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>

                <li className="mt-auto">
                  <Link
                    to="/dashboard/settings"
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-red-50 hover:text-red-600"
                  >
                    <ConnectIcon
                      className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-red-600"
                      aria-hidden="true"
                      variant="bulk"
                    />
                    Settings
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              {/* Your content */}

              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
