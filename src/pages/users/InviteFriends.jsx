import { useState } from "react";
import { Button } from "../../components/ui/button";
import SuccessAlert from "../../components/alerts/SuccessAlert";

const InviteFriends = () => {
  const [showAlert, setShowAlert] = useState(false);

  // Handle the clip to board button
  const handleCopyLink = () => {
    const urlText = "http://localhost:3000/"; // The devware URL to copy

    // Copy the link to the clipboard
    navigator.clipboard.writeText(urlText).then(() => {
      // Show the alert
      setShowAlert(true);

      // Hide the alert after 3 seconds
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    });
  };

  return (
    <section>
      {/* show alert for copied link */}
      {showAlert && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-[200]">
          <SuccessAlert successMsg="Invite link copied to clipboard!" />
        </div>
      )}
      <p className="mt-1 mb-4 text-slate-400">
        Invite your friends to join the platform! Click the button below to copy
        the invite link 🔗, share it with others, and help them explore and
        contribute to the community. The more, the merrier!
      </p>
      <div className="flex flex-col items-stretch my-5">
        <div className="group relative flex rounded-2xl flex-row items-center TextField_field__sbF77 pr-3 h-12 readOnly px-4 overflow-hidden bg-surface-float hover:bg-gray-800 border border-transparent border-l-4 hover:border-white hover:border-y-slate-600 hover:border-r-slate-600 cursor-text fields_field__Mnwg4">
          <div className="flex max-w-full flex-1 justify-between items-center mr-2">
            <p className="flex flex-1 text-ellipsis text-sm text-white min-w-0 bg-transparent">
              Your unique invite URL
            </p>
            <Button
              variant="outline"
              className="text-sm justify-center font-bold h-8 px-3 rounded-xl"
                onClick={handleCopyLink}
            >
              Copy link
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default InviteFriends;
