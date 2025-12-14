const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// ResetPasswordToken
exports.resetPasswordToken = async (req, res) =>{
    try{
        const {email} = req.body;

        //  check user exit or not
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User is not found with this email",
            });
        }

        // generate random token
        const token = crypto.randomUUID();

        // update user by adding token and expiration time 
        const updatedDetails = await User.findOneAndUpdate(
                                       {email:email},
                                       {
                                        token:token,
                                       resetPasswordExpires: Date.now() + 5*60*1000,
                                       },
                                       {new:true});
        // create Url 
        const url = `https://localhost:3000/update-password/${token}`

        // send mail containing the url
        await mailSender(email,
            "Password Reset Link",
            `Password Reset Link: ${url}` );

        //  return response
        return res.json({
            success:true,
            message:"Email send successfully, Please check email and change password",
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something wenet wrong while sending reset password mail ",
        });
    }
}


//  resetPassword 
exports.resetPassword = async (req, res) =>{
    try{
         // data fetch
    const {token, password, confirmPassword} = req.body;

    // validation of password
    if(password !== confirmPassword){
        return res.json({ 
            success:false,
            message:"Password and confirmpassword is not matched",
        });
    }

    // get userdetails from DB using token
    const userdetails = await User.findOne({token: token});

    // check the token is exist or not
    if(!userdetails){
        return res.json({
            success:false,
            message:"Token is invalid",
        });
    }

    // token time check
    if(userdetails.resetPasswordExpires < Date.now() ){
            return res.json({
                success:false,
                message:"Token time expired, Please try Again",
            });
    }

    // hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // password update
    await User.findOneAndUpdate(
        {token:token},
        {password:hashedPassword},
        {new:true},
    );

    // return response]
    return res.status(200).json({
        success:true,
        message:"Password reset successfully",
    });    
    }
    catch(error){
        console.log(error)
            return res.status(500).json({
                error: error.message,
                success:false,
                message:"Password  wrong while sending reset password "
            });
        }
    }
