# StudyNotion Frontend - Complete Documentation

## 🎨 Theme
- **Primary Color**: Orange (#f97316)
- **Secondary Color**: Black (#18181b)
- **Additional Colors**: Various shades of dark-50 to dark-900

## 📁 Project Structure

### Pages Created

#### 1. **Home Page** (`Client/src/pages/Home.jsx`)
- Hero section with search functionality
- Stats section (students, courses, instructors)
- Features showcase
- CTA sections
- Gradient backgrounds with orange and black theme

#### 2. **Authentication Pages**
- **Login** (`Client/src/pages/Login.jsx`) - User authentication
- **Signup** (`Client/src/pages/Signup.jsx`) - New user registration
- **Verify Email** (`Client/src/pages/VerifyEmail.jsx`) - Email OTP verification
- **Forgot Password** (`Client/src/pages/ForgotPassword.jsx`) - Password reset request
- **Update Password** (`Client/src/pages/UpdatePassword.jsx`) - Set new password

#### 3. **Course Pages**
- **Catalog** (`Client/src/pages/Catalog.jsx`) - Browse all courses
- **Category Page** (`Client/src/pages/CategoryPage.jsx`) - View courses by category
- **Course Details** (`Client/src/pages/CourseDetails.jsx`) - Detailed course information
- **View Course** (`Client/src/pages/ViewCourse.jsx`) - Student course player with progress tracking

#### 4. **Student Dashboard**
- **My Profile** (`Client/src/pages/MyProfile.jsx`) - View/edit user profile
- **Settings** (`Client/src/pages/Settings.jsx`) - Update password, profile picture, account settings
- **Enrolled Courses** (`Client/src/pages/EnrolledCourses.jsx`) - List of purchased courses with progress
- **Student Dashboard** (`Client/src/pages/StudentDashboard.jsx`) - Overview of student activities
- **Cart** (`Client/src/pages/Cart.jsx`) - Shopping cart for courses
- **Checkout** (`Client/src/pages/Checkout.jsx`) - Payment processing with Razorpay

#### 5. **Instructor Dashboard**
- **My Courses** (`Client/src/pages/MyCourses.jsx`) - Instructor's course management table
- **Add Course** (`Client/src/pages/AddCourse.jsx`) - Create new course
- **Edit Course** (`Client/src/pages/EditCourse.jsx`) - Update course details
- **Instructor Dashboard** (`Client/src/pages/InstructorDashboard.jsx`) - Instructor analytics

#### 6. **Contact & About**
- **Contact** (`Client/src/pages/Contact.jsx`) - Basic contact info
- **Contact Us** (`Client/src/pages/ContactUs.jsx`) - Full contact form with email integration
- **About** (`Client/src/pages/About.jsx`) - About the platform

### Components Created

#### Core Components

##### Dashboard Components
- **CourseBuilder** (`Client/src/components/core/Dashboard/CourseBuilder.jsx`)
  - Section management (create, update, delete)
  - Expandable sections
  - Lecture count display
  
- **SubSectionModal** (`Client/src/components/core/Dashboard/SubSectionModal.jsx`)
  - Add/edit lectures
  - Video upload
  - Lecture details (title, description, duration)

##### Course Components
- **RatingModal** (`Client/src/components/core/Course/RatingModal.jsx`)
  - 5-star rating system
  - Review submission
  - Integrated with backend

- **CourseReviews** (`Client/src/components/core/Course/CourseReviews.jsx`)
  - Display all course reviews
  - User ratings and comments

#### Common Components
- **Navbar** (`Client/src/components/common/Navbar.jsx`)
  - Desktop and mobile responsive
  - Profile dropdown with role-based menu (Student/Instructor)
  - Cart icon for students
  - Dashboard links
  
- **Footer** (`Client/src/components/common/Footer.jsx`)
  - Site links and information
  
- **Spinner** (`Client/src/components/common/Spinner.jsx`)
  - Loading indicator with primary color

## 🔌 API Integration

### Backend Controllers Mapped

1. **Auth Controller** (`Server/controllers/Auth.js`)
   - Login, Signup, Send OTP, Change Password
   - Integrated in: Login.jsx, Signup.jsx, VerifyEmail.jsx, Settings.jsx

2. **Course Controller** (`Server/controllers/Course.js`)
   - Create, Edit, Delete courses
   - Get all courses, course details, instructor courses
   - Integrated in: AddCourse.jsx, EditCourse.jsx, MyCourses.jsx, CourseDetails.jsx, Catalog.jsx

3. **Section Controller** (`Server/controllers/Section.js`)
   - Create, Update, Delete sections
   - Integrated in: CourseBuilder.jsx

4. **Subsection Controller** (`Server/controllers/Subsection.js`)
   - Create, Update, Delete subsections
   - Integrated in: SubSectionModal.jsx

5. **Payment Controller** (`Server/controllers/Payment.js`)
   - Capture payment, Verify payment
   - Integrated in: Checkout.jsx

6. **Profile Controller** (`Server/controllers/Profile.js`)
   - Update profile, Display picture, Enrolled courses
   - Integrated in: MyProfile.jsx, Settings.jsx, EnrolledCourses.jsx

7. **Rating Controller** (`Server/controllers/RatingAndReview.js`)
   - Create ratings, Get reviews
   - Integrated in: RatingModal.jsx, CourseReviews.jsx

8. **Category Controller** (`Server/controllers/Category.js`)
   - Get all categories, Category page details
   - Integrated in: CategoryPage.jsx, AddCourse.jsx

9. **Contact Controller** (`Server/controllers/ContactUs.js`)
   - Submit contact form
   - Integrated in: ContactUs.jsx

10. **Course Progress Controller** (`Server/controllers/courseProgress.js`)
    - Update lecture completion
    - Integrated in: ViewCourse.jsx

## 🛣️ Routes Configuration

### App.jsx Routes
```javascript
// Public Routes
/ - Home
/login - Login
/signup - Signup
/verify-email - Email Verification
/forgot-password - Password Reset Request
/update-password/:id - Password Reset
/catalog - All Courses
/catalog/:categoryId - Category Courses
/courses/:courseId - Course Details
/contact - Contact Page
/contact-us - Full Contact Form
/about - About Page

// Student Dashboard Routes
/dashboard/my-profile - User Profile
/dashboard/settings - Account Settings
/dashboard/enrolled-courses - Student Courses
/dashboard/student - Student Dashboard
/dashboard/cart - Shopping Cart
/dashboard/checkout - Payment Checkout

// Instructor Dashboard Routes
/dashboard/instructor - Instructor Dashboard
/dashboard/my-courses - Instructor Course Management
/dashboard/add-course - Create New Course
/dashboard/edit-course/:courseId - Edit Course

// Course Viewer
/view-course/:courseId - Course Player
```

### Backend Routes (Server/index.js)
```javascript
/api/v1/auth - Authentication routes
/api/v1/profile - Profile routes
/api/v1/course - Course routes
/api/v1/payment - Payment routes
/api/v1/reach - Contact routes
```

## 🎯 Features Implemented

### Student Features
- ✅ Browse courses by category
- ✅ View detailed course information
- ✅ Add courses to cart
- ✅ Checkout with Razorpay integration
- ✅ View enrolled courses with progress
- ✅ Track course completion
- ✅ Rate and review courses
- ✅ Update profile and settings

### Instructor Features
- ✅ Create and publish courses
- ✅ Manage course content (sections and lectures)
- ✅ Upload course thumbnails
- ✅ Edit course details
- ✅ Delete courses
- ✅ View instructor dashboard with analytics
- ✅ Track course enrollment

### General Features
- ✅ Responsive design (mobile and desktop)
- ✅ Authentication with JWT
- ✅ Email OTP verification
- ✅ Password reset functionality
- ✅ Contact form with email integration
- ✅ Search functionality
- ✅ Role-based navigation (Student/Instructor)
- ✅ Shopping cart with persistent state (Redux)

## 🔧 Technologies Used

- **React 19.2.0** - UI framework
- **Vite 7.2.7** - Build tool
- **React Router DOM** - Routing
- **Redux Toolkit** - State management
- **React Hook Form** - Form handling
- **Tailwind CSS 3.4.1** - Styling
- **Lucide React** - Icons
- **React Hot Toast** - Notifications
- **Razorpay** - Payment gateway

## 🚀 Running the Application

### Frontend (Client)
```bash
cd Client
npm install
npm run dev
```
Access at: `http://localhost:5173`

### Backend (Server)
```bash
cd Server
npm install
npm run dev
```
Access at: `http://localhost:4000`

## 📦 State Management (Redux Slices)

1. **authSlice** - User authentication state
2. **profileSlice** - User profile data
3. **cartSlice** - Shopping cart items
4. **courseSlice** - Course-related data

## 🎨 Design System

### Colors
```css
primary-50: #fff7ed
primary-100: #ffedd5
primary-200: #fed7aa
primary-300: #fdba74
primary-400: #fb923c
primary-500: #f97316 (Main Orange)
primary-600: #ea580c

dark-50: #18181b (Main Black)
dark-100: #27272a
dark-200: #3f3f46
dark-300: #52525b
dark-600: #71717a
dark-700: #a1a1aa
dark-800: #d4d4d8
dark-900: #f4f4f5
```

### Typography
- Headings: Bold, large sizes
- Body: Regular weight, readable sizes
- Buttons: Semibold, uppercase for emphasis

### Spacing
- Consistent padding: p-4, p-6, p-8
- Gap between elements: gap-2, gap-4, gap-6
- Margins: mb-2, mb-4, mb-6, mb-8

## 📝 Notes

- All forms include validation
- Error handling with toast notifications
- Loading states for async operations
- Responsive design for all screen sizes
- Protected routes should be implemented with PrivateRoute component
- Environment variables needed for Razorpay integration
- Cloudinary integration for image/video uploads

## 🔐 Environment Variables Required

```env
# Frontend (.env)
VITE_BASE_URL=http://localhost:4000/api/v1
VITE_RAZORPAY_KEY=your_razorpay_key

# Backend (.env)
PORT=4000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email
MAIL_PASS=your_email_password
RAZORPAY_KEY=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
FOLDER_NAME=StudyNotion
```

## 🎓 Future Enhancements

- Add quiz functionality
- Implement certificate generation
- Add live chat support
- Implement video player with controls
- Add course recommendations
- Implement discussion forums
- Add progress analytics
- Implement email notifications
- Add social sharing features

---

**Created with ❤️ for StudyNotion - An Ed-Tech Platform**
