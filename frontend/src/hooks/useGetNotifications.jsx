import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setNotifications, setUnreadCount } from "../redux/notificationSlice";

const API_END_POINT = "http://localhost:3000/api/v1/notification";

export const useGetNotifications = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                if (!user) return;
                const res = await axios.get(
                    `${API_END_POINT}`,
                    {
                        withCredentials: true
                    }
                );
                if (res.data.success) {
                    dispatch(setNotifications(res.data.notifications));
                }
            } catch (error) {
                console.log("Error fetching notifications:", error);
            }
        };

        fetchNotifications();

        // Poll for new notifications every 30 seconds
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, [dispatch, user]);
};

export const useGetUnreadCount = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);

    useEffect(() => {
        const fetchUnreadCount = async () => {
            try {
                if (!user) return;
                const res = await axios.get(
                    `${API_END_POINT}/unread/count`,
                    {
                        withCredentials: true
                    }
                );
                if (res.data.success) {
                    dispatch(setUnreadCount(res.data.unreadCount));
                }
            } catch (error) {
                console.log("Error fetching unread count:", error);
            }
        };

        fetchUnreadCount();

        // Poll for unread count every 10 seconds
        const interval = setInterval(fetchUnreadCount, 10000);
        return () => clearInterval(interval);
    }, [dispatch, user]);
};
