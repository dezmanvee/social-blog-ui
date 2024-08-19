import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const LoadingAlert = ({ loading, loadingMsg }) => {
  return (
    <Alert
      variant="loading"
      className="relative gap-2 flex rounded-xl flex-row items-center pl-3 h-auto text-white px-4 overflow-hidden bg-background-subtle gray-700 border border-transparent cursor-text border-l-4 border-l-white"
    >
      <div>
        <AiOutlineLoading3Quarters className=" animate-spin w-6 h-6 text-white" />
      </div>
      <div className="flex items-start flex-col gap-1">
        <AlertTitle>{loading}</AlertTitle>
        <AlertDescription className="text-slate-400">
          {loadingMsg}
        </AlertDescription>
      </div>
    </Alert>
  );
};
export default LoadingAlert;
