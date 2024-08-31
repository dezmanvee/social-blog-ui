import { verifyEmailTokenAPI } from "../../API/users/userAPIs";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  CheckmarkBadge03Icon,
  DashboardSquareSettingIcon,

} from "hugeicons-react";

const AccountVerification = () => {
  //Get the token from the url
  const { emailToken } = useParams();
  const navigate = useNavigate();

  const verifyEmailTokenMutation = useMutation({
    mutationKey: ["verify-email-token"],
    mutationFn: verifyEmailTokenAPI,
  });

  const handleEmailVerifyToken = async () => {
    verifyEmailTokenMutation
      .mutateAsync(emailToken)
        .then(() => {
          navigate("/dashboard/account/summary");
        })
        .catch((e) => console.log(e));
  };

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 1000); // delay for the fade-in effect
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      } flex items-center justify-center h-auto mx-auto mt-10 bg-transparent px-2`}
    >
      <div className="bg-background-subtle hover:bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-sm text-center">
        <CheckmarkBadge03Icon className="mx-auto text-green-500 h-10 w-10 animate-bounce" />
        <h2 className="text-2xl font-semibold text-white mt-4">
          Account Verified Successfully!
        </h2>
        <p className="mt-2 text-slate-400 ">
          Your account has been successfully verified! 🎉 You can now enjoy full
          access to all features. Thank you for verifying your email!
        </p>
        <button
           type="button"
          onClick={handleEmailVerifyToken}
          className="mt-6 w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-xl flex items-center justify-center"
        >
          <DashboardSquareSettingIcon className="mr-2 w-6 h-6" /> Start Exploring Now!
        </button>
      </div>
    </div>
  );
};
export default AccountVerification;
