import React from "react";
import { useHistory } from "react-router";
import { Button } from "reactstrap";

import './Jobs.css'

function JobCard({ job }) {
	let history = useHistory();

	// console.log(job);
	let d = new Date(job.deadline);
	// console.log(d);
	let date = d.getDate();
	let month = d.getMonth();
	let year = d.getFullYear();
	let hours = d.getHours();
	let mins = d.getMinutes();

	const desc =
		"Irure sit exercitation ex eiusmod ullamco id. Ut adipisicing velit do aliqua est consequat labore ea cupidatat. Anim deserunt excepteur fugiat minim.";

	hours = String(hours);
	if (hours.length === 1) hours = "0" + hours;
	mins = String(mins);
	if (mins.length === 1) mins = "0" + mins;

	let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	return (
		<div className="col-12 col-md-4 col-lg-3">
			<div className="jobCard">
				<h5>{job.companyName}</h5>
				<h6>{job.jobTitle}</h6>
				{job.status === "open" && (
					<p id="deadline">Deadline: {date + " " + months[month] + ", " + year + " " + hours + ":" + mins}</p>
				)}
				<p className="muted">{desc.slice(0, 80) + "..."}</p>
				{job.status === "open" && (
					<Button
						onClick={() => {
							history.push("/jobs/" + job._id);
						}}
						color="primary"
					>
						Apply Now
					</Button>
				)}
				{job.status !== "open" && (
					<Button
						onClick={() => {
							history.push("/jobs/" + job._id);
						}}
						color="primary"
						outline
					>
						View Details
					</Button>
				)}
			</div>
		</div>
	);
}

export default JobCard;
