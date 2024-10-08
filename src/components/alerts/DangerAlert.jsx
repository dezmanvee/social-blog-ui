import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const DangerAlert = ({ error, errorMsg }) => {
  return (
    <Alert
      variant="destructive"
      className="relative gap-2 flex rounded-xl flex-row items-center pl-3 h-auto py-2 font-semibold text-black px-4 bg-white border overflow-hidden border-transparent cursor-text border-l-4 border-l-red-500"
    >
      <div>
        <ExclamationTriangleIcon className="!h-5 !w-5 text-red-500" />
      </div>
      <div className="flex items-start flex-col gap-1">
        <AlertTitle className="text-red-500">{error}</AlertTitle>
        <AlertDescription>{errorMsg}</AlertDescription>
      </div>
    </Alert>
  );
};
export default DangerAlert;
