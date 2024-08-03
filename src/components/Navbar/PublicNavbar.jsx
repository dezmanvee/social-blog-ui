import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  DashboardSquare02Icon,
  SwimmingIcon,
  Logout03Icon,
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

    <Disclosure as="nav" className="bg-teal-50 shadow z-50">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-teal-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div
                  className="flex flex-shrink-0 items-center"
                  onClick={() => navigate("/")}
                >
                  {/* Logo */}
                  <SwimmingIcon className="h-8 w-auto text-orange-500" />
                  <span className="text-teal-700 text-xl font-bold self-end animate-pulse">
                    Blog
                  </span>
                </div>
                {/* large screens */}
              </div>
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                {authUser ? null : (
                  <Link
                    to="/"
                    className="inline-flex items-center border-b-2 border-transparent focus:border-orange-500 px-1 pt-1 text-sm font-medium hover:text-gray-700 focus:text-gray-900"
                  >
                    Home
                  </Link>
                )}
                <Link
                  to="/dashboard/all-posts"
                  className="inline-flex items-center text-sm font-medium border-b-2 border-transparent focus:border-orange-500 px-1 pt-1 text-gray-500 hover:border-gray-300 hover:text-gray-700 focus:text-gray-900"
                >
                  Latest Posts
                </Link>
                <Link
                  to="/ranking"
                  className="inline-flex items-center border-b-2 border-transparent focus:border-orange-500 px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 focus:text-gray-900"
                >
                  Creator's Ranking
                </Link>
                <Link
                  to="/pricing"
                  className="inline-flex items-center border-b-2 border-transparent focus:border-orange-500 px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 focus:text-gray-900"
                >
                  Pricing
                </Link>
                {authUser ? null : (
                  <Link
                    to="/register"
                    className="inline-flex items-center border-b-2 border-transparent focus:border-orange-500 px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 focus:text-gray-900"
                  >
                    Create Account
                  </Link>
                )}
              </div>
              {/* Right-Hand-Container */}
              <div className="flex items-center">
              
                <div className="flex-shrink-0">
                  {authUser ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="relative inline-flex items-center justify-center rounded-md border-2 border-teal-700 p-0.5">
                        <Link
                          to="/dashboard"
                          className="relative inline-flex items-center justify-center gap-x-1.5 rounded-sm bg-teal-700 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-teal-700 border-2 border-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
                        >
                          <DashboardSquare02Icon size="16" />
                          Dashboard
                        </Link>
                      </div>
                      <NotificationCounts />
                      <button
                        onClick={logoutHandler}
                        type="button"
                        className="relative m-2 inline-flex items-center gap-x-1.5 rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                      >
                        <Logout03Icon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  ) : (
                    <div className="relative inline-flex items-center justify-center rounded-md border-2 border-orange-500 p-0.5">
                      <Link
                        to="/register"
                        className="relative inline-flex items-center justify-center gap-x-1.5 rounded-sm bg-orange-500 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-teal-50 hover:text-orange-500 border-2 border-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                      >
                        {/* <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" /> */}
                        Create post
                      </Link>
                    </div>
                  )}
                </div>
                
                <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                  <button
                    type="button"
                    className="relative rounded-full bg-teal-50 p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  >
                    <span className="absolute -inset-1.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* small screens */}
          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 pt-2">
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}

              {!authUser && (
                <Disclosure.Button
                  as="a"
                  href="/"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-teal-500 hover:bg-teal-100 hover:text-gray-700 sm:pl-5 sm:pr-6"
                >
                  Home
                </Disclosure.Button>
              )}
              <Disclosure.Button
                as="a"
                href="/posts"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-teal-500 hover:bg-teal-100 hover:text-gray-700 sm:pl-5 sm:pr-6"
              >
                Latest Posts
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/ranking"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-teal-500 hover:bg-teal-100 hover:text-gray-700 sm:pl-5 sm:pr-6"
              >
                Creator's Ranking
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-teal-500 hover:bg-teal-100 hover:text-gray-700 sm:pl-5 sm:pr-6"
              >
                Pricing
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/pricing"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-teal-500 hover:bg-teal-100 hover:text-gray-700 sm:pl-5 sm:pr-6"
              >
                Create Account
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
export default PublicNavbar;
