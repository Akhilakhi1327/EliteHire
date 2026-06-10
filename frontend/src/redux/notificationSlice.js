import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        notifications: [],
        unreadCount: 0,
        applicationNotifications: [],
        loading: false,
        error: null
    },
    reducers: {
        // Set all notifications
        setNotifications: (state, action) => {
            state.notifications = action.payload;
        },
        // Set unread count
        setUnreadCount: (state, action) => {
            state.unreadCount = action.payload;
        },
        // Set application notifications (for recruiters)
        setApplicationNotifications: (state, action) => {
            state.applicationNotifications = action.payload;
        },
        // Mark notification as read
        markAsRead: (state, action) => {
            const notificationId = action.payload;
            const notification = state.notifications.find(n => n._id === notificationId);
            if (notification) {
                notification.isRead = true;
                state.unreadCount = Math.max(0, state.unreadCount - 1);
            }
        },
        // Add new notification
        addNotification: (state, action) => {
            state.notifications.unshift(action.payload);
            if (!action.payload.isRead) {
                state.unreadCount += 1;
            }
        },
        // Remove notification
        removeNotification: (state, action) => {
            const notificationId = action.payload;
            const notification = state.notifications.find(n => n._id === notificationId);
            if (notification && !notification.isRead) {
                state.unreadCount = Math.max(0, state.unreadCount - 1);
            }
            state.notifications = state.notifications.filter(n => n._id !== notificationId);
        },
        // Set loading
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        // Set error
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const {
    setNotifications,
    setUnreadCount,
    setApplicationNotifications,
    markAsRead,
    addNotification,
    removeNotification,
    setLoading,
    setError
} = notificationSlice.actions;

export default notificationSlice.reducer;
