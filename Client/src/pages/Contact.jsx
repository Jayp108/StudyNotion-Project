import { useState } from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../services/apiconnector";
import { contactusEndpoint } from "../services/apis";
import toast from "react-hot-toast";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitContactForm = async (data) => {
    try {
      setLoading(true);
      const response = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        data
      );
      console.log("Contact Form Response...", response);
      toast.success("Message sent successfully");
      reset();
    } catch (error) {
      console.log("Error:", error.message);
      toast.error("Failed to send message");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-dark-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-dark-700 max-w-2xl mx-auto">
            We'd love to hear from you. Please fill out this form and we will
            get in touch with you shortly.
          </p>
        </div>

        <div className="bg-dark-100 border border-dark-200 rounded-lg p-8">
          <form onSubmit={handleSubmit(submitContactForm)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-dark-800 mb-2">
                  First Name <sup className="text-red-500">*</sup>
                </label>
                <input
                  type="text"
                  name="firstname"
                  placeholder="Enter first name"
                  {...register("firstname", { required: true })}
                  className="w-full px-4 py-3 bg-dark-50 border border-dark-200 rounded-md text-dark-900 placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                {errors.firstname && (
                  <span className="text-red-500 text-sm">
                    Please enter your first name
                  </span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-800 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastname"
                  placeholder="Enter last name"
                  {...register("lastname")}
                  className="w-full px-4 py-3 bg-dark-50 border border-dark-200 rounded-md text-dark-900 placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-800 mb-2">
                Email Address <sup className="text-red-500">*</sup>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter email address"
                {...register("email", { required: true })}
                className="w-full px-4 py-3 bg-dark-50 border border-dark-200 rounded-md text-dark-900 placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  Please enter your email address
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-800 mb-2">
                Phone Number <sup className="text-red-500">*</sup>
              </label>
              <input
                type="tel"
                name="phoneNo"
                placeholder="Enter phone number"
                {...register("phoneNo", { required: true })}
                className="w-full px-4 py-3 bg-dark-50 border border-dark-200 rounded-md text-dark-900 placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              {errors.phoneNo && (
                <span className="text-red-500 text-sm">
                  Please enter your phone number
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-800 mb-2">
                Message <sup className="text-red-500">*</sup>
              </label>
              <textarea
                name="message"
                placeholder="Enter your message here"
                rows="7"
                {...register("message", { required: true })}
                className="w-full px-4 py-3 bg-dark-50 border border-dark-200 rounded-md text-dark-900 placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              {errors.message && (
                <span className="text-red-500 text-sm">
                  Please enter your message
                </span>
              )}
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full px-6 py-3 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition font-semibold disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
