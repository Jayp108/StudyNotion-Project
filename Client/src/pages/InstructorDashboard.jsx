import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getInstructorDashboardData } from "../services/operations/profileAPI";
import Spinner from "../components/common/Spinner";
import { FiDollarSign, FiUsers, FiBook, FiTrendingUp } from "react-icons/fi";

const InstructorDashboard = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const coursesData = await getInstructorDashboardData(token);
        setCourses(coursesData);
      } catch (error) {
        console.error("Error fetching instructor data:", error);
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

  // Calculate overall stats
  const totalStudents = courses.reduce(
    (acc, course) => acc + course.totalStudentsEnrolled,
    0
  );
  const totalRevenue = courses.reduce(
    (acc, course) => acc + course.totalAmountGenerated,
    0
  );
  const totalCourses = courses.length;

  return (
    <div className="min-h-screen bg-dark-100 py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dark-900">
            Hi {user?.firstName} 👋
          </h1>
          <p className="text-dark-700 mt-2">Let's start something new today</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-dark-200 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                <FiBook className="w-6 h-6 text-primary-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-black">{totalCourses}</p>
                <p className="text-black text-sm">Total Courses</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-dark-200 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <FiUsers className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-black">{totalStudents}</p>
                <p className="text-black text-sm">Total Students</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-dark-200 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <FiDollarSign className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-black">₹{totalRevenue}</p>
                <p className="text-black text-sm">Total Revenue</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-dark-200 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <FiTrendingUp className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-black">
                  {totalCourses > 0 ? Math.round(totalStudents / totalCourses) : 0}
                </p>
                <p className="text-black text-sm">Avg. Students/Course</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg border border-dark-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-black mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate("/dashboard/add-course")}
              className="px-6 py-3 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition font-medium"
            >
              Create New Course
            </button>
            <button
              onClick={() => navigate("/dashboard/my-courses")}
              className="px-6 py-3 border border-dark-300 text-black rounded-md hover:bg-dark-100 transition font-medium"
            >
              Manage Courses
            </button>
          </div>
        </div>

        {/* Your Courses */}
        <div className="bg-white rounded-lg border border-dark-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-black">Your Courses</h2>
            <button
              onClick={() => navigate("/dashboard/my-courses")}
              className="text-primary-500 hover:text-primary-600 transition font-medium"
            >
              View All
            </button>
          </div>

          {courses.length === 0 ? (
            <div className="text-center py-12">
              <FiBook className="w-16 h-16 text-black mx-auto mb-4" />
              <p className="text-black  text-lg mb-4">You haven't created any courses yet</p>
              <button
                onClick={() => navigate("/dashboard/add-course")}
                className="px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition"
              >
                Create Your First Course
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-dark-200">
                    <th className="text-left py-3 px-4 text-black font-semibold">Course Name</th>
                    <th className="text-left py-3 px-4 text-black font-semibold">Description</th>
                    <th className="text-center py-3 px-4 text-black font-semibold">Students</th>
                    <th className="text-center py-3 px-4 text-black font-semibold">Revenue</th>
                    <th className="text-center py-3 px-4 text-black font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course._id} className="border-b border-dark-200 hover:bg-dark-50">
                      <td className="py-4 px-4">
                        <p className="font-medium text-black">{course.courseName}</p>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-black text-sm line-clamp-2 max-w-md">
                          {course.courseDescription}
                        </p>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                          <FiUsers className="w-4 h-4" />
                          {course.totalStudentsEnrolled}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                          <FiDollarSign className="w-4 h-4" />
                          ₹{course.totalAmountGenerated}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                          className="text-primary-500 hover:text-primary-600 transition font-medium text-sm"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
