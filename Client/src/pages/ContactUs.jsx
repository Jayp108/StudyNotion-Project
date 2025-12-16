import { useState } from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../services/apiconnector";
import { contactusEndpoint } from "../services/apis";
import { toast } from "react-hot-toast";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
      if (response.data.success) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        reset();
      }
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error("Failed to send message. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-dark-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-dark-900 mb-4">Get in Touch</h1>
          <p className="text-lg text-dark-700">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg border border-dark-200 p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-primary-100 rounded-full">
                  <FiMail className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-dark-900 mb-1">Email</h3>
                  <p className="text-dark-700">info@studynotion.com</p>
                  <p className="text-dark-700">support@studynotion.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-primary-100 rounded-full">
                  <FiPhone className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-dark-900 mb-1">Phone</h3>
                  <p className="text-dark-700">+91 1234567890</p>
                  <p className="text-dark-700">+91 0987654321</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary-100 rounded-full">
                  <FiMapPin className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-dark-900 mb-1">Address</h3>
                  <p className="text-dark-700">
                    123 Learning Street<br />
                    Education City<br />
                    India - 110001
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Need Help?</h3>
              <p className="text-sm mb-4">
                Our support team is available 24/7 to assist you with any questions or concerns.
              </p>
              <button className="px-4 py-2 bg-white text-primary-500 rounded-md hover:bg-dark-50 transition font-semibold">
                Chat with Support
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-dark-200 p-8">
              <h2 className="text-2xl font-bold text-dark-900 mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-800 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      {...register("firstname", { required: "First name is required" })}
                      className="w-full px-4 py-2 border border-dark-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter first name"
                    />
                    {errors.firstname && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstname.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-800 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      {...register("lastname", { required: "Last name is required" })}
                      className="w-full px-4 py-2 border border-dark-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter last name"
                    />
                    {errors.lastname && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastname.message}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-dark-800 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    className="w-full px-4 py-2 border border-dark-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter email address"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-800 mb-2">
                      Country Code *
                    </label>
                    <input
                      type="text"
                      {...register("countrycode", { required: "Country code is required" })}
                      className="w-full px-4 py-2 border border-dark-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="+91"
                    />
                    {errors.countrycode && (
                      <p className="text-red-500 text-sm mt-1">{errors.countrycode.message}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-dark-800 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      {...register("phoneNo", { required: "Phone number is required" })}
                      className="w-full px-4 py-2 border border-dark-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter phone number"
                    />
                    {errors.phoneNo && (
                      <p className="text-red-500 text-sm mt-1">{errors.phoneNo.message}</p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-dark-800 mb-2">
                    Message *
                  </label>
                  <textarea
                    {...register("message", { required: "Message is required" })}
                    rows="6"
                    className="w-full px-4 py-2 border border-dark-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter your message..."
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition font-semibold disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
