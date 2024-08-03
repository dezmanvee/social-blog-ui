import axios from "axios";

const BASE_URL = 'http://localhost:8000/api/v1/posts'



//* create a post
export const createPostAPI = async (postData) => {
    const response = await axios.post(`${BASE_URL}/create`, postData, {withCredentials: true})
    return response.data;
}

//* fetch all posts
export const allPostsAPI = async(filterData) => {
    const response = await axios.get(BASE_URL, {
        params: filterData
    })
    return response.data
}

//*fetch a post
export const postAPI = async (postId) => {
    const response = await axios.get(`${BASE_URL}/${postId}`, {withCredentials: true})
    return response.data
}

//*update a post
export const updatePostAPI = async ({formData, postId}) => {
   
    const response = await axios.put(`${BASE_URL}/${postId}`,  formData, {withCredentials: true})
    return response.data 
}

//*delete a post
export const deletePostAPI = async(postId) => {
    const response = await axios.delete(`${BASE_URL}/${postId}`, {withCredentials: true})
    return response.data
}

//*Like a post
export const likePostAPI = async (postId) => {
   
    const response = await axios.put(`${BASE_URL}/like/${postId}`, {}, {withCredentials: true})
    return response.data 
}

//*Dislike a post
export const dislikePostAPI = async (postId) => {
   
    const response = await axios.put(`${BASE_URL}/dislike/${postId}`, {}, {withCredentials: true})
    return response.data 
}