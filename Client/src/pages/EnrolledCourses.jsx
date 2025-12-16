import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getEnrolledCourses } from "../services/operations/profileAPI";
import Spinner from "../components/common/Spinner";
import { FiClock, FiBarChart } from "react-icons/fi";

const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      setLoading(true);
      try {
        const courses = await getEnrolledCourses(token);
        setEnrolledCourses(courses);
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
      }
      setLoading(false);
    };

    fetchEnrolledCourses();
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-100 py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dark-900">Enrolled Courses</h1>
          <p className="text-dark-700 mt-2">
            {enrolledCourses.length} course{enrolledCourses.length !== 1 ? "s" : ""} enrolled
          </p>
        </div>

        {/* Courses List */}
        {enrolledCourses.length === 0 ? (
          <div className="bg-white rounded-lg border border-dark-200 p-12 text-center">
            <p className="text-dark-700 text-lg mb-4">You haven't enrolled in any courses yet</p>
            <button
              onClick={() => navigate("/catalog")}
              className="px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition"
            >
              Browse Courses
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {enrolledCourses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-lg border border-dark-200 overflow-hidden hover:shadow-lg transition cursor-pointer"
                onClick={() => navigate(`/view-course/${course._id}`)}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Course Thumbnail */}
                  <div className="md:w-80 h-48 md:h-auto">
                    <img
                      src={course.thumbnail}
                      alt={course.courseName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Course Details */}
                  <div className="flex-1 p-6">
                    <h3 className="text-xl font-bold text-black mb-2">
                      {course.courseName}
                    </h3>
                    <p className="text-black mb-4 line-clamp-2">
                      {course.courseDescription}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-black">
                      <div className="flex items-center gap-1">
                        <FiClock className="w-4 h-4" />
                        <span>{course.totalDuration || "N/A"}</span>
                      </div>
                      {course.progressPercentage !== undefined && (
                        <div className="flex items-center gap-2">
                          <FiBarChart className="w-4 h-4" />
                          <span>Progress: {course.progressPercentage}%</span>
                        </div>
                      )}
                    </div>

                    {/* Progress Bar */}
                    {course.progressPercentage !== undefined && (
                      <div className="mt-4">
                        <div className="w-full bg-dark-200 rounded-full h-2">
                          <div
                            className="bg-primary-500 h-2 rounded-full transition-all"
                            style={{ width: `${course.progressPercentage}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrolledCourses;
