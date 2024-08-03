import {
  allNotificationsAPI,
  updateNotificationAPI,
} from "../../API/notifications/notificationAPIs";
import { useMutation, useQuery } from "@tanstack/react-query";

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
        refetch()
      })
      .catch((e) => console.log(e))
  };
  console.log(unreadNotifications);

  return (
    <div className="flex justify-center items-start  h-screen bg-gray-100">
      <div className="max-w-md w-full mt-5 bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gray-800 p-4 text-white text-lg font-semibold rounded-t-lg">
          Notifications
        </div>
        <div className="max-h-96 mt-3 overflow-auto">
          {unreadNotifications?.length === 0 ? (
            <p className="text-center text-gray-600 py-4">
              No new notifications
            </p>
          ) : (
            unreadNotifications?.map((notification) => (
              <button key={notification.id} onClick={() => readNotificationHandler(notification?._id)} className="w-full">
                <div className="border-b cursor-pointer border-gray-200 px-6 py-3 hover:bg-gray-50 transition duration-300 ease-in-out flex items-start flex-col">
                  <p className="text-sm text-gray-800 font-medium">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default NotificationList;
