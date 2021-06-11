import * as ActionTypes from "../../ActionTypes";
import axios from "axios";
 const baseURL = "https://iiti-tpc-backend.herokuapp.com/";
// const baseURL = "http://localhost:5000/";

const loginRequest = (user, token) => ({
	type: ActionTypes.LOGIN,
	user: user,
	token: token,
	
});

export const login = (tokenId, history) => {
	return function (dispatch) {
		axios
			.post(baseURL + "student/login", { tokenId: tokenId })
			.then((response) => {
				const res = response.data;
				// console.log(response);
					localStorage.setItem("token", res.token);
					localStorage.setItem("creds", JSON.stringify(res.user));
					dispatch(loginRequest(res.user, res.token, false));
				history.push("/home");
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

const logoutRequest = () => ({
	type: ActionTypes.LOGOUT,
});

export const logout = () => {
	return function (dispatch) {
		// axios.get(baseURL + "logout")
		//     .then((response) => {
		//         dispatch(logoutRequest())
		//     })
		//     .catch((error) => {
		//         console.log(error);
		//     })
		localStorage.removeItem("token");
		localStorage.removeItem("creds");
		dispatch(logoutRequest());
	};
};