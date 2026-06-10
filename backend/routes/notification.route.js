import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
    getNotifications,
    getUnreadCount,
    markAsRead,
    sendApplicationStatusReply,
    getApplicationNotifications,
    deleteNotification
} from "../controllers/notification.controller.js";

const router = express.Router();

// Get all notifications for logged-in user
router.get("/", isAuthenticated, getNotifications);

// Get unread notification count
router.get("/unread/count", isAuthenticated, getUnreadCount);

// Get application received notifications (for recruiters)
router.get("/applications", isAuthenticated, getApplicationNotifications);

// Mark notification as read
router.put("/:id/read", isAuthenticated, markAsRead);

// Send application status reply
router.post("/send-reply", isAuthenticated, sendApplicationStatusReply);

// Delete notification
router.delete("/:id", isAuthenticated, deleteNotification);

export default router;
