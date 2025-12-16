import { useState, useEffect } from "react";
import { apiConnector } from "../../../services/apiconnector";
import { ratingsEndpoints } from "../../../services/apis";
import { FiStar } from "react-icons/fi";
import Spinner from "../../common/Spinner";

const CourseReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await apiConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API);
        if (response.data.success) {
          setReviews(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
      setLoading(false);
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner />
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-dark-700">No reviews yet</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews.map((review) => (
        <div key={review._id} className="bg-white rounded-lg border border-dark-200 p-6">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={review.user?.image}
              alt={review.user?.firstName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-dark-900">
                {review.user?.firstName} {review.user?.lastName}
              </p>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => (
                  <FiStar
                    key={index}
                    className={`w-4 h-4 ${
                      index < review.rating
                        ? "fill-primary-500 text-primary-500"
                        : "text-dark-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          <p className="text-dark-700 text-sm mb-2">{review.review}</p>
          <p className="text-xs text-dark-600">
            Course: {review.course?.courseName}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CourseReviews;
