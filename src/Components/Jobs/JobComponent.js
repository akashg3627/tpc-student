import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AiFillFacebook, AiFillInstagram, AiFillLinkedin, AiFillTwitterSquare } from "react-icons/ai";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { Button } from "reactstrap";


import Loading from "../Extra/Loading";
import { fetchJobs } from "../../Redux/Reducer/Jobs/jobsReducer";

export default function Job() {
	const { id } = useParams();

	let dispatch = useDispatch();
	let jobReducer = useSelector(state=>state.jobs);

	const [job, setJob] = useState({
		_id: "",
	});

	useEffect(() => {
		dispatch(fetchJobs());
	}, [dispatch]);

	useEffect(() => {
		const jobs = jobReducer.jobs.filter((j) => j._id === id);
		setJob(jobs[0] || {});
		// console.log("Hi", jobs[0]);
	}, [jobReducer.jobs, id]);

	return (
		<div>
			{jobReducer.isLoading && <Loading />}
			{!jobReducer.isLoading && jobReducer.jobs.length > 0 && (
				<div className="container indiJobsPage">
					<div className="d-flex flex-wrap" style={{ justifyContent: "space-between" }}>
						<div>
							<h3>{job.companyName}</h3>
							<h5>{job.jobTitle}</h5>
						</div>
						{job.status === "open" && (
							<a href={job.gFormLink} target="_blank" rel="noreferrer">
								<Button color="primary">Poll Form</Button>
							</a>
						)}
					</div>
					<hr />
					<p>
						<BsFillBriefcaseFill />
						<span style={{ marginLeft: "10px" }}>{job.mode || "Full Time"}</span>
					</p>
					{/*<div>{job.description}</div>*/}
					<div>
						Aute cillum eiusmod irure labore veniam nisi duis quis qui cupidatat excepteur excepteur enim
						voluptate. Velit cillum elit proident deserunt enim pariatur minim sit in. Elit magna ad amet
						duis quis consequat. Adipisicing culpa consectetur eiusmod enim. Officia commodo irure quis quis
						elit in ullamco aute excepteur Lorem aliqua. Laborum commodo sunt ut velit duis ea deserunt
						pariatur labore irure consequat. Sunt nostrud id ipsum consectetur excepteur labore anim nostrud
						amet cillum.
						<br />
						Ut anim sit qui non est officia dolore ad occaecat nostrud nisi aliquip. Voluptate incididunt
						dolore magna pariatur eiusmod aliquip proident ex consectetur in minim sit ad id. Occaecat
						exercitation nisi tempor reprehenderit id ea. Eiusmod ex Lorem dolore aute. Labore non fugiat ad
						sint tempor enim cillum ipsum do ipsum. Dolore voluptate ad aliqua velit. Eu voluptate sit
						fugiat officia reprehenderit incididunt sint amet. Excepteur aliqua irure ut Lorem consectetur
						aliqua consequat enim. Veniam amet tempor pariatur cillum laboris amet laborum dolore
						reprehenderit sit culpa occaecat quis ex. Nostrud nulla commodo laborum cillum voluptate sit ad
						officia cupidatat. Laboris cupidatat anim deserunt mollit Lorem aliquip fugiat ea.
					</div>
					<div>
						{job.documentLinks && job.documentLinks.length > 0 && (
							<>
								<p>Relevant Documents:</p>
								{job.documentLinks.map((docLink) => {
									return (
										<div>
											<a href={docLink} target="_blank" rel="noreferrer">
												docLink
											</a>
										</div>
									);
								})}
							</>
						)}
					</div>
					<div className="mt-4">
						<h5>Contact</h5>
						{job.contact && job.contact.email && (
							<div>
								Email: <a href={"mailto:" + job.contact.email}>{job.contact.email}</a>
							</div>
						)}
						{job.contact && job.contact.phNo && (
							<div>
								Phone: <a href={"tel:" + job.contact.phNo}>{job.contact.phNo}</a>
							</div>
						)}
						{job.contact && job.contact.socLinks && (
							<div className="socLinks">
								{job.contact.socLinks.facebook && job.contact.socLinks.facebook !== "" && (
									<a href={job.contact.socLinks.facebook} target="_blank" rel="noreferrer">
										<AiFillFacebook />
									</a>
								)}
								{job.contact.socLinks.instagram && job.contact.socLinks.instagram !== "" && (
									<a href={job.contact.socLinks.instagram} target="_blank" rel="noreferrer">
										<AiFillInstagram />
									</a>
								)}
								{job.contact.socLinks.twitter && job.contact.socLinks.twitter !== "" && (
									<a href={job.contact.socLinks.twitter} target="_blank" rel="noreferrer">
										<AiFillTwitterSquare />
									</a>
								)}
								{job.contact.socLinks.linkedIn && job.contact.socLinks.linkedIn !== "" && (
									<a href={job.contact.socLinks.linkedIn} target="_blank" rel="noreferrer">
										<AiFillLinkedin />
									</a>
								)}
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
