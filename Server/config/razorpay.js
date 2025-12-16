const Razorpay = require("razorpay");
require("dotenv").config();

// Validate environment variables
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    console.error("RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is missing in .env file");
    console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID ? "Present" : "Missing");
    console.log("RAZORPAY_KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET ? "Present" : "Missing");
}

exports.instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

console.log("Razorpay instance initialized successfully");