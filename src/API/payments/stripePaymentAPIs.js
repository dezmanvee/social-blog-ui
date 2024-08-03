import axios from "axios";

const BASE_URL = 'http://localhost:8000/api/v1/payments'



//* Make payment
export const stripePaymentAPI = async (planId) => {
    const response = await axios.post(`${BASE_URL}/stripe-checkout`, 
    {subscriptionPlanId: planId}, 
    {withCredentials: true})
    return response.data;
}

//* Verify payment
export const paymentIntentAPI = async(paymentId) => {
    const response = await axios.get(`${BASE_URL}/verify/${paymentId}`, {withCredentials: true})
    return response.data
}

//* Free plan payment
export const freePaymentAPI = async() => {
    const response = await axios.get(`${BASE_URL}/free-plan`, {withCredentials: true})
    return response.data
}
