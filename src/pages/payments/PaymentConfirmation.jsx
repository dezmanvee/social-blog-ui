import { paymentIntentAPI } from "../../API/payments/stripePaymentAPIs";
import { useQuery } from "@tanstack/react-query";
import { FaCheckCircle, FaSpinner, FaTimesCircle } from "react-icons/fa";
import { Link, useSearchParams } from "react-router-dom";

const PaymentConfirmation = () => {
    const [searchParams] = useSearchParams()
    const paymentIntentId = searchParams.get("payment_intent")
    const {data, error, isPending: isLoading, isError} = useQuery({
        queryKey: ['verify-payment'],
        queryFn: () => paymentIntentAPI(paymentIntentId)
    })
    console.log(data);
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-300">
      <div className="p-8 bg-white rounded-lg shadow-md max-w-md w-full">
        {isLoading ? (
          <div className="flex flex-col items-center space-y-4">
            <FaSpinner className="animate-spin text-4xl text-orange-500" />
            <p className="text-lg text-gray-600">
              Verifying your payment, please wait...
            </p>
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center space-y-4">
            <FaTimesCircle className="text-5xl text-red-500" />
            <p className="text-xl">Payment verification failed</p>
            <p className="text-red-500">{error.message}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <FaCheckCircle className="text-5xl text-green-500 animate-bounce" />
            <h1 className="text-2xl font-bold">{data?.message}</h1>
            <p className="text-gray-600">
              Thank you for your payment. Your transaction ID is{" "}
              <strong>{paymentIntentId}</strong>.
            </p>
            <Link
              to="/dashboard/create-post"
              className="w-full flex items-center justify-center py-2 px-4 bg-orange-500 text-white rounded hover:bg-orange-600 focus:outline-none"
            >
              Start Creating
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
export default PaymentConfirmation;
