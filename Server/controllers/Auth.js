// it is OTP generator and verification 

const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const mailSender = require("../utils/mailSender")
const Profile = require("../models/Profile");
const bcrypt = require("bcrypt");
const { response } = require("express");
const jwt = require("jsonwebtoken");
// const { default: accounts } = require("razorpay/dist/types/accounts");
const Razorpay = require("razorpay");

require("dotenv").config();


exports.sendotp = async (req, res) => {

    try{
         // fetch the email from request 
        const {email} = req.body;

        // check if user already exist
         const checkUserPresent = await User.findOne({email});

         // if user already exist then return a response
         if(checkUserPresent){
         return res.status(409).json({
            success:false,
            message:'User already exist'
        })
    }
    // if user not exist then 
    // generate otp 
    var otp = otpGenerator.generate(6, {
    // var otp = otpGenerator(6, {
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false,
    });
    console.log("OTP Generated: ", otp);

    //  check unique otp or not 
    let result = await OTP.findOne({otp: otp});
    while(result) {
        otp = otpGenerator.generate(6, {
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false,
        });
        result = await OTP.findOne({otp: otp});
    }

    const otpPayload = {email, otp};

    // OTP entry in DB
    const otpBody = await OTP.create(otpPayload);
    console.log(otpBody);

    console.log("OTP SAVED ===>", otpBody);

    // return response successfully after entry in DB
    res.status(200).json({
        success:true,
        message:"OTP sent successfully ", 
        otp,
    })  
      
        // send OTP via email
    // await mailSender(
    //     email,
    //     "Your Verification OTP",
    //     `<h1>${otp}</h1><p>This OTP will expire in 5 minutes.</p>`
    //   );

  }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to send Otp",
        });

    }     
};


// Approach 
//   signUp ----  data fetch , validation, 2 password match krlo, check user already exist or not ,
//  find most recently otp, validation otp, hash password, entry create in DB , return res

exports.signup = async (req, res) => {
    try{
         // data fetch from req body 
    const {firstName, lastName, email, password,
         confirmPassword, accountType,contactNumber,otp} = req.body;

    if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
       return res.status(401).json({
            success:false,
            message:"All fields are required",
        });
    }

    // console.log("otp undefined",otp)

    //  password validation
    if(password !== confirmPassword){
        return res.status(400).json({
            success:false,
            message:"Password do not match",
        })
    }

    // check if user already exists or not 
     const existingUser = await User.findOne({email});
     if(existingUser){
        return res.status(400).json({
            success:false,
            message:"User already exist. Please Login ",
        });
     }

        //  Recent otp Used for Signup
        const recentOtp = await OTP.find({ email }).sort({ createdAt: -1}).limit(1);

        if(recentOtp.length === 0){
            return res.status(400).json({
                success:false,
                message: "OTP not found. Please try again.",
            })
        } else if(otp !== recentOtp[0].otp){
            return res.status(400).json({
                success:false,
                message:"Invalid OTP",
            });
        }

        //  Hash Password 
        const hashedPassword = await bcrypt.hash(password, 10);

        //  Profile of User
        const profileDetails = await Profile.create({
            gender: null,
            dateofbirth: null,
            about: null,
            contactNumber: null,
          });

    //  Entry create in DB
    const user = await User.create({
        firstName,
        lastName,
        email,
        contactNumber,
        password:hashedPassword,
        accountType,
        additionalDetails: profileDetails._id,
        // this create image with the help of first letter of first name and last name  like JP
        image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,

    })

    // return res
    return res.status(200).json({
        success:true,
        message:"user is registered successfully",
        user,
    });
}

    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User could not registered successfully> Please try again.",
            error:error.message
        });
    }
};

// Login for student 
exports.login = async (req, res) => {
    try{

        
        // get data from req body
        const {email, password} = req.body;

        // validation data
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All fields are required, Please try again",
            })
        }
        // check user exist or Not
        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User does not exist, Please SignUp first",
            });
        }

        //  JWT token create  , after that--  password match   
        if(await bcrypt.compare(password, user.password)){
            const payload = {
                email:user.email,
                id:user._id,
                accountType:user.accountType,
                // accountType:user.accountType,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET,{
                expiresIn:"2h",
            });
            user.token = token;
            user.password = undefined;

            //  create cookie and send response
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            }
            return res.cookie("token", token, options).status(200).json({
                success:true,
                token,
                user,
                message:'Logged in successfully',
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message:"password is incorrect",
            });
        }
       
    }
    catch(error){
        console.log(error);
        return res.status(401).json({
            success:false,
            message:"Login failure, Try Again ",
        });

    }
}


//  change Password controller

exports.changePassword = async (req, res) => {
    try {
      const { oldPassword, newPassword, confirmPassword } = req.body;
  
      //  Validation
      if (!oldPassword || !newPassword || !confirmPassword) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }
  
      //  newPassword & confirmPassword match check
      if (newPassword !== confirmPassword) {
        return res.status(400).json({
          success: false,
          message: "New passwords do not match",
        });
      }
  
      //  User ID from req.user (JWT se aaya hoga middleware se)
      const userId = req.user.id;
  
      // 4. User find
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      //  Old password verify
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Old password is incorrect",
        });
      }
  
      //  New password hash
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // 7. Save new password
      user.password = hashedPassword;
      await user.save();
  
      //  Try to send mail (agar fail bhi ho jaye toh bhi password changed rahega)
      try {
        await mailSender(
          user.email,
          "Your password has been changed",
          `
            <h2>Password Changed Successfully</h2>
            <p>Hello ${user.firstName || "User"},</p>
            <p>Your StudyNotion account password has been changed.</p>
            <p>If this was not you, please contact support immediately.</p>
          `
        );
      } catch (mailError) {
        console.log("Error while sending password change email:", mailError);
        // Yahan response change nahi kar rahe, sirf log kar rahe hain
      }
  
      //  Final success response
      return res.status(200).json({
        success: true,
        message: "Password changed successfully!",
      });
  
    } catch (error) {
      console.log("Error in changePassword controller:", error);
      return res.status(500).json({
        success: false,
        message: "Something went wrong, please try again later.",
      });
    }
  };
  
