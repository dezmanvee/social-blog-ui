import { Outlet, useParams } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight01Icon,
  MailAdd01Icon,
  Notification01Icon,
  Note01Icon,
  UserSettings01Icon,
  SecurityPasswordIcon,
  PasswordValidationIcon,
    CirclePasswordIcon
    } from "hugeicons-react";
import Profile from "../../../components/svg/Profile";
import Bell from "../../../components/svg/Bell";
import InviteFriend from "../../../components/svg/InviteFriend";

const AccountLayout = () => {
  const { accountId } = useParams();

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const profileNav = [
    {
      name: "Profile picture",
      icon: <UserSettings01Icon className="w-5 h-5 ml-1 mr-2" />,
      link: "/dashboard/account/profile/profile",
      current: "profile",
    },
    {
      name: "Account email",
      icon: <MailAdd01Icon className="!w-5 !h-5 mr-2" />,
      link: "/dashboard/account/email/email",
      current: "email",
    },
    // {
    //   name: "Forgot password",
    //   icon: <CirclePasswordIcon className="!w-5 !h-5 mr-2" />,
    //   link: "/dashboard/account/forgot-password/password",
    //   current: "password-reset",
    // },
    {
      name: "Notifications",
      icon: <Notification01Icon className="!w-5 !h-5 mr-2" />,
      link: "/dashboard/account/notifications/notifications",
      current: "notifications",
    },
    {
      name: "Invite friends",
      icon: <InviteFriend className="!w-5 !h-5" />,
      link: "/dashboard/account/invite/invite",
      current: "invite",
    },
    {
      name: "Feedback",
      icon: <Note01Icon className="!w-5 !h-5" />,
      link: "/dashboard/account/feedback/feedback",
      current: "feedback",
    },
  ];

//   const FAQs = ["Request a feature", "Report an issue", "Privacy policy", "Terms of service"]
const FAQs = [
    {name: "Request a feature"},
    {name: "Report an issue"},
    {name: "Privacy policy"},
    {name: "Terms of service"},
]
  return (
    <main className="relative mx-auto flex w-full flex-1 flex-row items-stretch pt-0 lg:max-w-[calc(100vw-17.5rem)]">
      {/* aside */}
      <aside className="flex flex-col transition-transform ease-in-out md:translate-x-[unset] md:items-center md:px-6 md:pt-6  -translate-x-full absolute z-3 ml-auto h-full w-full border-l border-gray-600 bg-background-default md:relative md:w-[unset] bg-background-default">
        {/* small screen */}
        <span className="mb-6 flex w-full text-white flex-row items-center justify-between border-b border-gray-600 p-2 md:hidden">
          <span className="ml-4 font-bold">Account Settings</span>
          <Button className="h-10 w-10 p-0 rounded-lg">
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
        </span>
        {/* aside content*/}
        <div className="px-6 md:px-0">
          {/* top */}
          {profileNav?.map((item) => {
            return (
              <Link
                key={item?.name}
                to={item?.link}
                className= {classNames(
                    item.current === accountId
                    ? "border-gray-600 text-white bg-theme-active"
                    : "text-slate-400  border-transparent hover:border-gray-600 hover:bg-theme-active hover:text-white",
                    "flex w-full p-[0.9375rem] flex-row rounded-2xl md:w-64 border"
                )}
              >
                {item?.icon}
                <span className="ml-2">{item?.name}</span>
                <ArrowRight01Icon className="w-6 h-6 ml-auto text-white" />
              </Link>
            );
          })}
          {/* bottom */}
          <div className="flex flex-col py-4 px-5 gap-3 mt-[22px] w-full rounded-2xl border border-gray-600">
            <div className="w-full text-slate-400">FAQ</div>
            {FAQs?.map((FAQ, index) => {
                return <p key={index} className="w-full text-slate-400">{FAQ?.name}</p>
            })}
          </div>
        </div>
      </aside>
      {/* Main content */}
      <article className="relative lg:border-r lg:border-l border-gray-600 flex flex-col w-full lg:max-w-[calc(100vw-19.75rem)] xl:max-w-[40.5rem] md:border-l flex-auto mr-auto">
        {/* Nav */}
        <h1 className="sticky font-bold text-xl py-4 px-6 border-b border-gray-600 w-full flex flex-row items-center">
          <Button className="h-6 w-auto p-0 rounded-lg bg-transparent text-white text-xl font-bold mr-2 flex capitalize">
            {accountId}
          </Button>
        </h1>

        <section className="h-full overflow-y-scroll !max-h-[calc(100dvh-9rem)] max-h-[calc(100vh-9rem)] !min-h-[calc(100dvh-12rem)] min-h-[calc(100vh-12rem)] flex flex-col p-6 w-full overflow-x-hidden">
          <Outlet />
        </section>
        <footer className="sticky flex flex-row gap-3 border-t border-gray-600 p-3">
            <div className="h-6"></div>
        </footer>
      </article>
    </main>
  );
};
export default AccountLayout;
