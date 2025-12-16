import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPasswordResetToken } from "../services/operations/authAPI";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="max-w-md w-full space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-dark-900">
              {!emailSent ? "Reset your password" : "Check email"}
            </h1>
            <p className="text-dark-700 mt-3">
              {!emailSent
                ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                : `We have sent the reset email to ${email}`}
            </p>
          </div>
          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <div>
                <label className="block text-sm font-medium text-dark-800 mb-2">
                  Email Address <sup className="text-red-500">*</sup>
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full px-4 py-3 bg-dark-100 border border-dark-200 rounded-md text-dark-900 placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full mt-6 px-6 py-3 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition font-semibold"
            >
              {!emailSent ? "Submit" : "Resend Email"}
            </button>
          </form>
          <div>
            <Link to="/login">
              <p className="text-dark-700 flex items-center gap-x-2">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
