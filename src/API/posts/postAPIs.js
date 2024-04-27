import axios from "axios";

const BASE_URL = 'http://localhost:8000/api/v1/posts'



//* create a post
export const createPostAPI = async (postData) => {
    const response = await axios.post(`${BASE_URL}/create`, {
        description: postData.description
    })
    return response.data;
}

//* fetch all posts
export const allPostsAPI = async() => {
    const response = await axios.get(BASE_URL)
    return response.data
}

//*fetch a post
export const postAPI = async (postId) => {
    const response = await axios.get(`${BASE_URL}/${postId}`)
    return response.data
}

//*update a post
export const updatePostAPI = async (postData) => {
   
    const response = await axios.put(`${BASE_URL}/${postData?.postId}`, {
        title: postData.title,
        description: postData.description
    })
    return response.data 
}

//*delete a post
export const deletePostAPI = async(postId) => {
    const response = await axios.delete(`${BASE_URL}/${postId}`)
    return response.data
}