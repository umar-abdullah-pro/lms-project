import { useState, useEffect } from "react";
import apiClient from "../../api/client";
import { HiStar, HiOutlineStar } from "react-icons/hi2";

const CourseReviews = ({ courseId, isEnrolled, progressPercentage }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [error, setError] = useState(null);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const { data } = await apiClient.get(`/courses/${courseId}/reviews`);
      if (data.success) {
        setReviews(data.data);
        // We will assume the user has not reviewed until we check the backend or their token
        // In a real app we might check if user._id matches any review.student._id
      }
    } catch (err) {
      console.error("Failed to fetch reviews", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [courseId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      setError("Please select a rating.");
      return;
    }
    if (!comment.trim()) {
      setError("Please write a review comment.");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      const { data } = await apiClient.post(`/courses/${courseId}/reviews`, {
        rating,
        comment,
      });
      if (data.success) {
        setHasReviewed(true);
        fetchReviews(); // Refresh list
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  const isCompleted = progressPercentage === 100;

  // We could check if user already left a review by parsing the reviews array if we have the user context
  // For simplicity, we just rely on `hasReviewed` local state and backend duplicate prevention.

  return (
    <div className="mt-12">
      <h2 className="mb-8 text-2xl font-extrabold text-gray-900">Course Reviews</h2>

      {/* Review Form */}
      {isEnrolled && isCompleted && !hasReviewed && (
        <div className="p-6 mb-8 bg-white border border-gray-100 shadow-sm rounded-2xl">
          <h3 className="mb-4 text-lg font-bold text-gray-900">Leave a Review</h3>
          {error && <div className="p-3 mb-4 text-sm text-red-600 bg-red-50 rounded-lg">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="p-1 focus:outline-none"
                >
                  {star <= (hoverRating || rating) ? (
                    <HiStar className="w-8 h-8 text-yellow-400" />
                  ) : (
                    <HiOutlineStar className="w-8 h-8 text-gray-300" />
                  )}
                </button>
              ))}
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What did you think of this course?"
              className="w-full p-4 mb-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-purple focus:outline-none"
              rows={4}
            />
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 font-bold text-white transition-all bg-brand-purple rounded-xl hover:bg-brand-purple/90 disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      )}

      {/* Reviews List */}
      {loading ? (
        <p className="text-gray-500">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <div className="p-8 text-center bg-white border border-gray-100 shadow-sm rounded-2xl text-gray-500">
          <p className="font-medium">No reviews yet. Be the first to review this course!</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {reviews.map((review) => (
            <div key={review._id} className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden shrink-0">
                  {review.student?.avatar ? (
                    <img src={review.student.avatar} alt="Avatar" className="object-cover w-full h-full" />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-lg font-bold text-gray-500 bg-gray-100">
                      {review.student?.name?.charAt(0)?.toUpperCase()}
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{review.student?.name}</h4>
                  <div className="flex items-center gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <HiStar
                        key={star}
                        className={`w-4 h-4 ${star <= review.rating ? "text-yellow-400" : "text-gray-200"}`}
                      />
                    ))}
                    <span className="ml-2 text-xs text-gray-400">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseReviews;
