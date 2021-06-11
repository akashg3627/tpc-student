import React from "react";
import moment from "moment";

export default function NotificationComponent({ notify }) {
	return (
		<div key={notify._id} className="notify">
			<div className="notifyIcon col-1">A</div>
			<div id="text" className="col-9">
				{notify.text}
			</div>
			<div id="date" className="col-2">
				{moment(notify.date).format("D MMMM, YYYY") + " at " + moment(notify.date).format("h:mm a")}
			</div>
		</div>
	);
}