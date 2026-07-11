import { useState } from "react";
import {
  Form,
  useLoaderData,
  useNavigation,
  useActionData,
} from "react-router-dom";
import {
  FiVideo,
  FiAlertCircle,
  FiAlignLeft,
  FiFilm,
  FiUploadCloud,
  FiLoader,
  FiUpload,
} from "react-icons/fi";
import { PiLightning } from "react-icons/pi";

const ManageCourse = () => {
  const { course } = useLoaderData();
  const navigation = useNavigation();
  const actionData = useActionData();
  const isSubmitting = navigation.state === "submitting";

  const [fileName, setFileName] = useState("");

  return (
    <div className="max-w-2xl p-8 mx-auto mt-12 bg-white border border-gray-100 shadow-xl rounded-3xl">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 text-brand-purple bg-[#f0f2ff] rounded-2xl">
          <FiVideo className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            Add New Lesson
          </h1>
          <p className="mt-1 font-medium text-gray-500">
            To course:
            <span className="font-bold text-brand-purple">
              "{course.title}"
            </span>
          </p>
        </div>
      </div>
      {actionData?.error && (
        <div className="flex items-center gap-3 p-4 mb-6 text-sm font-bold text-red-700 bg-red-50 border border-red-100 rounded-xl">
          <FiAlertCircle className="shrink-0 w-5 h-5" />
          {actionData.error}
        </div>
      )}
      <Form method="post" encType="multipart/form-data" className="space-y-6">
        <div className="space-y-2">
          <label className="ml-1 text-sm font-bold text-gray-700">
            Lesson Title
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
              <PiLightning className="w-5 h-5" />
            </div>
            <input
              name="title"
              className="w-full py-4 pl-12 pr-4 transition-all border-2 border-gray-100 bg-gray-50 focus:border-brand-purple focus:bg-white focus:outline-none rounded-2xl"
              placeholder="e.g. Introduction to React"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="ml-1 text-sm font-bold text-gray-700">
            Description (Optional)
          </label>
          <div className="relative">
            <div className="absolute left-0 flex items-center pl-4 pointer-events-none top-4 text-gray-400">
              <FiAlignLeft className="w-5 h-5" />
            </div>
            <textarea
              name="description"
              rows="3"
              className="w-full py-4 pl-12 pr-4 transition-all resize-none border-2 border-gray-100 bg-gray-50 focus:border-brand-purple focus:bg-white focus:outline-none rounded-2xl"
              placeholder="What will students learn in this video?"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="ml-1 text-sm font-bold text-gray-700">
            Video File
          </label>

          <label
            className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-3xl cursor-pointer transition-all 
            ${fileName ? "border-brand-purple bg-[#f0f2ff]" : "border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-brand-purple"}`}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
              {fileName ? (
                <>
                  <div className="p-3 mb-3 text-white rounded-full bg-brand-purple">
                    <FiFilm className="w-6 h-6" />
                  </div>
                  <p className="max-w-xs px-4 text-sm font-bold truncate text-brand-purple">
                    {fileName}
                  </p>
                  <p className="mt-1 text-xs text-brand-purple/70">
                    Click to change video
                  </p>
                </>
              ) : (
                <>
                  <FiUploadCloud className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="mb-1 text-sm font-bold text-gray-700">
                    Click to select a video
                  </p>
                  <p className="text-xs text-gray-500">
                    MP4, WebM, or OGG files
                  </p>
                </>
              )}
            </div>
            <input
              type="file"
              name="video"
              accept="video/*"
              required
              className="hidden"
              onChange={(e) => setFileName(e.target.files[0]?.name || "")}
            />
          </label>
        </div>
        <button
          disabled={isSubmitting}
          className="relative flex items-center justify-center w-full gap-2 py-4 font-extrabold text-white transition-all rounded-2xl bg-brand-purple hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed group"
        >
          {isSubmitting ? (
            <>
              <FiLoader className="w-5 h-5 animate-spin" />
              Uploading the Video
            </>
          ) : (
            <>
              <FiUpload className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
              Publish Lesson
            </>
          )}
        </button>
      </Form>
    </div>
  );
};

export default ManageCourse;
