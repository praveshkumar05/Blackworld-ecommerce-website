import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config();
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "praveshkumar1062002@gmail.com",
        pass: process.env.EMAIL_PASSWORD
    }
})

const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: 'praveshkumar1062002@gmail.com',
        to: to,
        subject: subject,
        text: text
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Failed to send email:', error);
    }
};

module.exports = sendEmail;
