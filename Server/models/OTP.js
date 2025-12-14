const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 10*60,
  }
});


// it is pre hook 
// a function to send mails
async function sendVerification(email, otp) {
    try{
        const mailResponse = await mailSender(email, "Verification Email from studynotion", otp);
        console.log("Email send Successfully ", mailResponse);

    }
    catch(error){
        console.log("Error occured while sending mails", error);
        throw error;
    }
}

OTPSchema.pre("save", async function (next) {
    try{
        await sendVerification(this.email, this.otp);
    }
    catch(error){
        
    }
    next();
})

module.exports = mongoose.model("OTP", OTPSchema);
