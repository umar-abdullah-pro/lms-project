import { Form, Link, useActionData, useNavigation } from "react-router-dom";

const ForgotPassword = () => {
  const actionData = useActionData(); // Grabs the return value from forgotPasswordAction
  const navigation = useNavigation();
  
  // React Router automatically knows when the form is submitting
  const isLoading = navigation.state === "submitting"; 

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-brand-beige">
      <div className="w-full max-w-md p-8 bg-white border border-gray-100 shadow-xl rounded-3xl">
        <h2 className="mb-2 text-3xl font-extrabold text-center text-gray-900">
          Forgot Password
        </h2>
        <p className="mb-8 text-center text-gray-500">
          Enter your email and we'll send you a link to reset your password.
        </p>

        {actionData?.success && (
          <div className="p-4 mb-6 text-sm font-bold text-green-700 bg-green-50 rounded-xl">
            {actionData.message}
          </div>
        )}
        
        {actionData?.error && (
          <div className="p-4 mb-6 text-sm font-bold text-red-700 bg-red-50 rounded-xl">
            {actionData.error}
          </div>
        )}

        {/* Changed to React Router's <Form> component */}
        <Form method="post" className="flex flex-col gap-5">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-bold text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email" // 'name' attribute is REQUIRED for the action to read the data
              required
              className="w-full px-4 py-3 text-gray-900 transition-colors border-2 border-gray-200 outline-none rounded-xl focus:border-brand-purple focus:ring-0"
              placeholder="you@example.com"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 mt-2 font-bold text-white transition-all bg-brand-purple rounded-xl hover:bg-opacity-90 disabled:opacity-70"
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </Form>

        <div className="mt-8 text-center">
          <Link to="/login" className="font-bold hover:underline text-brand-purple">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;