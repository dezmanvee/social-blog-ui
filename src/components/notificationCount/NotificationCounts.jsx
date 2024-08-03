import { Link } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import { allNotificationsAPI } from "../../API/notifications/notificationAPIs";




const NotificationCounts = () => {

  // Notification
  const {data} = useQuery({
    queryKey: ["notification-list"],
    queryFn: allNotificationsAPI,
  });

  // unread notificcations
  const unreadNotififcations = data?.allNotifications?.filter((notification) => notification?.isRead === false)
  

  return (
    <Link to="dashboard/notifications">
      <div className="relative inline-block">
        <IoMdNotificationsOutline className="text-2xl text-gray-700" />{" "}
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full -translate-y-1/3 translate-x-1/3">
          {unreadNotififcations?.length || 0}
        </span>
      </div>
    </Link>
  );
};

export default NotificationCounts;
