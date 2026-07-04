import { useEffect } from "react";
import { useNavigation, useActionData, Form } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const UpdateProfile = () => {
  const actionData = useActionData();
  const navigation = useNavigation();

  const { user, updateUser } = useAuth();
  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (actionData?.success && actionData.updatedUserData) {
      updateUser(actionData.updatedUserData);
      alert("Profile updated successfully!");
    }
  }, [actionData, updateUser]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-brand-beige md:px-12">
      <div className="w-full max-w-xl p-10 bg-white border border-gray-100 shadow-sm rounded-4xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-20 h-20 overflow-hidden bg-white border-2 rounded-full border-brand-purple/20">
            <img
              // Use their avatar, or a fallback robot if they somehow don't have one!
              src={
                user.avatar ||
                `https://api.dicebear.com/7.x/bottts/svg?seed=${user.name}`
              }
              alt={user.name}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Your Profile
            </h2>
            <p className="font-medium text-gray-500 capitalize">
              {user?.role} Account
            </p>
          </div>
        </div>

        {/* Show Errors from Action */}
        {actionData?.error && (
          <div className="p-4 mb-6 text-sm font-medium text-red-600 bg-red-50 rounded-xl">
            {actionData.error}
          </div>
        )}

        {/* The Form */}
        <Form method="post" className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              defaultValue={user?.name} // Pre-fills the input!
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
              defaultValue={user?.email} // Pre-fills the input!
              className="w-full px-4 py-3 transition-colors bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 mt-4 text-white font-bold bg-brand-purple rounded-full hover:bg-indigo-700 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {isSubmitting ? "Saving changes..." : "Save Profile"}
          </button>
        </Form>
      </div>
    </div>
  );
};

export default UpdateProfile;
