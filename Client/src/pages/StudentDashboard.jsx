import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getEnrolledCourses } from "../services/operations/profileAPI";
import Spinner from "../components/common/Spinner";
import { FiBook, FiClock, FiAward } from "react-icons/fi";

const StudentDashboard = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const courses = await getEnrolledCourses(token);
        setEnrolledCourses(courses);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  // Calculate stats
  const totalCourses = enrolledCourses.length;
  const completedCourses = enrolledCourses.filter(
    (course) => course.progressPercentage === 100
  ).length;
  const inProgressCourses = totalCourses - completedCourses;

  return (
    <div className="min-h-screen bg-dark-100 py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dark-900">
            Welcome back, {user?.firstName}! 👋
          </h1>
          <p className="text-dark-700 mt-2">Track your learning progress and continue your courses</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-dark-200 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                <FiBook className="w-6 h-6 text-primary-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-black">{totalCourses}</p>
                <p className="text-black text-sm">Enrolled Courses</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-dark-200 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <FiClock className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-black">{inProgressCourses}</p>
                <p className="text-black text-sm">In Progress</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-dark-200 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <FiAward className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-black">{completedCourses}</p>
                <p className="text-black text-sm">Completed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Courses */}
        <div className="bg-white rounded-lg border border-dark-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-black">Your Courses</h2>
            <button
              onClick={() => navigate("/dashboard/enrolled-courses")}
              className="text-primary-500 hover:text-primary-600 transition font-medium"
            >
              View All
            </button>
          </div>

          {enrolledCourses.length === 0 ? (
            <div className="text-center py-12">
              <FiBook className="w-16 h-16 text-black mx-auto mb-4" />
              <p className="text-black text-lg mb-4">No courses enrolled yet</p>
              <button
                onClick={() => navigate("/catalog")}
                className="px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition"
              >
                Browse Courses
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.slice(0, 6).map((course) => (
                <div
                  key={course._id}
                  className="border border-dark-200 rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer"
                  onClick={() => navigate(`/view-course/${course._id}`)}
                >
                  <img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-black mb-2 line-clamp-1">
                      {course.courseName}
                    </h3>
                    <p className="text-sm text-black mb-3 line-clamp-2">
                      {course.courseDescription}
                    </p>

                    {/* Progress */}
                    <div className="mb-2">
                      <div className="flex justify-between text-sm text-black mb-1">
                        <span>Progress</span>
                        <span>{course.progressPercentage || 0}%</span>
                      </div>
                      <div className="w-full bg-dark-200 rounded-full h-2">
                        <div
                          className="bg-primary-500 h-2 rounded-full transition-all"
                          style={{ width: `${course.progressPercentage || 0}%` }}
                        />
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/view-course/${course._id}`);
                      }}
                      className="w-full mt-3 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition text-sm font-medium"
                    >
                      Continue Learning
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
