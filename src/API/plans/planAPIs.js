import axios from "axios";

const BASE_URL = 'http://localhost:8000/api/v1/plans'



//* create a catgegory
export const createPlanAPI = async (planData) => {
    const response = await axios.post(`${BASE_URL}/create`, planData, {withCredentials: true})
    return response.data;
}

//* fetch all catgegories
export const allPlansAPI = async() => {
    const response = await axios.get(BASE_URL)
    return response.data
}

//* fetch a single plan
export const planAPI = async(planId) => {
    const response = await axios.get(`${BASE_URL}/${planId}`)
    return response.data
}
