import * as ActionTypes from "../../ActionTypes";
import axios from "axios";
import {logout} from '../User/userReducer';
const baseURL = "https://iiti-tpc-backend.herokuapp.com/";
// const baseURL = "http://localhost:5000/";


const fetchJobsRequest = () => ({
	type: ActionTypes.JOBS_LOADING,
});
const jobsFetched = (jobs) => ({
	type: ActionTypes.FETCH_JOBS,
	payload: jobs,
});
const jobsFailed = (err) => ({
	type: ActionTypes.JOBS_FAILED,
	payload: err,
});

export const fetchJobs = () => {
	let token = localStorage.getItem("token");
	return function (dispatch) {
		dispatch(fetchJobsRequest());
		axios
			.get(baseURL + "job/myjob", { headers: { "x-auth-token": token } })
			.then((response) => {
				const res = response.data;
				dispatch(jobsFetched(res.jobs));
			})
			.catch((error) => {
				dispatch(jobsFailed(error.message));
				// alert("Session Expired! Please login to continue...");
				dispatch(logout());
			});
	};
};