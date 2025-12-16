const Profile = require("../models/Profile");
const CourseProgress = require("../models/CourseProgress");
const Course = require("../models/Course");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader")
const mongoose = require("mongoose")
const { convertSecondsToDuration } = require("../utils/secToDuration")



exports.updateProfile = async(req, res) =>{
    try{

        //data fetch
         const {gender,contactNumber,dateofbirth="",about=""}= req.body;

        //get UserId
        const id = req.user.id;

         // validation
         if(!contactNumber || !gender || !id){
            return res.status(400).json({
                success:false,
                message:"All fields are required", 
            });
         }

         //find Profile by id
         const userDetails = await User.findById(id);
         const profileId = userDetails.additionalDetails;
         const profileDetails = await Profile.findById(profileId);

         //update profile
         profileDetails.dateofbirth = dateofbirth;
         profileDetails.about = about;
         profileDetails.gender = gender;
         profileDetails.contactNumber = contactNumber;
         await profileDetails.save(); // it save the data into database after update the profile 


         //return response
         return res.status(200).json({
            success:true,
            message:'Profile updated successfully',
            profileDetails,
         });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'Error during updated Profile',
            error:error.message,
        });
    }
};


// Delete the account 

exports.deleteAccount = async(req,res) =>{
    try{

      console.log("Printing id",req.user.id);
        //fetch id
        const id = req.user.id;

        // validataion id is valid or not
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:'Id is required',
            });
        }
        // delete profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});

        //delete user
        await User.findByIdAndDelete({_id:id});

        //return response
        return res.status(200).json({
            success:true,
            message:'Account delete Successfully',
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'Error during  Account delete',
            error:error.message,
        });
    }
}; 


// get User Details 

exports.getAllUserDetails = async (req, res)=>{
    try{
        // id fetch
        const id = req.user.id;

        //validation and get user details
        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        // response return 
        return res.status(200).json({
            success:true,
            message:'User data fetched successfully',
            data:userDetails,
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'Error during getUserDetails',
            error:error.message,
        });
    }
};


// update Display Picture of User
exports.updateDisplayPicture = async (req, res) => {
    try {

      // console.log("FILES ===>", req.files);

      // check file aayi hai ya nhi 
      if (!req.files || !req.files.displayPicture) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded. Please send 'displayPicture' field as file.",
        });
      }


      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }
  

  // 
  exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      console.log("Fetching enrolled courses for user:", userId)
      console.log("User ID type:", typeof userId)
      
      // Try to find user with and without ObjectId conversion
      let userDetails = await User.findById(userId)
      console.log("User found with findById:", userDetails ? "Yes" : "No")
      
      if (!userDetails) {
        // Try with ObjectId conversion
        const mongoose = require('mongoose')
        userDetails = await User.findOne({ _id: new mongoose.Types.ObjectId(userId) })
        console.log("User found with ObjectId conversion:", userDetails ? "Yes" : "No")
      }
      
      if (!userDetails) {
        console.log("ERROR: User not found with id:", userId)
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userId}`,
        })
      }
      
      // Now populate the courses
      userDetails = await User.findById(userId)
        .populate({
          path: "courses",
          populate: {
            path: "courseContent",
            populate: {
              path: "SubSection",
            },
          },
        })
        .exec()
      
      console.log("User details fetched:", userDetails ? "Found" : "Not found")
      
      if (!userDetails) {
        console.log("ERROR: User not found with id:", userId)
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userId}`,
        })
      }
      
      console.log("User courses found:", userDetails?.courses?.length || 0)
      userDetails = userDetails.toObject()
      
      // If no courses, return empty array
      if (!userDetails.courses || userDetails.courses.length === 0) {
        return res.status(200).json({
          success: true,
          data: [],
        })
      }
      
      var SubsectionLength = 0
      for (var i = 0; i < userDetails.courses.length; i++) {
        let totalDurationInSeconds = 0
        SubsectionLength = 0
        
        // Check if courseContent exists
        if (userDetails.courses[i].courseContent && Array.isArray(userDetails.courses[i].courseContent)) {
          for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
            if (userDetails.courses[i].courseContent[j].SubSection && Array.isArray(userDetails.courses[i].courseContent[j].SubSection)) {
              totalDurationInSeconds += userDetails.courses[i].courseContent[
                j
              ].SubSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration || 0), 0)
              SubsectionLength +=
                userDetails.courses[i].courseContent[j].SubSection.length
            }
          }
        }
        
        userDetails.courses[i].totalDuration = convertSecondsToDuration(
          totalDurationInSeconds
        )
        let courseProgressCount = await CourseProgress.findOne({
          courseID: userDetails.courses[i]._id,
          userId: userId,
        })
        courseProgressCount = courseProgressCount?.completedVideos.length
        if (SubsectionLength === 0) {
          userDetails.courses[i].progressPercentage = 100
        } else {
          // To make it up to 2 decimal point
          const multiplier = Math.pow(10, 2)
          userDetails.courses[i].progressPercentage =
            Math.round(
              (courseProgressCount / SubsectionLength) * 100 * multiplier
            ) / multiplier
        }
      }
      
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      console.error("ERROR in getEnrolledCourses:", error)
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }
  
  //
  exports.instructorDashboard = async (req, res) => {
    try {
      console.log("Instructor Dashboard - User ID:", req.user.id);
      const courseDetails = await Course.find({ instructor: req.user.id })
      console.log("Found courses:", courseDetails.length);
  
      const courseData = courseDetails.map((course) => {
        const totalStudentsEnrolled = course.studentsEnrolled?.length || 0
        const totalAmountGenerated = totalStudentsEnrolled * course.price
  
        // Create a new object with the additional fields
        const courseDataWithStats = {
          _id: course._id,
          courseName: course.courseName,
          courseDescription: course.courseDescription,
          totalStudentsEnrolled,
          totalAmountGenerated,
        }
  
        return courseDataWithStats
      })
  
      res.status(200).json({ success: true, courses: courseData })
    } catch (error) {
      console.error("Instructor Dashboard Error:", error)
      res.status(500).json({ success: false, message: "Server Error" })
    }
  }


