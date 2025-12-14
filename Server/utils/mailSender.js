const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try {
        
        //  it is transporter to create OTP 
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

            // It is to send mail on email
        let info = await transporter.sendMail({
            from: `StudyNotion || Codehelp by Jayprakash Rajput <${process.env.MAIL_USER}>`,
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        });

        console.log("Mail sent successfully:", info.messageId);
        return info;
    } catch (error) {
        console.log("Mail send failed:", error.message);
    }
};

module.exports = mailSender;
