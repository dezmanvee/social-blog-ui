import { verifyEmailTokenAPI } from "../../API/users/userAPIs";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";

const AccountVerification = () => {
  //Get the token from the url
  const { emailToken } = useParams();
  const navigate = useNavigate()

  const verifyEmailTokenMutation = useMutation({
    mutationKey: ["verify-email-token"],
    mutationFn: verifyEmailTokenAPI,
  });

  const handleEmailVerifyToken = async () => {
    verifyEmailTokenMutation
      .mutateAsync(emailToken)
      .then(() => {
        navigate('/dashboard')
      })
      .catch((e) => console.log(e));
  };
  console.log(verifyEmailTokenMutation);
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
      } flex items-center justify-center h-screen bg-gradient-to-r from-orange-400 to-orange-500`}
    >
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-sm text-center">
        <FaCheckCircle className="mx-auto text-orange-500 text-6xl animate-bounce" />
        <h2 className="text-2xl font-semibold text-gray-700 mt-4">
          Account Verified
        </h2>
        <p className="mt-2 text-gray-600">
          Account verification process completed!
        </p>
        {/* <Link to="/dashboard" onClick={handleEmailVerifyToken}> */}
          <button onClick={handleEmailVerifyToken} className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center">
            <AiOutlineDashboard className="mr-2" /> Go to Dashboard
          </button>
        {/* </Link> */}
      </div>
    </div>
  );
};
export default AccountVerification;
