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

exports.capturePayment = async (req, res) =>{

    // get courseId and userId
    const {course_id} = req.body;
    const userId = req.user.id;

    //validation of courseId 
    if(!course_id){
        return res.status(400).json({
            success:false,
            message:"Please provide valid course Id",
            
        });
    }
    //validation of courseDetails
    let course;
    try{
        course = await Course.findById(course_id);
        if(!course){
            return res.status(404).json({
                success:false,
                message:"Invalid courseDetails",
                
            });
        }

         // user already pay for the same course
         const uid = new mongoose.Types.ObjectId(userId);
         if(course.studentsEnrolled.includes(uid)){
            return res.status(200).json({
                success:false,
                message:"Student is already enrolled",
            });
         }

    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message: error.message,
        });
    }
   
    // order create
    const amount = course.price;
    const currency = "INR";

    const options = {
        amount: amount * 100,
        currency,
        receipt: Math.random.apply(Date.now()).toString(),
        // receipt: Date.now().toString(),
        notes:{
            courseId: course_id,
            userId,
        }
    };

    try{
        //initiate the payment using razorpay
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);

       // return response
       return res.status(200).json({
        success:true,
        message:"Order created successfully",
        courseName : course.courseName,
        courseDescription: course.courseDescription,
        thumbnail: course.thumbnail,
        amount:paymentResponse.amount,
        currency:paymentResponse.currency,
        orderId:paymentResponse.id,

       });
    }
    catch(error){
        console.log(error);
        res.json({
            success:false,
            message:"could not initiate order",
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
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
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
          { $push: { studentsEnroled: userId } },
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
