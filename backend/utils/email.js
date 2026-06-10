import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create transporter - using Gmail or your email service
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Verify transporter connection
transporter.verify((error, success) => {
    if (error) {
        console.log('Email transporter error:', error);
    } else {
        console.log('Email transporter ready');
    }
});

export const sendApplicationNotificationEmail = async (recruiterEmail, studentName, studentEmail, jobTitle, companyName) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recruiterEmail,
        subject: `New Application: ${studentName} applied for ${jobTitle}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2>New Job Application Received</h2>
                <p>Hello,</p>
                <p>You have received a new application for the position of <strong>${jobTitle}</strong> at <strong>${companyName}</strong>.</p>
                <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <p><strong>Applicant Details:</strong></p>
                    <p><strong>Name:</strong> ${studentName}</p>
                    <p><strong>Email:</strong> ${studentEmail}</p>
                    <p><strong>Position Applied:</strong> ${jobTitle}</p>
                </div>
                <p>Please log in to your account to review the application and respond to the candidate.</p>
                <p style="color: #666; font-size: 12px; margin-top: 30px;">This is an automated email from EliteHire. Please do not reply to this email.</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.log('Error sending application notification:', error);
        return false;
    }
};

export const sendStatusUpdateEmail = async (studentEmail, studentName, jobTitle, status, recruiterMessage = '') => {
    const statusText = status.charAt(0).toUpperCase() + status.slice(1);
    const statusColor = status === 'accepted' ? '#27ae60' : status === 'rejected' ? '#e74c3c' : '#3498db';

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: studentEmail,
        subject: `Application ${statusText}: ${jobTitle}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2>Application Status Update</h2>
                <p>Hello ${studentName},</p>
                <p>Thank you for applying for the position of <strong>${jobTitle}</strong>.</p>
                <div style="background-color: ${statusColor}; padding: 15px; border-radius: 5px; margin: 20px 0; color: white; text-align: center;">
                    <h3 style="margin: 0;">Your application has been <strong>${statusText}</strong></h3>
                </div>
                ${recruiterMessage ? `<div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <p><strong>Message from Recruiter:</strong></p>
                    <p>${recruiterMessage}</p>
                </div>` : ''}
                <p>If you have any questions, please don't hesitate to reach out to us.</p>
                <p style="color: #666; font-size: 12px; margin-top: 30px;">This is an automated email from EliteHire. Please do not reply to this email.</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.log('Error sending status update email:', error);
        return false;
    }
};

export const sendCustomNotificationEmail = async (recipientEmail, recipientName, subject, message) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipientEmail,
        subject: subject,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2>Notification from EliteHire</h2>
                <p>Hello ${recipientName},</p>
                <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <p>${message}</p>
                </div>
                <p style="color: #666; font-size: 12px; margin-top: 30px;">This is an automated email from EliteHire. Please do not reply to this email.</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.log('Error sending notification email:', error);
        return false;
    }
};
