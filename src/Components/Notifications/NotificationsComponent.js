import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import Loading from "../Extra/Loading";
import { fetchNotifications } from "../../Redux/Reducer/Notifications/notificationsReducer";
import "./Notifications.css";
import Empty from "../Extra/Empty";
import Notification from "./Notification";

function Notifications() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchNotifications());
	}, [dispatch]);

	const notificationsReducer = useSelector((state) => state.notifications);
	const notifications = notificationsReducer.notifications

	if (notificationsReducer.isLoading) return <Loading />;
	else {
		return (
			<div className="container notifications">
				{notifications &&
					notifications.length > 0 &&
					notifications
						.map((n) => {
							return <Notification notify={n} />;
						})
						.reverse()}
				{notifications && notifications.length === 0 && <Empty text="NO NOTIFICATIONS" />}
			</div>
		);
	}
}

export default Notifications;
