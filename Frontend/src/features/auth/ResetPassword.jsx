import { useEffect } from "react";
import { Form, useActionData, useNavigation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const actionData = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isLoading = navigation.state === "submitting";

  // Automatically redirect 3 seconds after a successful password reset
  useEffect(() => {
    if (actionData?.success) {
      const timer = setTimeout(() => navigate("/login"), 3000);
      return () => clearTimeout(timer);
    }
  }, [actionData, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-brand-beige">
      <div className="w-full max-w-md p-8 bg-white border border-gray-100 shadow-xl rounded-3xl">
        <h2 className="mb-2 text-3xl font-extrabold text-center text-gray-900">
          Set New Password
        </h2>
        <p className="mb-8 text-center text-gray-500">
          Please enter your new password below.
        </p>

        {actionData?.success && (
          <div className="p-4 mb-6 text-sm font-bold text-green-700 bg-green-50 rounded-xl">
            {actionData.message} Redirecting to login...
          </div>
        )}
        
        {actionData?.error && (
          <div className="p-4 mb-6 text-sm font-bold text-red-700 bg-red-50 rounded-xl">
            {actionData.error}
          </div>
        )}

        <Form method="put" className="flex flex-col gap-5">
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-700">
              New Password
            </label>
            <input
              type="password"
              id="password"
              name="password" // Required for React Router action
              required
              minLength="6"
              className="w-full px-4 py-3 text-gray-900 transition-colors border-2 border-gray-200 outline-none rounded-xl focus:border-brand-purple focus:ring-0"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-bold text-gray-700">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword" // Required for React Router action
              required
              minLength="6"
              className="w-full px-4 py-3 text-gray-900 transition-colors border-2 border-gray-200 outline-none rounded-xl focus:border-brand-purple focus:ring-0"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 mt-2 font-bold text-white transition-all bg-brand-purple rounded-xl hover:bg-opacity-90 disabled:opacity-70"
          >
            {isLoading ? "Saving..." : "Update Password"}
          </button>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;