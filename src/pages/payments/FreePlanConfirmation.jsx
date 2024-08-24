import LoadingAlert from "../../components/alerts/LoadingAlert";
import DangerAlert from "../../components/alerts/DangerAlert";
import { FaGift } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { freePaymentAPI } from "../../API/payments/stripePaymentAPIs";
import { Link } from "react-router-dom";
import { PaymentSuccess02Icon, SwimmingIcon } from "hugeicons-react";

const FreePlanConfirmation = () => {
  const { data, error, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["free-plan-payment"],
    queryFn: freePaymentAPI,
  });
  console.log(data);
  return (

    <div className="m-auto w-ful min-h-screen bg-color p-8">
      <div className="w-full flex items-center justify-center">
        <Link
          className="flex items-center relative mt-0.5 lg:mt-0 w-auto px-10 py-8 lg:w-full pointer-events-none"
          to="/"
        >
          <SwimmingIcon className="h-8 w-auto text-slate-300" />
          <div className="text-white text-2xl font-bold">
            <span>Dev</span>
            <span className="text-gray-400 text-xl font-semibold">ware</span>
          </div>
        </Link>
      </div>

      <div className="flex items-center justify-center w-full">
        {isLoading ? (
          <div className="w-96 flex justify-center items-center">
            <LoadingAlert
              loading="Loading"
              loadingMsg="Verifying your payment, please wait..."
            />
          </div>
        ) : isError ? (
          <div className="w-96 flex justify-center items-center">
            <DangerAlert
              error="Error"
              errorMsg={error?.response?.data?.message || error?.message}
            />
          </div>
        ) : (
          <div className="p-8 bg-background-subtle border border-gray-600 rounded-2xl shadow-md max-w-md w-full">
            <div className="flex flex-col items-center space-y-4">
              <PaymentSuccess02Icon className="w-12 h-12 text-green-500 animate-bounce" />
              <h1 className="text-2xl text-slate-200 font-bold text-center">
                {data?.message}
              </h1>
              <p className="text-slate-200">
                You're now on the Free Plan. Enjoy exploring posts with limited
                features. Upgrade anytime for full access.
              </p>
              <Link
                to="/dashboard/create-post"
                className="w-full h-12 mt-8 flex items-center justify-center py-2 px-4 bg-gray-800 border-l-4 border-green-500 hover:border-white text-white font-bold rounded-xl hover:bg-gray-700 focus:outline-none"
              >
                Happy blogging!
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default FreePlanConfirmation;
