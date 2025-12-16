import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiConnector } from "../services/apiconnector";
import { catalogData } from "../services/apis";
import Spinner from "../components/common/Spinner";
import { FiClock, FiUser } from "react-icons/fi";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [categoryPageData, setCategoryPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryPageData = async () => {
      setLoading(true);
      try {
        const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, {
          categoryId,
        });
        console.log("CATEGORY PAGE DATA:", response);
        if (response?.data?.success) {
          setCategoryPageData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching category page data:", error);
      }
      setLoading(false);
    };

    fetchCategoryPageData();
  }, [categoryId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (!categoryPageData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-dark-700">Category not found</p>
      </div>
    );
  }

  const { selectedCategory, differentCategories } = categoryPageData;

  return (
    <div className="min-h-screen bg-dark-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">{selectedCategory?.name}</h1>
          <p className="text-lg opacity-90">{selectedCategory?.description}</p>
          <p className="mt-4 text-sm">
            {selectedCategory?.courses?.length || 0} courses available
          </p>
        </div>
      </div>

      {/* Courses in Selected Category */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-dark-900 mb-6">Courses</h2>
        {selectedCategory?.courses?.length === 0 ? (
          <p className="text-dark-700">No courses available in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedCategory?.courses?.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-lg border border-dark-200 overflow-hidden hover:shadow-lg transition cursor-pointer"
                onClick={() => navigate(`/courses/${course._id}`)}
              >
                <img
                  src={course.thumbnail}
                  alt={course.courseName}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-dark-900 mb-2 line-clamp-2">
                    {course.courseName}
                  </h3>
                  <p className="text-sm text-dark-700 mb-3 line-clamp-2">
                    {course.courseDescription}
                  </p>
                  <div className="flex items-center justify-between text-sm text-dark-600 mb-3">
                    <div className="flex items-center gap-1">
                      <FiUser className="w-4 h-4" />
                      <span>{course.instructor?.firstName} {course.instructor?.lastName}</span>
                    </div>
                    {course.studentsEnrolled && (
                      <div className="flex items-center gap-1">
                        <span>{course.studentsEnrolled.length} students</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary-500">
                      ₹{course.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Other Categories */}
      {differentCategories && differentCategories.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-12 border-t border-dark-200">
          <h2 className="text-2xl font-bold text-dark-900 mb-6">
            Explore Other Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentCategories.slice(0, 4).map((category) => (
              <div
                key={category._id}
                className="bg-white rounded-lg border border-dark-200 p-6 hover:shadow-lg transition cursor-pointer"
                onClick={() => navigate(`/catalog/${category._id}`)}
              >
                <h3 className="text-lg font-bold text-dark-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-dark-700 mb-3">{category.description}</p>
                <p className="text-sm text-primary-500 font-medium">
                  {category.courses?.length || 0} courses
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
