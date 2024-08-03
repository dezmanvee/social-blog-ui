import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

const DangerAlert = ({error, errorMsg}) => {
  return (
    <Alert variant="destructive" className="bg-red-100 mb-2">
    <ExclamationTriangleIcon className="h-4 w-4" />
    <AlertTitle>{error}</AlertTitle>
    <AlertDescription>
      {errorMsg}
    </AlertDescription>
  </Alert>
  )
}
export default DangerAlert

