import { useEffect } from "react";
import {
  useNavigation,
  useActionData,
  useNavigate,
  Form,
  Link,
} from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Register = () => {
  const actionData = useActionData();
  const { login } = useAuth();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (actionData?.success) {
      login({ userData: actionData.userData, userToken: actionData.userToken });
    }
  }, [actionData, login, navigate]);
  return (
    <div className="flex min-h-screen">
      {/* LEFT SIDE: Purple Branding Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-brand-purple p-12 flex-col justify-center">
        <div className="max-w-md mx-auto">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-8">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
            Join Learnly —{" "}
            <span className="underline decoration-brand-yellow decoration-4 underline-offset-8">
              start learning today.
            </span>
          </h1>
          <p className="text-brand-purple-100 text-lg text-white/80">
            Create an account to track your progress and unlock unlimited
            courses.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: Register Form */}
      <div className="flex items-center justify-center w-full p-8 lg:w-1/2 bg-brand-beige">
        <div className="w-full max-w-md p-10 bg-white border border-gray-100 shadow-sm rounded-4xl">
          <h2 className="mb-2 text-3xl font-extrabold text-gray-900">
            Sign up
          </h2>
          <p className="mb-8 font-medium text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-brand-purple hover:underline">
              Log in
            </Link>
          </p>

          {/* Show Errors from Action */}
          {actionData?.error && (
            <div className="p-4 mb-6 text-sm font-medium text-red-600 bg-red-50 rounded-xl">
              {actionData.error}
            </div>
          )}

          {/* The Form */}
          <Form method="post" className="space-y-5">
            <div>
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                className="w-full px-4 py-3 transition-colors bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@school.edu"
                className="w-full px-4 py-3 transition-colors bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                minLength="6"
                className="w-full px-4 py-3 transition-colors bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 mt-4 text-white font-bold bg-brand-coral rounded-full hover:bg-[#ff554a] transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
