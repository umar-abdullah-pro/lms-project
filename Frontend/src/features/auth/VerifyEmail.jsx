import { useEffect } from "react";
import { Form, useActionData, useNavigation, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

const VerifyEmail = () => {
  const actionData = useActionData();
  const navigation = useNavigation();
  
  const { user, updateUser } = useAuth();
  
  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (actionData?.success && user && !user.isEmailVerified) {
      updateUser({ ...user, isEmailVerified: true });
    }
  }, [actionData?.success, user, updateUser]);

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-[#f8f9fa]">
      <div className="w-full max-w-md p-8 bg-white border border-gray-100 shadow-xl rounded-3xl">
        
        <h2 className="mb-2 text-3xl font-extrabold text-center text-gray-900">
          Verify Email
        </h2>
        
        <p className="mb-8 text-center text-gray-500">
          Please click the button below to verify your email address and activate your account.
        </p>

        {/* Error Banner */}
        {actionData?.error && (
          <div className="p-4 mb-6 text-sm font-bold text-center text-red-700 bg-red-50 rounded-xl">
            {actionData.message}
          </div>
        )}

        {/* Success Banner */}
        {actionData?.success && (
          <div className="p-4 mb-6 text-sm font-bold text-center text-green-700 bg-green-50 rounded-xl">
            {actionData.message}
          </div>
        )}

        {/* Form Submission */}
        {!actionData?.success && (
          <Form method="PUT">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 font-bold text-white transition-all bg-[#6366f1] rounded-xl hover:bg-opacity-90 disabled:opacity-50"
            >
              {isSubmitting ? "Verifying..." : "Verify My Email"}
            </button>
          </Form>
        )}

        {/* Back to Login / Proceed */}
        <div className="mt-6 text-center">
          <Link to="/login" className="font-bold text-[#6366f1] hover:underline">
            {actionData?.success ? "Proceed to Login" : "Back to Login"}
          </Link>
        </div>

      </div>
    </div>
  );
};

export default VerifyEmail;