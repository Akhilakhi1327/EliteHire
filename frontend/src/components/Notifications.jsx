import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { markAsRead, removeNotification } from '../redux/notificationSlice';
import { Bell, Trash2, Mail, CheckCircle, XCircle } from 'lucide-react';

const Notifications = () => {
    const dispatch = useDispatch();
    const { notifications, unreadCount } = useSelector(store => store.notification);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleMarkAsRead = async (notificationId) => {
        try {
            setIsLoading(true);
            const res = await axios.put(
                `http://localhost:3000/api/v1/notification/${notificationId}/read`,
                {},
                { withCredentials: true }
            );
            if (res.data.success) {
                dispatch(markAsRead(notificationId));
            }
        } catch (error) {
            console.log('Error marking as read:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteNotification = async (notificationId) => {
        try {
            setIsLoading(true);
            const res = await axios.delete(
                `http://localhost:3000/api/v1/notification/${notificationId}`,
                { withCredentials: true }
            );
            if (res.data.success) {
                dispatch(removeNotification(notificationId));
            }
        } catch (error) {
            console.log('Error deleting notification:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const getNotificationIcon = (type, status) => {
        if (type === 'application_received') {
            return <Mail className="w-4 h-4 text-blue-600" />;
        }
        if (type === 'application_status') {
            if (status === 'accepted') {
                return <CheckCircle className="w-4 h-4 text-green-600" />;
            } else if (status === 'rejected') {
                return <XCircle className="w-4 h-4 text-red-600" />;
            }
        }
        return <Mail className="w-4 h-4 text-gray-600" />;
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'accepted':
                return 'bg-green-50 border-green-200';
            case 'rejected':
                return 'bg-red-50 border-red-200';
            case 'pending':
                return 'bg-yellow-50 border-yellow-200';
            default:
                return 'bg-blue-50 border-blue-200';
        }
    };

    return (
        <div className="relative">
            {/* Notification Bell */}
            <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="relative p-2 text-gray-700 hover:bg-gray-100 rounded-full transition"
            >
                <Bell className="w-6 h-6" />
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1 -translate-y-1 bg-red-600 rounded-full">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl z-50 border border-gray-200">
                    <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                        <h3 className="font-semibold text-gray-900">Notifications</h3>
                        {unreadCount > 0 && (
                            <p className="text-sm text-gray-600">{unreadCount} unread</p>
                        )}
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                        {notifications && notifications.length > 0 ? (
                            notifications.map((notification) => (
                                <div
                                    key={notification._id}
                                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition ${!notification.isRead ? 'bg-blue-50' : ''
                                        } ${getStatusColor(notification.status)}`}
                                >
                                    <div className="flex items-start gap-3">
                                        {getNotificationIcon(notification.type, notification.status)}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900">
                                                {notification.message}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {new Date(notification.createdAt).toLocaleDateString()}
                                            </p>
                                            {notification.type === 'application_status' && (
                                                <p className={`text-xs font-semibold mt-2 uppercase ${notification.status === 'accepted' ? 'text-green-600' :
                                                        notification.status === 'rejected' ? 'text-red-600' :
                                                            'text-yellow-600'
                                                    }`}>
                                                    {notification.status}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex gap-2">
                                            {!notification.isRead && (
                                                <button
                                                    onClick={() => handleMarkAsRead(notification._id)}
                                                    className="p-1 hover:bg-blue-200 rounded transition"
                                                    title="Mark as read"
                                                    disabled={isLoading}
                                                >
                                                    <CheckCircle className="w-4 h-4 text-blue-600" />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDeleteNotification(notification._id)}
                                                className="p-1 hover:bg-red-200 rounded transition"
                                                title="Delete"
                                                disabled={isLoading}
                                            >
                                                <Trash2 className="w-4 h-4 text-red-600" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-4 text-center text-gray-500">
                                No notifications yet
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notifications;
