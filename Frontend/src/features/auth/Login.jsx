import { HiOutlineBookOpen } from "react-icons/hi2";

import { useEffect } from "react";
import {
  Form,
  useNavigation,
  useActionData,
  useNavigate,
  Link,
} from "react-router-dom";
import { useAuth } from "./AuthContext";

const Login = () => {
  const actionData = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const isSubmitting = navigation.state === "submitting";
  useEffect(() => {
    if (actionData?.success) {
      login({ userData: actionData.userData, userToken: actionData.userToken });
      navigate("/dashboard");
    }
  }, [actionData, login, navigate]);

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 bg-brand-purple p-12 flex-col justify-center">
        <div className="max-w-md mx-auto">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-8">
            <HiOutlineBookOpen className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
            Welcome back — let's pick up
            <span className="underline decoration-brand-yellow decoration-4 underline-offset-8">
              right where you left off.
            </span>
          </h1>
          <p className="text-brand-purple-100 text-lg text-white/80">
            Your progress, streaks and saved lessons are all exactly how you
            left them.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: Login Form */}
      <div className="flex items-center justify-center w-full p-8 lg:w-1/2 bg-brand-beige">
        <div className="w-full max-w-md p-10 bg-white border border-gray-100 shadow-sm rounded-4xl">
          <h2 className="mb-2 text-3xl font-extrabold text-gray-900">Log in</h2>
          <p className="mb-8 font-medium text-gray-500">
            New to Learnly?
            <Link to="/register" className="text-brand-purple hover:underline">
              Create an account
            </Link>
          </p>
          {actionData?.error && (
            <div className="p-4 mb-6 text-sm font-medium text-red-600 bg-red-50 rounded-xl">
              {actionData.error}
            </div>
          )}
          <Form method="post" className="space-y-5">
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
                className="w-full px-4 py-3 transition-colors bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple"
                required
              />
            </div>
            
            <div className="flex justify-end mt-1 mb-4">
              <Link
                to="/forgot-password"
                className="text-sm font-bold text-brand-purple hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 mt-4 text-white font-bold bg-brand-coral rounded-full hover:bg-[#ff554a] transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {isSubmitting ? "Logging in..." : "Log in"}
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
