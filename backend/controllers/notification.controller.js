import { Notification } from "../models/notification.model.js";
import { Application } from "../models/application.model.js";
import { User } from "../models/user.model.js";
import { Job } from "../models/job.model.js";
import { sendStatusUpdateEmail } from "../utils/email.js";

// Get all notifications for a user
export const getNotifications = async (req, res) => {
    try {
        const userId = req.id;
        const notifications = await Notification.find({ recipient: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: 'sender',
                select: 'fullname email'
            })
            .populate({
                path: 'application'
            })
            .populate({
                path: 'job',
                select: 'title company'
            });

        return res.status(200).json({
            notifications,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Error fetching notifications',
            success: false
        });
    }
};

// Get unread notification count
export const getUnreadCount = async (req, res) => {
    try {
        const userId = req.id;
        const unreadCount = await Notification.countDocuments({
            recipient: userId,
            isRead: false
        });

        return res.status(200).json({
            unreadCount,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Error fetching unread count',
            success: false
        });
    }
};

// Mark notification as read
export const markAsRead = async (req, res) => {
    try {
        const notificationId = req.params.id;
        const notification = await Notification.findByIdAndUpdate(
            notificationId,
            { isRead: true },
            { new: true }
        );

        if (!notification) {
            return res.status(404).json({
                message: 'Notification not found',
                success: false
            });
        }

        return res.status(200).json({
            message: 'Notification marked as read',
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Error marking notification as read',
            success: false
        });
    }
};

// Send application status reply (Recruiter sends to Student)
export const sendApplicationStatusReply = async (req, res) => {
    try {
        const { applicationId, status, message } = req.body;
        const recruiterId = req.id;

        // Validate input
        if (!applicationId || !status) {
            return res.status(400).json({
                message: 'Application ID and status are required',
                success: false
            });
        }

        // Get application details
        const application = await Application.findById(applicationId)
            .populate('applicant')
            .populate({
                path: 'job',
                populate: { path: 'company' }
            });

        if (!application) {
            return res.status(404).json({
                message: 'Application not found',
                success: false
            });
        }

        const student = application.applicant;
        const job = application.job;

        // Create notification
        const notification = await Notification.create({
            sender: recruiterId,
            recipient: student._id,
            application: applicationId,
            job: job._id,
            type: 'application_status',
            status: status.toLowerCase(),
            message: message || `Your application for ${job.title} has been ${status}`
        });

        // Send email to student
        const emailSent = await sendStatusUpdateEmail(
            student.email,
            student.fullname,
            job.title,
            status,
            message
        );

        // Update notification with email sent status
        if (emailSent) {
            notification.emailSent = true;
            await notification.save();
        }

        // Update application status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(201).json({
            message: 'Status reply sent successfully',
            notification,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Error sending status reply',
            success: false
        });
    }
};

// Get application received notifications (for recruiters)
export const getApplicationNotifications = async (req, res) => {
    try {
        const userId = req.id;

        // Get all jobs posted by this recruiter
        const jobs = await Job.find({ created_by: userId }).select('_id');
        const jobIds = jobs.map(job => job._id);

        // Get notifications for applications on these jobs
        const notifications = await Notification.find({
            job: { $in: jobIds },
            type: 'application_received'
        })
            .sort({ createdAt: -1 })
            .populate({
                path: 'sender',
                select: 'fullname email profile'
            })
            .populate({
                path: 'application'
            })
            .populate({
                path: 'job',
                select: 'title'
            });

        return res.status(200).json({
            notifications,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Error fetching application notifications',
            success: false
        });
    }
};

// Delete notification
export const deleteNotification = async (req, res) => {
    try {
        const notificationId = req.params.id;
        const userId = req.id;

        const notification = await Notification.findOne({
            _id: notificationId,
            recipient: userId
        });

        if (!notification) {
            return res.status(404).json({
                message: 'Notification not found',
                success: false
            });
        }

        await Notification.findByIdAndDelete(notificationId);

        return res.status(200).json({
            message: 'Notification deleted',
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Error deleting notification',
            success: false
        });
    }
};
