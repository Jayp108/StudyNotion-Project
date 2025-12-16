const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

// Import Models
const User = require("./models/User");
const Profile = require("./models/Profile");
const Category = require("./models/category");
const Course = require("./models/Course");
const Section = require("./models/Section");
const SubSection = require("./models/SubSection");
const RatingAndReview = require("./models/RatingAndReview");

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Database connected successfully"))
.catch((error) => console.error("Database connection error:", error));

// Sample Data
const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Profile.deleteMany({});
    await Category.deleteMany({});
    await Course.deleteMany({});
    await Section.deleteMany({});
    await SubSection.deleteMany({});
    await RatingAndReview.deleteMany({});

    console.log("Existing data cleared");

    // Create Profiles
    const profiles = await Profile.create([
      {
        gender: "Male",
        dateofbirth: "1990-01-15",
        about: "Experienced web developer and instructor",
        contactNumber: 9876543210,
      },
      {
        gender: "Female",
        dateofbirth: "1992-05-20",
        about: "Full-stack developer passionate about teaching",
        contactNumber: 9876543211,
      },
      {
        gender: "Male",
        dateofbirth: "1995-08-10",
        about: "Student learning web development",
        contactNumber: 9876543212,
      },
      {
        gender: "Female",
        dateofbirth: "1998-03-25",
        about: "Aspiring software engineer",
        contactNumber: 9876543213,
      },
    ]);

    console.log("Profiles created");

    // Create Users (Instructors and Students)
    const hashedPassword = await bcrypt.hash("password123", 10);

    const users = await User.create([
      {
        firstName: "John",
        lastName: "Doe",
        email: "john.instructor@example.com",
        password: hashedPassword,
        accountType: "Instructor",
        additionalDetails: profiles[0]._id,
        image: "https://api.dicebear.com/5.x/initials/svg?seed=John Doe",
        approved: true,
        active: true,
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.instructor@example.com",
        password: hashedPassword,
        accountType: "Instructor",
        additionalDetails: profiles[1]._id,
        image: "https://api.dicebear.com/5.x/initials/svg?seed=Jane Smith",
        approved: true,
        active: true,
      },
      {
        firstName: "Mike",
        lastName: "Johnson",
        email: "mike.student@example.com",
        password: hashedPassword,
        accountType: "Student",
        additionalDetails: profiles[2]._id,
        image: "https://api.dicebear.com/5.x/initials/svg?seed=Mike Johnson",
        active: true,
      },
      {
        firstName: "Sarah",
        lastName: "Williams",
        email: "sarah.student@example.com",
        password: hashedPassword,
        accountType: "Student",
        additionalDetails: profiles[3]._id,
        image: "https://api.dicebear.com/5.x/initials/svg?seed=Sarah Williams",
        active: true,
      },
      {
        firstName: "Admin",
        lastName: "User",
        email: "admin@example.com",
        password: hashedPassword,
        accountType: "Admin",
        image: "https://api.dicebear.com/5.x/initials/svg?seed=Admin User",
        active: true,
      },
    ]);

    console.log("Users created");

    // Create Categories
    const categories = await Category.create([
      {
        name: "Web Development",
        description: "Learn to build modern web applications",
      },
      {
        name: "Data Science",
        description: "Master data analysis and machine learning",
      },
      {
        name: "Mobile Development",
        description: "Build iOS and Android applications",
      },
      {
        name: "DevOps",
        description: "Learn deployment and automation",
      },
      {
        name: "Cloud Computing",
        description: "Master AWS, Azure, and GCP",
      },
    ]);

    console.log("Categories created");

    // Create SubSections
    const subSections = await SubSection.create([
      // Web Dev Course
      {
        title: "Introduction to HTML",
        timeDuration: "30",
        description: "Learn the basics of HTML",
        videoUrl: "https://www.youtube.com/watch?v=qz0aGYrrlhU",
      },
      {
        title: "CSS Fundamentals",
        timeDuration: "45",
        description: "Master CSS styling",
        videoUrl: "https://www.youtube.com/watch?v=1PnVor36_40",
      },
      {
        title: "JavaScript Basics",
        timeDuration: "60",
        description: "Introduction to JavaScript programming",
        videoUrl: "https://www.youtube.com/watch?v=W6NZfCO5SIk",
      },
      // React Course
      {
        title: "React Introduction",
        timeDuration: "40",
        description: "Getting started with React",
        videoUrl: "https://www.youtube.com/watch?v=Ke90Tje7VS0",
      },
      {
        title: "React Components",
        timeDuration: "50",
        description: "Understanding React components",
        videoUrl: "https://www.youtube.com/watch?v=Ke90Tje7VS0",
      },
      // Python Course
      {
        title: "Python Basics",
        timeDuration: "35",
        description: "Introduction to Python",
        videoUrl: "https://www.youtube.com/watch?v=rfscVS0vtbw",
      },
      {
        title: "Python Data Structures",
        timeDuration: "55",
        description: "Lists, Tuples, and Dictionaries",
        videoUrl: "https://www.youtube.com/watch?v=rfscVS0vtbw",
      },
    ]);

    console.log("SubSections created");

    // Create Sections
    const sections = await Section.create([
      // Web Dev Course Sections
      {
        sectionName: "Introduction to Web Development",
        SubSection: [subSections[0]._id, subSections[1]._id],
      },
      {
        sectionName: "JavaScript Fundamentals",
        SubSection: [subSections[2]._id],
      },
      // React Course Sections
      {
        sectionName: "Getting Started with React",
        SubSection: [subSections[3]._id, subSections[4]._id],
      },
      // Python Course Sections
      {
        sectionName: "Python Fundamentals",
        SubSection: [subSections[5]._id, subSections[6]._id],
      },
    ]);

    console.log("Sections created");

    // Create Courses
    const courses = await Course.create([
      {
        courseName: "Complete Web Development Bootcamp",
        courseDescription: "Learn HTML, CSS, JavaScript and modern web development from scratch",
        instructor: users[0]._id,
        whatYouWillLearn: "Build responsive websites, Master JavaScript, Understand web fundamentals",
        courseContent: [sections[0]._id, sections[1]._id],
        price: 4999,
        thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
        tag: ["Web Development", "JavaScript", "HTML", "CSS"],
        category: categories[0]._id,
        studentsEnrolled: [users[2]._id, users[3]._id],
        instructions: ["Basic computer knowledge", "Internet connection", "Desire to learn"],
        status: "Published",
      },
      {
        courseName: "React.js Complete Course",
        courseDescription: "Master React.js and build modern single-page applications",
        instructor: users[0]._id,
        whatYouWillLearn: "Build React apps, Understand hooks, State management with Redux",
        courseContent: [sections[2]._id],
        price: 5999,
        thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
        tag: ["React", "JavaScript", "Frontend"],
        category: categories[0]._id,
        studentsEnrolled: [users[2]._id],
        instructions: ["JavaScript knowledge required", "HTML/CSS basics"],
        status: "Published",
      },
      {
        courseName: "Python for Data Science",
        courseDescription: "Learn Python programming and data analysis",
        instructor: users[1]._id,
        whatYouWillLearn: "Python programming, Data analysis, Pandas and NumPy",
        courseContent: [sections[3]._id],
        price: 699,
        thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800",
        tag: ["Python", "Data Science", "Machine Learning"],
        category: categories[1]._id,
        studentsEnrolled: [users[3]._id],
        instructions: ["No prior programming knowledge required"],
        status: "Published",
      },
      {
        courseName: "Mobile App Development with React Native",
        courseDescription: "Build cross-platform mobile apps",
        instructor: users[1]._id,
        whatYouWillLearn: "React Native, Mobile UI, App deployment",
        courseContent: [],
        price: 7999,
        thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800",
        tag: ["React Native", "Mobile", "JavaScript"],
        category: categories[2]._id,
        studentsEnrolled: [],
        instructions: ["React knowledge recommended"],
        status: "Published",
      },
      {
        courseName: "DevOps Essentials",
        courseDescription: "Learn Docker, Kubernetes, CI/CD",
        instructor: users[0]._id,
        whatYouWillLearn: "Docker containers, Kubernetes orchestration, CI/CD pipelines",
        courseContent: [],
        price: 8999,
        thumbnail: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800",
        tag: ["DevOps", "Docker", "Kubernetes"],
        category: categories[3]._id,
        studentsEnrolled: [],
        instructions: ["Linux basics", "Command line knowledge"],
        status: "Published",
      },
    ]);

    console.log("Courses created");

    // Update Users with Courses
    await User.findByIdAndUpdate(users[0]._id, {
      $push: { courses: { $each: [courses[0]._id, courses[1]._id, courses[4]._id] } },
    });

    await User.findByIdAndUpdate(users[1]._id, {
      $push: { courses: { $each: [courses[2]._id, courses[3]._id] } },
    });

    await User.findByIdAndUpdate(users[2]._id, {
      $push: { courses: { $each: [courses[0]._id, courses[1]._id] } },
    });

    await User.findByIdAndUpdate(users[3]._id, {
      $push: { courses: { $each: [courses[0]._id, courses[2]._id] } },
    });

    console.log("Users updated with courses");

    // Update Categories with Courses
    await Category.findByIdAndUpdate(categories[0]._id, {
      $push: { courses: { $each: [courses[0]._id, courses[1]._id] } },
    });

    await Category.findByIdAndUpdate(categories[1]._id, {
      $push: { courses: courses[2]._id },
    });

    await Category.findByIdAndUpdate(categories[2]._id, {
      $push: { courses: courses[3]._id },
    });

    await Category.findByIdAndUpdate(categories[3]._id, {
      $push: { courses: courses[4]._id },
    });

    console.log("Categories updated with courses");

    // Create Ratings and Reviews
    await RatingAndReview.create([
      {
        user: users[2]._id,
        rating: 5,
        review: "Excellent course! Very well explained and easy to follow.",
        course: courses[0]._id,
      },
      {
        user: users[3]._id,
        rating: 4,
        review: "Great content, learned a lot. Would recommend!",
        course: courses[0]._id,
      },
      {
        user: users[2]._id,
        rating: 5,
        review: "Perfect introduction to React. Instructor is amazing!",
        course: courses[1]._id,
      },
      {
        user: users[3]._id,
        rating: 5,
        review: "Best Python course I've taken. Very comprehensive.",
        course: courses[2]._id,
      },
    ]);

    console.log("Ratings and reviews created");

    console.log("\n✅ Database seeded successfully!");
    console.log("\n📧 Test Credentials:");
    console.log("Instructor 1: john.instructor@example.com / password123");
    console.log("Instructor 2: jane.instructor@example.com / password123");
    console.log("Student 1: mike.student@example.com / password123");
    console.log("Student 2: sarah.student@example.com / password123");
    console.log("Admin: admin@example.com / password123");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedData();
