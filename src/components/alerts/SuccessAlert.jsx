import { AiOutlineCheckCircle } from "react-icons/ai";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const SuccessAlert = ({ success, successMsg }) => {
  return (
    <Alert
      variant="success"
      className="relative gap-2 flex rounded-xl flex-row items-start pl-3 py-2 h-auto font-semibold text-black px-4 bg-white border overflow-hidden border-transparent cursor-text border-l-4 border-l-green-500"
    >
      <div>
        <AiOutlineCheckCircle className="w-6 h-6 text-green-500" />
      </div>
      <div className="flex items-start flex-col gap-1">
        <AlertTitle className="text-green-500">{success}</AlertTitle>
        <AlertDescription className=" ">{successMsg}</AlertDescription>
      </div>
    </Alert>
  );
};
export default SuccessAlert;
