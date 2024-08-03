import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"

const LoadingAlert = ({loading, loadingMsg}) => {
  return (
    <Alert variant="loading" className="bg-blue-100 mb-2">
    <AiOutlineLoading3Quarters className=" animate-spin text-xl text-blue-600" />
    <AlertTitle className="text-blue-600">{loading}</AlertTitle>
    <AlertDescription className="text-blue-600">
      {loadingMsg}
    </AlertDescription>
  </Alert>
  )
}
export default LoadingAlert