const {instance }= require('../config/razorpay');
const Course  = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const  mongoose  = require('mongoose');
const { response } = require('express');
const crypto = require("crypto");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail")
const CourseProgress = require("../models/CourseProgress")


// capture the payment and initialize the razorpay order

exports.capturePayment = async (req, res) => {
    // Get courses array and userId
    const { courses } = req.body;
    const userId = req.user.id;

    // Validation
    if (!courses || courses.length === 0) {
        return res.status(400).json({
            success: false,
            message: "Please provide course IDs",
        });
    }

    let totalAmount = 0;
    
    try {
        // Validate all courses and calculate total amount
        for (const course_id of courses) {
            let course;
            try {
                course = await Course.findById(course_id);
                if (!course) {
                    return res.status(404).json({
                        success: false,
                        message: `Course not found: ${course_id}`,
                    });
                }

                // Check if user already enrolled
                const uid = new mongoose.Types.ObjectId(userId);
                if (course.studentsEnrolled.includes(uid)) {
                    return res.status(400).json({
                        success: false,
                        message: `Already enrolled in: ${course.courseName}`,
                    });
                }

                totalAmount += course.price;
            } catch (error) {
                console.error(error);
                return res.status(500).json({
                    success: false,
                    message: "Error fetching course details",
                });
            }
        }

        // Create Razorpay order
        const currency = "INR";
        const options = {
            amount: totalAmount * 100,
            currency,
            receipt: Date.now().toString(),
            notes: {
                userId,
                courses: JSON.stringify(courses),
            },
        };

        const paymentResponse = await instance.orders.create(options);
        console.log("Payment Response:", paymentResponse);

        return res.status(200).json({
            success: true,
            message: "Order created successfully",
            data: {
                id: paymentResponse.id,
                amount: paymentResponse.amount,
                currency: paymentResponse.currency,
            },
        });
    } catch (error) {
        console.error("Payment Error:", error);
        return res.status(500).json({
            success: false,
            message: "Could not initiate order",
        });
    }
};


// Verify signature of Razorpay and server

exports.verifySignature = async (req, res) => {
    const webhookSecret = "123456";

    const signature = req.headers["x-razorpay-signature"];

    const shasum = crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if(signature === digest){
        console.log("Payment is Authorised");

        const {courseId, userId} = req.body.payload.entity.notes;

        try{
            
            // find the course and enroll the student in it
            const enrolledCourse = await Course.findOneAndUpdate(
                {_id: courseId},
                {$push: {studentsEnrolled: userId }},
                {new: true},
            );

            if(!enrolledCourse){
                return res.status(500).json({
                    success: false,
                    message:"Course not found",
                });
            }
            console.log(enrolledCourse);

            // find the student and add the course to thier lisst enrolled courses
            const enrolledStudent = await User.findOneAndUpdate(
                                                  {_id:userId},
                                                  {$push: {courses:courseId}},
                                                  {new:true},

            )
            console.log(enrolledStudent);

            // confirmation mail to student 
            const emailResponse = await mailSender(
                                    enrolledStudent.email,
                                    "congratulation , You are onboard into new Studynotion course",

            );
            console.log(emailResponse);
            return res.status(200).json({
                success:true,
                message:"Signature verified and course Added ",
            });
        }
        catch(error){
            console.log(error);
            return res.status(500).json({
                success:false,
                message:error.message,
            });
        }
    }
    else{
        return res.status(400).json({
            success:false,
            message: "Invalid request",
        });
    }
};


// verify the payment
exports.verifyPayment = async (req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
    const courses = req.body?.courses
  
    const userId = req.user.id
  
    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !courses ||
      !userId
    ) {
      return res.status(200).json({ success: false, message: "Payment Failed" })
    }
  
    let body = razorpay_order_id + "|" + razorpay_payment_id
  
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex")
  
    if (expectedSignature === razorpay_signature) {
      await enrollStudents(courses, userId, res)
      return res.status(200).json({ success: true, message: "Payment Verified" })
    }
  
    return res.status(200).json({ success: false, message: "Payment Failed" })
  }
  
  // Send Payment Success Email
  exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body
  
    const userId = req.user.id
  
    if (!orderId || !paymentId || !amount || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all the details" })
    }
  
    try {
      const enrolledStudent = await User.findById(userId)
  
      await mailSender(
        enrolledStudent.email,
        `Payment Received`,
        paymentSuccessEmail(
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
          amount / 100,
          orderId,
          paymentId
        )
      )
    } catch (error) {
      console.log("error in sending mail", error)
      return res
        .status(400)
        .json({ success: false, message: "Could not send email" })
    }
  }
  
  // enroll the student in the courses
  const enrollStudents = async (courses, userId, res) => {
    if (!courses || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Please Provide Course ID and User ID" })
    }
  
    for (const courseId of courses) {
      try {
        // Find the course and enroll the student in it
        const enrolledCourse = await Course.findOneAndUpdate(
          { _id: courseId },
          { $push: { studentsEnrolled: userId } },
          { new: true }
        )
  
        if (!enrolledCourse) {
          return res
            .status(500)
            .json({ success: false, error: "Course not found" })
        }
        console.log("Updated course: ", enrolledCourse)
  
        const courseProgress = await CourseProgress.create({
          courseID: courseId,
          userId: userId,
          completedVideos: [],
        })
        // Find the student and add the course to their list of enrolled courses
        const enrolledStudent = await User.findByIdAndUpdate(
          userId,
          {
            $push: {
              courses: courseId,
              courseProgress: courseProgress._id,
            },
          },
          { new: true }
        )
  
        console.log("Enrolled student: ", enrolledStudent)
        // Send an email notification to the enrolled student
        const emailResponse = await mailSender(
          enrolledStudent.email,
          `Successfully Enrolled into ${enrolledCourse.courseName}`,
          courseEnrollmentEmail(
            enrolledCourse.courseName,
            `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
          )
        )
  
        console.log("Email sent successfully: ", emailResponse.response)
      } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, error: error.message })
      }
    }
  }
