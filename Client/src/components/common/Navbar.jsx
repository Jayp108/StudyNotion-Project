import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, X, ShoppingCart, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-50/95 border-b border-dark-200 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold">
              <span className="text-primary-500">Study</span>
              <span className="text-white">Notion</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-dark-600 hover:text-primary-500 transition font-medium">
              Home
            </Link>
            <Link to="/catalog" className="text-dark-600 hover:text-primary-500 transition font-medium">
              Catalog
            </Link>
            <Link to="/about" className="text-dark-600 hover:text-primary-500 transition font-medium">
              About
            </Link>
            <Link to="/contact" className="text-dark-600 hover:text-primary-500 transition font-medium">
              Contact
            </Link>
          </div>

          {/* Desktop Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center gap-4">
            {token === null ? (
              <>
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-dark-800 hover:text-primary-500 transition font-medium"
                >
                  Log In
                </Link>
                <Link 
                  to="/signup" 
                  className="px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition font-semibold"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                {user?.accountType === "Student" && (
                  <Link to="/dashboard/cart" className="relative">
                    <ShoppingCart className="w-6 h-6 text-dark-800 hover:text-primary-500 transition" />
                    {totalItems > 0 && (
                      <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                )}
                
                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="flex items-center gap-2 hover:opacity-80 transition"
                  >
                    <img
                      src={user?.image}
                      alt={user?.firstName}
                      className="w-9 h-9 rounded-full object-cover border-2 border-dark-200"
                    />
                    <ChevronDown className="w-4 h-4 text-dark-800" />
                  </button>

                  {/* Dropdown Menu */}
                  {showProfileDropdown && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-dark-200 py-2">
                      <div className="px-4 py-2 border-b border-dark-200">
                        <p className="font-semibold text-black">{user?.firstName} {user?.lastName}</p>
                        <p className="text-sm text-black">{user?.email}</p>
                      </div>

                      <Link
                        to={user?.accountType === "Instructor" ? "/dashboard/instructor" : "/dashboard/student"}
                        className="block px-4 py-2 text-black hover:bg-dark-50 transition"
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        Dashboard
                      </Link>

                      {user?.accountType === "Instructor" && (
                        <>
                          <Link
                            to="/dashboard/my-courses"
                            className="block px-4 py-2 text-black hover:bg-dark-50 transition"
                            onClick={() => setShowProfileDropdown(false)}
                          >
                            My Courses
                          </Link>
                          <Link
                            to="/dashboard/add-course"
                            className="block px-4 py-2 text-black hover:bg-dark-50 transition"
                            onClick={() => setShowProfileDropdown(false)}
                          >
                            Create Course
                          </Link>
                        </>
                      )}

                      {user?.accountType === "Student" && (
                        <Link
                          to="/dashboard/enrolled-courses"
                          className="block px-4 py-2 text-black hover:bg-dark-50 transition"
                          onClick={() => setShowProfileDropdown(false)}
                        >
                          Enrolled Courses
                        </Link>
                      )}

                      <Link
                        to="/dashboard/my-profile"
                        className="block px-4 py-2 text-black hover:bg-dark-50 transition"
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        My Profile
                      </Link>

                      <Link
                        to="/dashboard/settings"
                        className="block px-4 py-2 text-black hover:bg-dark-50 transition"
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        Settings
                      </Link>

                      <div className="border-t border-dark-200 my-1"></div>

                      <button
                        onClick={() => {
                          setShowProfileDropdown(false);
                          // Logout logic will be added
                          localStorage.removeItem('token');
                          localStorage.removeItem('user');
                          window.location.href = '/';
                        }}
                        className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 transition"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-dark-800 hover:text-primary-500"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-dark-200">
            <div className="flex flex-col gap-4">
              <Link 
                to="/" 
                className="text-dark-800 hover:text-primary-500 transition font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/catalog" 
                className="text-dark-800 hover:text-primary-500 transition font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                Catalog
              </Link>
              <Link 
                to="/about" 
                className="text-dark-800 hover:text-primary-500 transition font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="text-dark-800 hover:text-primary-500 transition font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              
              {token === null ? (
                <div className="flex flex-col gap-2 pt-4 border-t border-dark-200">
                  <Link 
                    to="/login" 
                    className="px-4 py-2 text-center text-dark-800 hover:text-primary-500 transition font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Log In
                  </Link>
                  <Link 
                    to="/signup" 
                    className="px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition font-semibold text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div className="pt-4 border-t border-dark-200 flex flex-col gap-2">
                  <div className="flex items-center gap-3 px-2 py-2 border-b border-dark-200">
                    <img
                      src={user?.image}
                      alt={user?.firstName}
                      className="w-9 h-9 rounded-full object-cover border-2 border-dark-200"
                    />
                    <div>
                      <p className="font-semibold text-dark-900 text-sm">{user?.firstName}</p>
                      <p className="text-xs text-dark-600">{user?.accountType}</p>
                    </div>
                  </div>

                  <Link 
                    to={user?.accountType === "Instructor" ? "/dashboard/instructor" : "/dashboard/student"}
                    className="text-dark-800 hover:text-primary-500 transition font-medium py-2 px-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>

                  {user?.accountType === "Instructor" && (
                    <>
                      <Link 
                        to="/dashboard/my-courses"
                        className="text-dark-800 hover:text-primary-500 transition font-medium py-2 px-2"
                        onClick={() => setIsOpen(false)}
                      >
                        My Courses
                      </Link>
                      <Link 
                        to="/dashboard/add-course"
                        className="text-dark-800 hover:text-primary-500 transition font-medium py-2 px-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Create Course
                      </Link>
                    </>
                  )}

                  {user?.accountType === "Student" && (
                    <>
                      <Link 
                        to="/dashboard/enrolled-courses"
                        className="text-dark-800 hover:text-primary-500 transition font-medium py-2 px-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Enrolled Courses
                      </Link>
                      <Link 
                        to="/dashboard/cart"
                        className="text-dark-800 hover:text-primary-500 transition font-medium py-2 px-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Cart {totalItems > 0 && `(${totalItems})`}
                      </Link>
                    </>
                  )}

                  <Link 
                    to="/dashboard/my-profile"
                    className="text-dark-800 hover:text-primary-500 transition font-medium py-2 px-2"
                    onClick={() => setIsOpen(false)}
                  >
                    My Profile
                  </Link>

                  <Link 
                    to="/dashboard/settings"
                    className="text-dark-800 hover:text-primary-500 transition font-medium py-2 px-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Settings
                  </Link>

                  <button
                    onClick={() => {
                      setIsOpen(false);
                      localStorage.removeItem('token');
                      localStorage.removeItem('user');
                      window.location.href = '/';
                    }}
                    className="text-red-500 hover:text-red-600 transition font-medium py-2 px-2 text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
