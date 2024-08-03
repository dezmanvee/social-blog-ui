import axios from "axios";

const BASE_URL = 'http://localhost:8000/api/v1/comments';



//* create a comment
export const createCommentAPI = async (data) => {
    const response = await axios.post(`${BASE_URL}/create`, data, {withCredentials: true})
    return response.data;
}
