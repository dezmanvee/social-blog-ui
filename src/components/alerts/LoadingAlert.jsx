import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const LoadingAlert = ({ loading, loadingMsg }) => {
  return (
    <Alert
      variant="loading"
      className="relative gap-2 flex rounded-xl flex-row items-center pl-3 py-2 h-auto font-semibold text-black px-4 bg-white overflow-hidden gray-700 border border-transparent cursor-text border-l-4 border-l-purple-400"
    >
      <div>
        <AiOutlineLoading3Quarters className=" animate-spin w-6 h-6 text-purple-400" />
      </div>
      <div className="flex items-start flex-col gap-1">
        <AlertTitle>{loading}</AlertTitle>
        <AlertDescription className="text-black">
          {loadingMsg}
        </AlertDescription>
      </div>
    </Alert>
  );
};
export default LoadingAlert;
