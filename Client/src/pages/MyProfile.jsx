import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../services/operations/profileAPI";
import { FiEdit } from "react-icons/fi";
import Spinner from "../components/common/Spinner";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getUserDetails(token, navigate));
    }
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-100 py-10">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dark-900">My Profile</h1>
          <p className="text-dark-700 mt-2">View and manage your profile information</p>
        </div>

        {/* Profile Picture and Basic Info */}
        <div className="bg-white rounded-lg border border-dark-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <img
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-20 h-20 rounded-full object-cover border-4 border-primary-500"
              />
              <div>
                <h2 className="text-2xl font-bold text-black">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-black">{user.email}</p>
              </div>
            </div>
            <button
              onClick={() => navigate("/dashboard/settings")}
              className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition"
            >
              <FiEdit />
              Edit
            </button>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-lg border border-dark-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-black">About</h3>
            <button
              onClick={() => navigate("/dashboard/settings")}
              className="flex items-center gap-2 text-primary-500 hover:text-primary-600 transition"
            >
              <FiEdit />
              Edit
            </button>
          </div>
          <p className="text-black">
            {user.additionalDetails?.about || "Write something about yourself"}
          </p>
        </div>

        {/* Personal Details */}
        <div className="bg-white rounded-lg border border-dark-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-black">Personal Details</h3>
            <button
              onClick={() => navigate("/dashboard/settings")}
              className="flex items-center gap-2 text-primary-500 hover:text-primary-600 transition"
            >
              <FiEdit />
              Edit
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-black mb-1">First Name</p>
              <p className="text-black font-medium">{user.firstName}</p>
            </div>
            <div>
              <p className="text-sm text-black mb-1">Last Name</p>
              <p className="text-black font-medium">{user.lastName}</p>
            </div>
            <div>
              <p className="text-sm text-black mb-1">Email</p>
              <p className="text-black font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-black mb-1">Phone Number</p>
              <p className="text-black font-medium">
                {user.additionalDetails?.contactNumber || "Add Phone Number"}
              </p>
            </div>
            <div>
              <p className="text-sm text-black mb-1">Gender</p>
              <p className="text-black font-medium">
                {user.additionalDetails?.gender || "Add Gender"}
              </p>
            </div>
            <div>
              <p className="text-sm text-black mb-1">Date of Birth</p>
              <p className="text-black font-medium">
                {user.additionalDetails?.dateofbirth || "Add Date of Birth"}
              </p>
            </div>
            <div>
              <p className="text-sm text-black mb-1">Account Type</p>
              <p className="text-black font-medium capitalize">{user.accountType}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
