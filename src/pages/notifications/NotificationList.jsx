import { Link } from "react-router-dom";
import {
  allNotificationsAPI,
  updateNotificationAPI,
} from "../../API/notifications/notificationAPIs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Notification01Icon } from "hugeicons-react";

const NotificationList = () => {
  // Notification
  const { data, refetch } = useQuery({
    queryKey: ["notification-list"],
    queryFn: allNotificationsAPI,
  });

  const unreadNotifications = data?.allNotifications?.filter(
    (notification) => notification.isRead === false
  );

  const readNotification = useMutation({
    mutationKey: ["read-notification"],
    mutationFn: updateNotificationAPI,
  });

  const readNotificationHandler = (id) => {
    readNotification
      .mutateAsync(id)
      .then(() => {
        refetch();
      })
      .catch((e) => console.log(e));
  };

  return (
    <section className="">
      <h2 className="mt-0 font-bold text-white" id="notification">
        Stay Updated with the Latest Posts
      </h2>
      <p className="mt-1 mb-4 text-slate-400">
        Never miss out on the latest discussions and contributions from fellow
        users. Here you'll find notifications about new posts and updates,
        keeping you connected and informed on what others are sharing across the
        platform.
      </p>
      {/* Notification wrapper */}
      <div className="relative flex flex-col">
        {unreadNotifications?.length === 0 ? (
          <div className="text-white">
            There are no new notifications at the moment. Stay tuned for the
            latest updates and posts from fellow developers as they share their
            thoughts and ideas!
          </div>
        ) : (
          unreadNotifications?.map((notification) => (
            <button
              key={notification?._id}
              onClick={() => readNotificationHandler(notification?._id)}
              className="group relative flex flex-row border-y border-gray-800 py-4 pl-6 pr-4 hover:bg-background-subtle focus:bg-theme-active"
            >
              <Link className="absolute inset-0 z-0">
                <span></span>
              </Link>

              <span className="h-fit overflow-hidden rounded-lg bg-background-subtle p-1">
                <Notification01Icon className="w-5 h-5 pointer-events-none  text-yellow-300" />
              </span>
              <div className="ml-4 flex w-full flex-1 flex-col text-left">
                <p className="text-white text-sm">{notification.message}</p>
                <span className="text-gray-400 text-xs mt-2">
                  {new Date(notification.createdAt).toDateString()}
                </span>
              </div>
            </button>
          ))
        )}
      </div>
    </section>
  );
};
export default NotificationList;
