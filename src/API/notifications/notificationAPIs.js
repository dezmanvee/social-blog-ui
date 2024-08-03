import axios from "axios";

const BASE_URL = 'http://localhost:8000/api/v1/notifications';



//* create a notification
export const updateNotificationAPI = async(notificationId) => {
    const response = await axios.put(`${BASE_URL}/${notificationId}`, {})
    return response.data;
}

//* fetch all notifications
export const allNotificationsAPI = async() => {
    const response = await axios.get(`${BASE_URL}`)
    return response.data
}
