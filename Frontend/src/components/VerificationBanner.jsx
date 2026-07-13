import { useEffect, useState } from "react";
import { useFetcher, useLocation } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";

const VerificationBanner = () => {
  const { user } = useAuth();
  const fetcher = useFetcher(); // Use React Router's fetcher for background actions
  const [bannerMessage, setBannerMessage] = useState("");

  // Listen for the result of the fetcher action
  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      setBannerMessage(fetcher.data.message);
    }
  }, [fetcher.state, fetcher.data]);

  const location = useLocation();

  if (!user || user.isEmailVerified || location.pathname.startsWith("/verify-email")) {
    return null;
  }

  const isSending = fetcher.state === "submitting";

  return (
    <div className="flex flex-col items-center justify-center w-full gap-3 py-3 text-sm font-bold text-center text-red-800 bg-red-100 border-b border-red-200 shadow-sm sm:flex-row sm:px-6">
      <span>
        ⚠️ Please verify your email address to purchase or create courses.
      </span>
      
      {bannerMessage && fetcher.data?.success ? (
        <span className="px-3 py-1 text-xs text-white bg-green-600 rounded-md">
          {bannerMessage}
        </span>
      ) : (
        // fetcher.Form submits to the root route ("/") by default since we are in the root layout
        <fetcher.Form method="POST" action="/">
          <button 
            type="submit"
            disabled={isSending}
            className="px-4 py-1.5 text-xs text-white transition-all bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 shadow-sm"
          >
            {isSending ? "Sending..." : "Send Verification Link"}
          </button>
        </fetcher.Form>
      )}

      {/* Show error message if it fails */}
      {bannerMessage && !fetcher.data?.success && (
        <span className="px-3 py-1 text-xs text-white bg-red-600 rounded-md">
          {bannerMessage}
        </span>
      )}
    </div>
  );
};

export default VerificationBanner;