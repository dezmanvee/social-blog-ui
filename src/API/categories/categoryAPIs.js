import axios from "axios";

const BASE_URL = 'http://localhost:8000/api/v1/categories';



//* create a catgegory
export const createCategoryAPI = async (postData) => {
    const response = await axios.post(`${BASE_URL}/create`, postData, {withCredentials: true})
    return response.data;
}

//* fetch all catgegories
export const allCatgegoryAPI = async() => {
    const response = await axios.get(BASE_URL)
    return response.data
}
