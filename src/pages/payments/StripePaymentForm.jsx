import { useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { stripePaymentAPI } from "../../API/payments/stripePaymentAPIs";
import DangerAlert from "../../components/alerts/DangerAlert";
import LoadingAlert from "../../components/alerts/LoadingAlert";

const StripePaymentForm = () => {
  const { planId } = useParams();
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);

  const stripePaymentMutation = useMutation({
    mutationKey: ["stripe-payment"],
    mutationFn: stripePaymentAPI,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (elements === null) {
      return;
    }

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();

    if (submitError) {
      // Show error to customer
      setErrorMessage(submitError.message);
      return;
    }

    // Create the PaymentIntent and obtain clientSecret from server endpoint
    try {
      stripePaymentMutation
        .mutateAsync(planId)
        .then(async () => {
          const {error} = await stripe.confirmPayment({
            elements,
            clientSecret: stripePaymentMutation?.data?.clientSecret,
            confirmParams: {
                return_url: 'http://localhost:3000/success'
            }
          });
          setErrorMessage(error?.message)
        })
        .catch((e) => console.log(e));
    } catch (error) {
        setErrorMessage(error?.message)
    }
  };
  console.log(stripePaymentMutation);
  return (
    <div className="bg-gray-100 h-screen -mt-4 flex justify-center items-center -z-10">
      <form
        onSubmit={handleSubmit}
        className="w-96 mx-auto my-4 p-6 bg-white rounded-lg shadow-md"
      >
        {/* Stripe payment element */}
        <div className="mb-4">
          <PaymentElement />
        </div>
        {/* Display loading */}
        {stripePaymentMutation?.isPending && (
          <LoadingAlert loading="loading" loadingMsg="Proccessing please wait..." />
        )} 

        {/* Display error */}
        {stripePaymentMutation?.isError && (
          <DangerAlert
            error="error"
            errorMsg={stripePaymentMutation?.error?.response?.data?.message}
          />
        )}
        <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Pay
        </button>
        {errorMessage && (
          <div className="text-red-500 mt-4">{errorMessage}</div>
        )}
      </form>
    </div>
  );
};
export default StripePaymentForm;
