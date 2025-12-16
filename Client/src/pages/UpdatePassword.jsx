import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/operations/authAPI";

function UpdatePassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { loading } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, token, navigate));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="max-w-md w-full space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-black">Choose new password</h1>
            <p className="text-black mt-3">
              Almost done. Enter your new password and youre all set.
            </p>
          </div>
          <form onSubmit={handleOnSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  New Password <sup className="text-red-500">*</sup>
                </label>
                <div className="relative">
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={handleOnChange}
                    placeholder="Enter Password"
                    className="w-full px-4 py-3 bg-dark-100 border border-dark-200 rounded-md text-black placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-black"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible fontSize={24} />
                    ) : (
                      <AiOutlineEye fontSize={24} />
                    )}
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Confirm New Password <sup className="text-red-500">*</sup>
                </label>
                <div className="relative">
                  <input
                    required
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleOnChange}
                    placeholder="Confirm Password"
                    className="w-full px-4 py-3 bg-dark-100 border border-dark-200 rounded-md text-black placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <span
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-black"
                  >
                    {showConfirmPassword ? (
                      <AiOutlineEyeInvisible fontSize={24} />
                    ) : (
                      <AiOutlineEye fontSize={24} />
                    )}
                  </span>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full mt-6 px-6 py-3 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition font-semibold"
            >
              Reset Password
            </button>
          </form>
          <div>
            <Link to="/login">
              <p className="text-black flex items-center gap-x-2">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdatePassword;
