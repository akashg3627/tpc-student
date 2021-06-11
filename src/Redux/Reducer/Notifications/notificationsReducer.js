import * as ActionTypes from "../../ActionTypes";
import axios from "axios";
import {logout} from '../User/userReducer';
const baseURL = "https://iiti-tpc-backend.herokuapp.com/";


const fetchNotificationRequest = () => ({
	type: ActionTypes.NOTIFY_LOADING,
});
const notificationsFetched = (notifications) => ({
	type: ActionTypes.FETCH_NOTIFY,
	payload: notifications,
});
const notificationsFailed = (err) => ({
	type: ActionTypes.NOTIFY_FAILED,
	payload: err,
});

export const fetchNotifications = () => {
	let token = localStorage.getItem("token");
	return function (dispatch) {
		dispatch(fetchNotificationRequest());
		axios
			.get(baseURL + "student/mynotifications", { headers: { "x-auth-token": token } })
			.then((response) => {
				const res = response.data;
				// console.log(res.notifications);
				dispatch(notificationsFetched(res.notifications));
			})
			.catch((error) => {
				dispatch(notificationsFailed(error.message));
				// alert("Session Expired! Please login to continue...");
				dispatch(logout());
			});
	};
};