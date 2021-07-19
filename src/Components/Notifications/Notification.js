import React from "react";
import moment from "moment";
import Avatar from '@material-ui/core/Avatar';
import { AccordionDetails, AccordionSummary, Typography } from "@material-ui/core";

export default function NotificationComponent({ notify }) {
	return (
		<>
		<AccordionSummary>
		<div key={notify._id} className="notify">
			<Avatar>H</Avatar>
			<div id="text" className="col-9">
				{notify.subject}
			</div>
			<div id="date" className="col-2">
				{moment(notify.date).format("D MMMM, YYYY") + " at " + moment(notify.date).format("h:mm a")}
			</div>
		</div>
		</AccordionSummary>
		<AccordionDetails>
			<Typography>{notify.text}</Typography>
		</AccordionDetails>
		</>
	);
}