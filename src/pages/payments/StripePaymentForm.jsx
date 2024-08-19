import { useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Link, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { stripePaymentAPI } from "../../API/payments/stripePaymentAPIs";
import DangerAlert from "../../components/alerts/DangerAlert";
import LoadingAlert from "../../components/alerts/LoadingAlert";
import { SwimmingIcon } from "hugeicons-react";

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
          const { error } = await stripe.confirmPayment({
            elements,
            clientSecret: stripePaymentMutation?.data?.clientSecret,
            confirmParams: {
              return_url: "http://localhost:3000/success",
            },
          });
          setErrorMessage(error?.message);
        })
        .catch((e) => console.log(e));
    } catch (error) {
      setErrorMessage(error?.message);
    }
  };

  return (
    <div className="bg-color h-screen flex flex-col -z-10">
      <div className="w-full flex items-center justify-center">
        <Link
          className="flex items-center mt-0.5 lg:mt-0 w-auto px-10 py-8 lg:w-full pointer-events-none"
          to="/"
        >
          <SwimmingIcon className="h-8 w-auto text-slate-300" />
          <div className="text-white text-2xl font-bold">
            <span>Dev</span>
            <span className="text-gray-400 text-xl font-semibold">ware</span>
          </div>
        </Link>
      </div>

      <div className="flex flex-col justify-center items-center gap-4">
        {/* Alert Container */}
        <div className="w-96 flex justify-center items-center">
          {/* Display loading */}
          {stripePaymentMutation?.isPending && (
            <LoadingAlert
              loading="Loading"
              loadingMsg="Proccessing please wait..."
            />
          )}

          {/* Display error */}
          {stripePaymentMutation?.isError && (
            <DangerAlert
              error="Error"
              errorMsg={stripePaymentMutation?.error?.response?.data?.message}
            />
          )}
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-96 mx-auto my-4 p-6 bg-white border border-gray-600 rounded-xl shadow-md"
        >
          {/* Stripe payment element */}
          <div className="mb-4">
            <PaymentElement />
          </div>

          <button className="w-full py-2 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-violet-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
            Pay Now
          </button>
          {errorMessage && (
            <div className="text-red-500 mt-4 text-xs">{errorMessage}</div>
          )}
        </form>
      </div>
    </div>
  );
};
export default StripePaymentForm;
