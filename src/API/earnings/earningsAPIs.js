import axios from "axios";

const BASE_URL = 'http://localhost:8000/api/v1/earnings';



//* fetch all earnings
export const allEarningsAPI = async() => {
    const response = await axios.get(BASE_URL)
    return response.data
}

//* fetch my earnings
export const myEarningsAPI = async() => {
    const response = await axios.get(`${BASE_URL}/my-earnings`, {withCredentials: true})
    return response.data
}
