import LoadingAlert from "../../components/alerts/LoadingAlert"
import DangerAlert from "../../components/alerts/DangerAlert"
import { FaGift } from "react-icons/fa"
import { useQuery } from "@tanstack/react-query"
import { freePaymentAPI } from "../../API/payments/stripePaymentAPIs"
import { Link } from "react-router-dom"

const FreePlanConfirmation = () => {
    const {data, error, isError, isLoading, isSuccess} = useQuery({
        queryKey: ['free-plan-payment'],
        queryFn: freePaymentAPI
    })
    console.log(data)
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      {/* show loading */}
      {isLoading && (
        <LoadingAlert loading="loading" loadingMsg="Processing free plan.." />
      )}
      {isError && (
        <DangerAlert
          error="error"
          errorMsg="Something went wrong, try again later..."
        />
      )}
      {isSuccess && (
        <div className="p-8 bg-white rounded shadow-md w-80">
          <FaGift className="w-16 h-16 mx-auto text-green-500" />

          <h2 className="mt-6 text-2xl font-semibold text-center text-green-700">
            Free Plan Activation
          </h2>

          <p className="mt-2 text-center text-gray-500">
            Proceed to activate your free plan.
          </p>
          <Link to="/dashboard/create-post">
            <button className="mt-8 w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none">
              Start Creating
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}
export default FreePlanConfirmation