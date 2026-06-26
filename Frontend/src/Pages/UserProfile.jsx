import { useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";

const UserProfile = () => {
  const { user, token } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));

    try {
      await axios.put("http://localhost:3000/api/users/profile", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="min-h-screen py-8 bg-gray-50 md:py-12">
      <div className="container max-w-3xl px-4 mx-auto">
        {/* Adjusted padding: p-6 on mobile, p-12 on desktop */}
        <div className="p-6 bg-white shadow-lg sm:p-8 md:p-12 rounded-[2rem]">
          {/* RESPONSIVE HEADER: Stacks on mobile, Row on larger screens */}
          <div className="flex flex-col items-start justify-between gap-6 mb-8 sm:flex-row sm:items-center sm:gap-4">
            {/* Title & Role Badge */}
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
              <h1 className="text-2xl font-extrabold text-gray-800 md:text-3xl">
                My Profile
              </h1>
              <span className="px-4 py-1 text-xs font-bold tracking-wide text-brand-purple bg-brand-purple/10 border border-brand-purple/20 rounded-full uppercase">
                {user?.role === "instructor" ? "Instructor" : "Student"}
              </span>
            </div>

            {/* Edit Button: Full width on mobile, auto width on desktop */}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="w-full px-6 py-2 text-sm font-bold transition-all border-2 rounded-full sm:w-auto text-brand-purple border-brand-purple hover:bg-brand-purple hover:text-white"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                defaultValue={user?.name}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border rounded-xl outline-none transition-all ${isEditing ? "bg-white border-gray-300 focus:border-brand-purple focus:ring-2" : "bg-gray-100 border-transparent text-gray-500 cursor-not-allowed"}`}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                defaultValue={user?.email}
                disabled={true}
                className="w-full px-4 py-3 text-gray-500 bg-gray-100 border border-transparent outline-none cursor-not-allowed rounded-xl"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                About Me (Bio)
              </label>
              <textarea
                name="bio"
                defaultValue={user?.bio}
                disabled={!isEditing}
                rows="5"
                className={`w-full px-4 py-3 border rounded-xl outline-none transition-all ${isEditing ? "bg-white border-gray-300 focus:border-brand-purple focus:ring-2" : "bg-gray-100 border-transparent text-gray-500 cursor-not-allowed"}`}
                placeholder="Add a bio..."
              ></textarea>
            </div>

            {isEditing && (
              <div className="flex justify-end pt-4">
                {/* Save Button: Full width on mobile */}
                <button
                  type="submit"
                  className="w-full px-8 py-3 text-lg font-bold text-white transition-all sm:w-auto bg-brand-coral rounded-full hover:bg-[#ff554a] hover:-translate-y-0.5"
                >
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
