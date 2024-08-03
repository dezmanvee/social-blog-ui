import { AiOutlineCheckCircle } from "react-icons/ai";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"

const SuccessAlert = ({success, successMsg}) => {
  return (
    <Alert variant="success" className="bg-green-100 mb-2">
    <AiOutlineCheckCircle className="text-xl text-green-700" />
    <AlertTitle className="text-green-700">{success}</AlertTitle>
    <AlertDescription className="text-green-700">
      {successMsg}
    </AlertDescription>
  </Alert>
  )
}
export default SuccessAlert