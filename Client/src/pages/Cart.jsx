import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiTrash2, FiShoppingCart } from "react-icons/fi";
import { removeFromCart, resetCart } from "../redux/slices/cartSlice";
import { toast } from "react-hot-toast";

const Cart = () => {
  const { cart, total, totalItems } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveFromCart = (courseId) => {
    dispatch(removeFromCart(courseId));
    toast.success("Course removed from cart");
  };

  const handleBuyCourse = () => {
    if (!token) {
      toast.error("Please login to purchase courses");
      navigate("/login");
      return;
    }
    // Navigate to payment page
    navigate("/dashboard/payment");
  };

  const handleClearCart = () => {
    const confirm = window.confirm("Are you sure you want to clear your cart?");
    if (confirm) {
      dispatch(resetCart());
      toast.success("Cart cleared");
    }
  };

  return (
    <div className="min-h-screen bg-dark-100 py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dark-900">Shopping Cart</h1>
          <p className="text-dark-700 mt-2">
            {totalItems} {totalItems === 1 ? "course" : "courses"} in cart
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-lg border border-dark-200 p-12 text-center">
            <FiShoppingCart className="w-16 h-16 text-dark-400 mx-auto mb-4" />
            <p className="text-black text-lg mb-4">Your cart is empty</p>
            <button
              onClick={() => navigate("/catalog")}
              className="px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition"
            >
              Browse Courses
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((course) => (
                <div
                  key={course._id}
                  className="bg-white rounded-lg border border-dark-200 overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Course Image */}
                    <div className="md:w-64 h-48 md:h-auto">
                      <img
                        src={course.thumbnail}
                        alt={course.courseName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Course Details */}
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-black mb-2">
                            {course.courseName}
                          </h3>
                          <p className="text-black text-sm line-clamp-2">
                            {course.courseDescription}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div>
                          <p className="text-2xl font-bold text-primary-500">
                            ₹{course.price}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemoveFromCart(course._id)}
                          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition"
                        >
                          <FiTrash2 />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-dark-200 p-6 sticky top-4">
                <h2 className="text-xl font-bold text-black mb-4">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-black">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>₹{total}</span>
                  </div>
                  <div className="flex justify-between text-black">
                    <span>Discount</span>
                    <span className="text-green-600">₹0</span>
                  </div>
                  <div className="border-t border-dark-200 pt-3 flex justify-between">
                    <span className="text-lg font-bold text-black">Total</span>
                    <span className="text-lg font-bold text-black">₹{total}</span>
                  </div>
                </div>

                <button
                  onClick={handleBuyCourse}
                  className="w-full px-6 py-3 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition font-semibold mb-3"
                >
                  Proceed to Checkout
                </button>

                <button
                  onClick={handleClearCart}
                  className="w-full px-6 py-3 border border-dark-300 text-black rounded-md hover:bg-dark-100 transition font-medium"
                >
                  Clear Cart
                </button>

                <div className="mt-6 p-4 bg-dark-50 rounded-lg">
                  <p className="text-sm text-dark-700">
                    <strong>Note:</strong> All courses come with lifetime access and a 30-day
                    money-back guarantee.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
