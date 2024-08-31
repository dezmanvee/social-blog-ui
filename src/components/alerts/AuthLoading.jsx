import React from "react";
import { ImSpinner9 } from "react-icons/im";

const AuthLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-96 bg-background-subtle p-6 mt-6 mx-auto rounded-2xl">
      <ImSpinner9 className="animate-spin w-12 h-12 text-purple-500" />
      <p className="mt-4 text-lg text-purple-200 font-semibold">
        Verifying your authentication status... Please wait a moment
      </p>
    </div>
  );
};

export default AuthLoading;