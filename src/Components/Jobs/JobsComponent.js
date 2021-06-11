import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";


import "./Jobs.css";
import JobCard from "./JobCard";
import Empty from "../Extra/Empty";
import Loading from "../Extra/Loading";

import { fetchJobs } from "../../Redux/Reducer/Jobs/jobsReducer";

function JobsComponent() {
	const dispatch = useDispatch();
	const jobReducer = useSelector(state=>state.jobs)

	const [upcomingJob, setUpcomingJob] = useState([]);
	const [openJob, setOpenJob] = useState([]);
	const [closedJob, setClosedJob] = useState([]);

	const [text, setText] = useState("");

	useEffect(() => {
		dispatch(fetchJobs());
	}, [dispatch]);

	useEffect(() => {
		const upcomingJob1 = jobReducer.jobs.filter((j) => j.status === "upcoming" && j.companyName.search(text) >= 0);
		const openJob1 = jobReducer.jobs.filter((j) => j.status === "open" && j.companyName.search(text) >= 0);
		const closedJob1 = jobReducer.jobs.filter((j) => j.status === "closed" && j.companyName.search(text) >= 0);

		setUpcomingJob(upcomingJob1);
		setOpenJob(openJob1);
		setClosedJob(closedJob1);

		// console.log(upcomingJob1.length);
		// console.log(openJob1.length);
		// console.log(closedJob1.length);
	}, [jobReducer.jobs, text]);

	const nameOptions = jobReducer.jobs.map((j) => {
		return {
			value: j.companyName,
			label: j.companyName,
		};
	});

	const appendText = (e) => {
		console.log(e);
		if (e && e.value) {
			setText(e.value);
		} else {
			setText("");
		}
	};

	return (
		<div className="container-fluid">
			{jobReducer.isLoading && <Loading />}
			{jobReducer.jobs.length > 0 && (
				<div>
					<div className="row mt-1 mb-1 p-3">
						<Select
							options={nameOptions}
							isClearable
							name="text"
							onChange={appendText}
							placeholder="Select Company..."
						/>
					</div>
					{openJob.length > 0 && (
						<div className="row mb-5">
							<h4 className="head">Open Jobs</h4>
							{openJob
								.map((job) => {
									return <JobCard job={job} />;
								})
								.reverse()}
						</div>
					)}
					{upcomingJob.length > 0 && (
						<div className="row mb-5">
							<h4 className="head">Upcoming Jobs</h4>
							{upcomingJob
								.map((job) => {
									return <JobCard job={job} />;
								})
								.reverse()}
						</div>
					)}
					{closedJob.length > 0 && (
						<div className="row mb-5">
							<h4 className="head">Closed Jobs</h4>
							{closedJob
								.map((job) => {
									return <JobCard job={job} />;
								})
								.reverse()}
						</div>
					)}
				</div>
			)}
			{jobReducer.jobs.length === 0 && <Empty text="NO JOBS FOUND" />}
		</div>
	);
}

export default JobsComponent;
