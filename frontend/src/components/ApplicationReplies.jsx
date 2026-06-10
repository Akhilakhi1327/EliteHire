import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setApplicationNotifications } from '../redux/notificationSlice';
import { Mail, Send } from 'lucide-react';

const ApplicationReplies = () => {
    const dispatch = useDispatch();
    const { applicationNotifications } = useSelector(store => store.notification);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [replyStatus, setReplyStatus] = useState('pending');
    const [replyMessage, setReplyMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchApplicationNotifications();
    }, []);

    const fetchApplicationNotifications = async () => {
        try {
            setIsLoading(true);
            const res = await axios.get(
                'http://localhost:3000/api/v1/notification/applications',
                { withCredentials: true }
            );
            if (res.data.success) {
                dispatch(setApplicationNotifications(res.data.notifications));
            }
        } catch (error) {
            console.log('Error fetching applications:', error);
            setError('Failed to fetch applications');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendReply = async (e) => {
        e.preventDefault();
        if (!selectedApplication || !replyStatus) {
            setError('Please select an application and status');
            return;
        }

        try {
            setIsLoading(true);
            setError('');
            setSuccess('');

            const res = await axios.post(
                'http://localhost:3000/api/v1/notification/send-reply',
                {
                    applicationId: selectedApplication._id,
                    status: replyStatus,
                    message: replyMessage
                },
                { withCredentials: true }
            );

            if (res.data.success) {
                setSuccess('Reply sent successfully! Email has been sent to the candidate.');
                setReplyMessage('');
                setReplyStatus('pending');
                setSelectedApplication(null);
                setTimeout(() => setSuccess(''), 3000);

                // Refresh notifications
                await fetchApplicationNotifications();
            }
        } catch (error) {
            console.log('Error sending reply:', error);
            setError(error.response?.data?.message || 'Failed to send reply');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Mail className="w-6 h-6" />
                Application Replies & Notifications
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Applications List */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow-md">
                        <div className="p-4 border-b border-gray-200">
                            <h3 className="font-semibold">Applicant Notifications</h3>
                            <p className="text-sm text-gray-600">
                                {applicationNotifications?.length || 0} applications received
                            </p>
                        </div>
                        <div className="divide-y max-h-96 overflow-y-auto">
                            {applicationNotifications && applicationNotifications.length > 0 ? (
                                applicationNotifications.map((notification) => (
                                    <div
                                        key={notification._id}
                                        onClick={() => setSelectedApplication(notification.application)}
                                        className={`p-4 cursor-pointer hover:bg-gray-50 transition ${selectedApplication?._id === notification.application._id
                                                ? 'bg-blue-50 border-l-4 border-blue-600'
                                                : ''
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900">
                                                    {notification.sender?.fullname}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {notification.sender?.email}
                                                </p>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    Applied for: <span className="font-medium">{notification.job?.title}</span>
                                                </p>
                                                <p className="text-xs text-gray-500 mt-2">
                                                    {new Date(notification.createdAt).toLocaleDateString()} at{' '}
                                                    {new Date(notification.createdAt).toLocaleTimeString([], {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </p>
                                            </div>
                                            <div className={`px-3 py-1 rounded-full text-sm font-medium ${notification.application?.status === 'accepted'
                                                    ? 'bg-green-100 text-green-800'
                                                    : notification.application?.status === 'rejected'
                                                        ? 'bg-red-100 text-red-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {notification.application?.status || 'pending'}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-4 text-center text-gray-500">
                                    No applications received yet
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Reply Form */}
                <div className="lg:col-span-1">
                    {selectedApplication ? (
                        <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
                            <h3 className="font-semibold mb-4">Send Reply</h3>

                            {error && (
                                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                                    {success}
                                </div>
                            )}

                            <form onSubmit={handleSendReply} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Decision
                                    </label>
                                    <select
                                        value={replyStatus}
                                        onChange={(e) => setReplyStatus(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="accepted">Accepted</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Message (Optional)
                                    </label>
                                    <textarea
                                        value={replyMessage}
                                        onChange={(e) => setReplyMessage(e.target.value)}
                                        placeholder="Add a custom message to send to the candidate..."
                                        rows="4"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        {replyMessage.length}/500 characters
                                    </p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    <Send className="w-4 h-4" />
                                    {isLoading ? 'Sending...' : 'Send Reply'}
                                </button>
                            </form>

                            <div className="mt-4 p-3 bg-gray-50 rounded border border-gray-200">
                                <p className="text-xs font-medium text-gray-700 mb-2">What happens next:</p>
                                <ul className="text-xs text-gray-600 space-y-1">
                                    <li>✓ Email sent to candidate</li>
                                    <li>✓ Notification posted in-app</li>
                                    <li>✓ Application status updated</li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow-md p-4 text-center text-gray-500">
                            <p>Select an application to send a reply</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ApplicationReplies;
